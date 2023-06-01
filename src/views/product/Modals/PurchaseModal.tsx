import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Modal, useWalletModal } from '@vipswap/uikit'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import Collapse from "@material-ui/core/Collapse";
import { useSnackbar } from 'notistack'

import { NftConfig } from '../../../config/constants/types'
import useTokenBalance, {  useGetBnbBalance, useTokenSymbol } from '../../../hooks/useTokenBalance'
import useAuth from '../../../hooks/useAuth'
import { walletSet } from '../../../components/Menu/config'
import { BIG_ZERO } from '../../../utils/bigNumber'
import { useApproveQuoteToken } from '../hooks/useApprove'
import { getBep20Contract } from '../../../utils/contractHelpers'
import { useBuyToken } from '../hooks/useAction'
import {useGetNft, useGetUserAllowanceQuoteToken} from "../../../state/nfts/hooks";
import tokens from "../../../config/constants/tokens";
import {useERC20} from "../../../hooks/useContract";
import useGetIntPriceData from "../../../hooks/useGetPriceData";

export interface PurchaseModalProps {
  details: NftConfig
  onDismiss?: () => void
}

const StyledContainer = styled.div`
  position: relative;
`
const StyledPriceBox = styled.div`
  background: ${({theme})=>theme.expandColor.color.color9};
  border-radius: 10px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledBnbP = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  line-height: 1.4;
  ${({ theme }) => theme.mediaQueries.sm} {
     font-size: 24px;
  }
`
const StyledUsdtP = styled.div`
  font-size: 14px;
  ${({ theme }) => theme.mediaQueries.sm} {
     font-size: 16px;
  }
  color: ${({theme})=>theme.expandColor.color.color1};
  & span {
    color: ${({theme})=>theme.expandColor.color.active};
  }
  
`

const StyledConfirmBtn = styled.div`
  width: 250px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  font-size: 16px;
  background: ${({theme})=>theme.expandColor.color.active};
  color: ${({theme})=>theme.expandColor.color.white};
  border: 1px solid ${({theme})=>theme.expandColor.color.active};
  cursor: pointer;
  margin: 20px auto;
  &.disable {
    cursor: disable;
    opacity: 0.6;
  }
  &:hover {
    opacity: 0.8;
  }
  &.disable:hover {
    cursor: not-allowed;
    opacity: 0.6;
  }
`
const StyledBalanceRow = styled.div`
  display: flex;
  justify-content: flex-end;
`
const BalanceData = styled.div`
  font-size: 14px;
  
`

const funIsBnb = (address:string)=>{
  if(address.toLowerCase()==='0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'.toLowerCase()){
    return true
  }
  return false
}
const PurchaseModal: React.FC<PurchaseModalProps> = ({
 details,
 onDismiss,
}) => {
  const { t } = useTranslation()
  const quoteTokenIsBnb = funIsBnb(details.quoteToken)
  const bnbBalance = useGetBnbBalance()
  const quoteTokenBalance = useTokenBalance(quoteTokenIsBnb?'':details.quoteToken)
  // const quoteTokenSymbol = useTokenSymbol(details.quoteToken)
  const { account } = useWeb3React()
  const { login, logout, } = useAuth()

  const { onPresentConnectModal } = useWalletModal(login, logout, account, walletSet.helpLink, walletSet.scanLink, walletSet.scanLabel,bnbBalance.balance.toString(),tokens.bnb.symbol);

  const findNft = useGetNft(details.contract,details.tokenId)
  const findAllowance = useGetUserAllowanceQuoteToken(details.contract,details.quoteToken)
  const [allowance, setAllowance] = useState(findAllowance?new BigNumber(findAllowance.quoteTokenAllowance): BIG_ZERO)
  const isApproved = account && allowance && allowance.isGreaterThan(0)

  // 授权购买币
  const quoteTokenContract = useERC20(details.quoteToken)
  const { onApprove } = useApproveQuoteToken(quoteTokenContract)
  const [requestedApproval, setRequestedApproval] = useState(false)
  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const tx = await onApprove()
      if(tx) {
        setAllowance(new BigNumber(10))
      }
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove,setAllowance])

  const { onBugNft } = useBuyToken(details.contract,details.tokenId,details.quoteToken,details.price)
  const [pendingTx, setPendingTx] = useState(false)

  const { enqueueSnackbar } = useSnackbar();
  const buyCallbakTipText = t('Buy Success')
  const buyTipFun = () => {
    enqueueSnackbar(buyCallbakTipText, {
      variant:'success' ,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      autoHideDuration: 2500,
      TransitionComponent: Collapse,
    });
  }

  return (
    <Modal title={t('Confirm Purchase')} onDismiss={onDismiss}>
      <StyledContainer>
        <StyledPriceBox>
          <StyledBnbP>{details.price} {details.quoteTokenSymbol}</StyledBnbP>
          <StyledUsdtP>
            {t("Price")}
            <span>≈ ${details.priceUsdt}</span>
          </StyledUsdtP>
        </StyledPriceBox>

        {account && isApproved && (
          bnbBalance.balance.isZero()?(
            <StyledConfirmBtn className='disable'>
              {t('Insufficient balance')}
            </StyledConfirmBtn>
          ):(
            <StyledConfirmBtn
              onClick={async () => {
                if(pendingTx) return
                setPendingTx(true)
                const res = await onBugNft()
                setPendingTx(false)
                if(res){
                  onDismiss()
                  buyTipFun()
                  window.location.reload()
                  // window.location.href=`/nft/market/${details.contract}/${details.tokenId}`
                }
              }}
              className={pendingTx?'disable':''}
            >
              {pendingTx?'Pending':'Buy'}
            </StyledConfirmBtn>
          )
        )}

        {account && !isApproved &&(
          <StyledConfirmBtn onClick={handleApprove} className={requestedApproval?'disable':''}>
            {t('Approve ')} {details.quoteTokenSymbol}
          </StyledConfirmBtn>
        )}

        {!account && (
          <StyledConfirmBtn
            onClick={() => {
              onPresentConnectModal();
            }}
          >
            Connect Wallet
          </StyledConfirmBtn>
        )}


        <StyledBalanceRow>
          <BalanceData>
            {t('Balance:')}
            {quoteTokenIsBnb?
              `${bnbBalance.balance.toNumber().toLocaleString('en-US', { maximumFractionDigits: 2 })} INT`
              :`${quoteTokenBalance.balance.toNumber().toLocaleString('en-US', { maximumFractionDigits: 2 })} ${details.quoteTokenSymbol}`
            }
          </BalanceData>
        </StyledBalanceRow>

      </StyledContainer>
    </Modal>
  )
}

export default PurchaseModal

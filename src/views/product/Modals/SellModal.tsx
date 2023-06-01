import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Modal, useWalletModal } from '@vipswap/uikit'
import { useTranslation } from 'contexts/Localization'

import { NftConfig } from '../../../config/constants/types'
import { useGetBnbBalance } from '../../../hooks/useTokenBalance'
import useAuth from '../../../hooks/useAuth'
import tokens from '../../../config/constants/tokens'
import { walletSet } from '../../../components/Menu/config'
import InputSell from './InputSell'
import SelectQuoteToken from './SelectQuoteToken'
import {nftsLocalOnlyToken, quoteTokenOptions, quoteTokensArr} from '../../../config/constants/nfts'
import { getBep20Contract } from '../../../utils/contractHelpers'
import {useApproveSellNft, useApproveSellNftAll} from '../hooks/useApprove'
import { useSellToken } from '../hooks/useAction'
import {fetchUserNftsDataAsync} from "../../../state/nfts";
import {useAppDispatch} from "../../../state";
import {useERC20, useERC721, useNftContract} from "../../../hooks/useContract";
import {useNftsState} from "../../../state/nfts/hooks";

export interface SellModalProps {
  details: NftConfig
  onDismiss?: () => void
}

const StyledContainer = styled.div`
  position: relative;
`
const StyledPriceBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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
  border: 1px solid ${({theme})=> theme.expandColor.color.color1}; 

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

const SellModal: React.FC<SellModalProps> = ({
 details,
 onDismiss,
}) => {
  const { t } = useTranslation()
  const bnbBalance = useGetBnbBalance()
  const { account } = useWeb3React()
  const { login, logout, } = useAuth()

  const { onPresentConnectModal } = useWalletModal(login, logout, account, walletSet.helpLink, walletSet.scanLink, walletSet.scanLabel,bnbBalance.balance.toString(),tokens.bnb.symbol);

  const [sellPrice, setSellPrice] = useState('')
  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSellPrice(event.target.value)
  }
  const [quoteToken,setQuoteToken] = useState('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE')
  const handleOptionChange = (option: quoteTokenOptions): void => {
    setQuoteToken(option.address)
  }
  // 授权 nft 给 exchangenft 合约
  // 获取nft的合约abi
  const nftAbi = nftsLocalOnlyToken.find((n)=>n.token.toLowerCase()===details.contract.toLowerCase())
  const nftContract = useNftContract(nftAbi.abi,details.contract)
  // const {onApprove} = useApproveSellNft(nftContract,details.tokenId)
  const {onApprove} = useApproveSellNftAll(nftContract,details.tokenId)
  const [requestedApproval, setRequestedApproval] = useState(false)
  const {userNftApprove} = useNftsState()
  const curNftApprove = userNftApprove.find((a)=>a.nftToken.toLowerCase()===details.contract.toLowerCase())
  const [isApprove,setIsApprove] = useState(curNftApprove.sellApprove??false)
  // const [isApprove,setIsApprove] = useState(details.userData.sellApprove??false)
  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const res = await onApprove()
      if(res){
        setIsApprove(true)
      }
      setRequestedApproval(false)
      // onDismiss()
    } catch (e) {
      console.error(e)
    }
  }, [onApprove,setIsApprove,])

  const { onSellNft } = useSellToken(details.contract,details.tokenId,quoteToken,sellPrice)
  const [pendingTx, setPendingTx] = useState(false)

  return (
    <Modal title={t('Confirm Sell')} onDismiss={onDismiss}>
      <StyledContainer>
        <StyledPriceBox>
          <InputSell onChange={handleChangePrice}/>
          <SelectQuoteToken onChange={handleOptionChange} options={quoteTokensArr}/>
        </StyledPriceBox>

        {account && isApprove && (
          <StyledConfirmBtn
            className={sellPrice===''||pendingTx?'disable':""}
            onClick={async () => {
              if(pendingTx) return
              setPendingTx(true)
              const res = await onSellNft()
              setPendingTx(false)
              if(res){
                onDismiss()
                window.location.href=`/user/my`
              }
            }}
          >
            Sell
          </StyledConfirmBtn>
        )}
        {account && !isApprove && (
          <StyledConfirmBtn className={requestedApproval?'disable':""} onClick={handleApprove}>
            Approve NFT
          </StyledConfirmBtn>
        )}

        {!account&&(
          <StyledConfirmBtn
            onClick={() => {
              onPresentConnectModal();
            }}
          >
            Connect Wallet
          </StyledConfirmBtn>
        )}

      </StyledContainer>
    </Modal>
  )
}

export default SellModal

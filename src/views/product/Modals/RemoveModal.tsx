import React, { useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Modal, useWalletModal } from '@vipswap/uikit'
import { useTranslation } from 'contexts/Localization'

import { NftConfig } from '../../../config/constants/types'
import useTokenBalance, {  useGetBnbBalance } from '../../../hooks/useTokenBalance'
import useAuth from '../../../hooks/useAuth'
import tokens from '../../../config/constants/tokens'
import { walletSet } from '../../../components/Menu/config'
import { useCancelSellToken } from '../hooks/useAction'

export interface RemoveModalProps {
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
  font-size: 16px;
  margin-bottom: 10px;
  line-height: 1.4;
  ${({ theme }) => theme.mediaQueries.sm} {
     font-size: 18px;
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
const RemoveModal: React.FC<RemoveModalProps> = ({
 details,
 onDismiss,
}) => {
  const { t } = useTranslation()
  const bnbBalance = useGetBnbBalance()
  const quoteTokenBalance = useTokenBalance(details.quoteToken)
  const { account } = useWeb3React()
  const { login, logout, } = useAuth()

  const { onPresentConnectModal } = useWalletModal(login, logout, account, walletSet.helpLink, walletSet.scanLink, walletSet.scanLabel,bnbBalance.balance.toString(),tokens.bnb.symbol);

  const { onCancelSellNft } = useCancelSellToken(details.contract,details.tokenId)
  const [pendingTx, setPendingTx] = useState(false)

  return (
    <Modal title={t('Confirm Remove')} onDismiss={onDismiss}>
      <StyledContainer>
        <StyledPriceBox>
          <StyledBnbP>{t('Are you sure to remove this NFT')}</StyledBnbP>
        </StyledPriceBox>

        {account && (
            <StyledConfirmBtn
              onClick={async () => {
                if(pendingTx) return
                setPendingTx(true)
                const res = await onCancelSellNft()
                setPendingTx(false)
                if(res){
                  onDismiss()
                  window.location.href='/user/my'
                }
              }}
              className={pendingTx?'disable':''}
            >
              {pendingTx?'Pending':'Remove'}
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

      </StyledContainer>
    </Modal>
  )
}

export default RemoveModal

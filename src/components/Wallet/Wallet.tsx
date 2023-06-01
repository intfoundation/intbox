import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Button, Flex, useWalletModal } from '@vipswap/uikit'
import { walletSet } from 'components/Menu/config'
import BigNumber from 'bignumber.js'

import useAuth from '../../hooks/useAuth'
import { useTranslation } from '../../contexts/Localization'
import tokens from '../../config/constants/tokens'
import useTokenBalance, {useGetBnbBalance} from '../../hooks/useTokenBalance'
import { getAddress } from '../../utils/addressHelpers'
import { DEFAULT_TOKEN_DECIMAL } from '../../config'

interface LabelProps {
  text?: string
  isFinished?: boolean
}

const Wallet: React.FC<LabelProps> = ({ text, isFinished = false }) => {
  const { t } = useTranslation()
  const { account, chainId } = useWeb3React()
  const { login, logout, } = useAuth()
  // const tokenBalanceData = useTokenBalance(getAddress(tokens.int.address))
  const tokenBalanceData = useGetBnbBalance()
  const tokenBalance = new BigNumber(tokenBalanceData.balance).toNumber().toLocaleString('en-US', { maximumFractionDigits: 3 })

  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account, walletSet.helpLink, walletSet.scanLink, walletSet.scanLabel,tokenBalance,tokens.int.symbol);
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;
  return (
    <StyledContain>
      {account ? (
        <StyledFlex>
          <StyledBtn
            onClick={() => {
              onPresentAccountModal();
            }}
          >
            {accountEllipsis}
          </StyledBtn>
        </StyledFlex>
      ) : (
        <StyledBtn
          onClick={() => {
            onPresentConnectModal();
          }}
        >
          {t('Connect Wallet')}
        </StyledBtn>
      )}
    </StyledContain>
  );
}

const StyledContain = styled.div`
  position: relative;
`
const StyledFlex = styled(Flex)`
  justify-content: flex-end;
  align-items: center;
  border-radius: ${({theme})=>theme.expandColor.radius.radius1};
`
const StyledBtn = styled.button`
  height: 40px;
  padding: 0 24px;
  border-radius: ${({theme})=>theme.expandColor.radius.radius2};
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:  ${({theme})=>theme.expandColor.color.active};
  color: ${({theme})=>theme.expandColor.text.white};
  border: none;
  letter-spacing: 0.03em;
  line-height: 1;
  outline: 0;
  cursor: pointer;
  word-break: break-word;
  
  &:hover {
    opacity: 0.65;
  }
`
export default Wallet

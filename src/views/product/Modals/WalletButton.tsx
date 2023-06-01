import React from 'react'
import { useTranslation } from 'contexts/Localization'
import {useWeb3React} from "@web3-react/core";
import BigNumber from "bignumber.js";
import {useWalletModal} from "@vipswap/uikit";
import {InfoBtn, InfoBtnDisable, InfoBtnText} from "./ModalStyled";
import useAuth from "../../../hooks/useAuth";
import {useGetBnbBalance} from "../../../hooks/useTokenBalance";
import {walletSet} from "../../../components/Menu/config";
import tokens from "../../../config/constants/tokens";

const WalletButton: React.FC = () => {
  const { t } = useTranslation()
  const { account, chainId } = useWeb3React()
  const { login, logout, } = useAuth()
  // const tokenBalanceData = useTokenBalance(getAddress(tokens.int.address))
  const tokenBalanceData = useGetBnbBalance()
  const tokenBalance = new BigNumber(tokenBalanceData.balance).toNumber().toLocaleString('en-US', { maximumFractionDigits: 3 })

  const { onPresentConnectModal } = useWalletModal(login, logout, account, walletSet.helpLink, walletSet.scanLink, walletSet.scanLabel,tokenBalance,tokens.int.symbol);

  return (
    <InfoBtn
      onClick={() => {
        onPresentConnectModal();
      }}
    >
      <InfoBtnText>{t('Connect Wallet')}</InfoBtnText>
    </InfoBtn>
  )
}

export default WalletButton

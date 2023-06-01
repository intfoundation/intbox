import React from 'react'
import styled from 'styled-components'
import {useWeb3React} from "@web3-react/core";
import { IconButton, useModal, CalculateIcon, ErrorIcon, HelpIcon } from '@vipswap/uikit'
import { useTranslation } from 'contexts/Localization'

import { NftConfig } from '../../../config/constants/types'
import SellModal from './SellModal'
import toRight from "../../../asset/images/toRight.png";
import {InfoBtn, InfoBtnIcon, InfoBtnText} from "./ModalStyled";
import WalletButton from "./WalletButton";

export interface SellButtonProps {
  details: NftConfig
}

const SellButton: React.FC<SellButtonProps> = ({ details }) => {
  const { t } = useTranslation()
  const [onPresentPowerModal] = useModal(
    <SellModal
      details={details}
    />,
  )

  const handleClickButton = (event): void => {
    event.stopPropagation()
    onPresentPowerModal()
  }
  const { account } = useWeb3React()
  return account?(
    <InfoBtn onClick={handleClickButton} >
      <InfoBtnText>{t('Sell')}</InfoBtnText>
      <InfoBtnIcon src={toRight} alt=''/>
    </InfoBtn>
  ):(
    <WalletButton/>
  )
}

export default SellButton

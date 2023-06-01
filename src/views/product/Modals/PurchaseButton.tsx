import React from 'react'
import styled from 'styled-components'
import {useWeb3React} from "@web3-react/core";
import { IconButton, useModal, CalculateIcon, ErrorIcon, HelpIcon } from '@vipswap/uikit'
import { useTranslation } from 'contexts/Localization'

import PurchaseModal from './PurchaseModal'
import { NftConfig } from '../../../config/constants/types'
import toRight from "../../../asset/images/toRight.png";
import {InfoBtn, InfoBtnIcon, InfoBtnText} from "./ModalStyled";
import WalletButton from "./WalletButton";

export interface PurchaseButtonProps {
  details: NftConfig
}

const PurchaseButton: React.FC<PurchaseButtonProps> = ({ details }) => {
  const { t } = useTranslation()
  const [onPresentPowerModal] = useModal(
    <PurchaseModal
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
      <InfoBtnText>{t('Buy')}</InfoBtnText>
      <InfoBtnIcon src={toRight} alt=''/>
    </InfoBtn>
  ):(
    <WalletButton/>
  )
}

export default PurchaseButton

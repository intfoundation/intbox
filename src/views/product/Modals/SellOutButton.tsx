import React from 'react'
import { useTranslation } from 'contexts/Localization'

import {InfoBtnDisable, InfoBtnText} from "./ModalStyled";

const SellOutButton: React.FC = () => {
  const { t } = useTranslation()
  return (
    <InfoBtnDisable >
      <InfoBtnText>{t('SellOut')}</InfoBtnText>
    </InfoBtnDisable>
  )
}

export default SellOutButton

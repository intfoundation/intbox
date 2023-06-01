import React from 'react'
import styled from 'styled-components'
import {useWeb3React} from "@web3-react/core";

import { useTranslation } from 'contexts/Localization'
import {UiTableTdContainer} from "../layout/UiStyled";
import {getExplorerUrl} from "../../../utils/formatUtil";

export interface TradingDetailProps {
  tx: string
}

const StyledText = styled.div`
  color: ${({theme})=> theme.expandColor.color.color2};
`

const TradingDetail: React.FunctionComponent<TradingDetailProps> = ({ tx }) => {
  const { t } = useTranslation()
  const {chainId} = useWeb3React()
  return (
    <UiTableTdContainer>
      <a href={`${getExplorerUrl(chainId)}/tx/${tx}`} target="_blank"  rel="noreferrer">
        <StyledText>{t('check')}</StyledText>
      </a>
    </UiTableTdContainer>
  )
}

export default TradingDetail

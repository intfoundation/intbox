import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import {NftConfig} from "../../../config/constants/types";

export interface StatusProps extends NftConfig {
  orderBy?: number

}

const StyledText = styled.div<{isSold: boolean}>`
  background-color: ${({isSold,theme})=> isSold?theme.expandColor.bg.bg7:theme.expandColor.bg.bg4};
  color: ${({theme})=>theme.expandColor.text.white};
  padding: 5px;
  border-radius: 5px;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 10px;
  font-size: 16px;
`

const Owner: React.FunctionComponent<StatusProps> = ({contract}) => {
  const { t } = useTranslation()
  return (
    <Container>
      <StyledText isSold={false}>{false?t('已售'):t('在售')}</StyledText>
    </Container>
  )
}

export default Owner

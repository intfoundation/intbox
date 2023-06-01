import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { NftConfig} from "../../../config/constants/types";

export interface OwnerProps extends NftConfig {
  orderBy?: number

}

const StyledText = styled.div<{isSold: boolean}>`
  color: ${({isSold,theme})=> isSold?theme.expandColor.text.text1:theme.expandColor.text.black};
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 10px;
  font-size: 16px;
`

const Owner: React.FunctionComponent<OwnerProps> = ({ ownerAddress}) => {
  const { t } = useTranslation()
  return (
    <Container>
      <StyledText isSold={false}>{ownerAddress}</StyledText>
    </Container>
  )
}

export default Owner

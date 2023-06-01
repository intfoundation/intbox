import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import {NftConfig} from "../../../config/constants/types";
import {UiTableTdContainer} from "../layout/UiStyled";

export interface NftNoProps {
  nft: NftConfig
}

const StyledText = styled.div`
  color: ${({theme})=> theme.expandColor.color.black};
`

const NftNo: React.FunctionComponent<NftNoProps> = ({ nft }) => {
  const { t } = useTranslation()
  return (
    <UiTableTdContainer>
      <StyledText>#{nft.tokenId}</StyledText>
    </UiTableTdContainer>
  )
}

export default NftNo

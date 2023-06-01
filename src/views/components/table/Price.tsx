import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import {UiTableTdContainer} from "../layout/UiStyled";
import { quoteTokensArr } from '../../../config/constants/nfts'

export interface PriceProps {
  price: number,
  quoteToken: string
}

const StyledText = styled.div`
  color: ${({theme})=> theme.expandColor.color.active};
`

const Price: React.FunctionComponent<PriceProps> =
  ({
     price,
     quoteToken,
  }) => {
  const { t } = useTranslation()
  const pricingUnit = quoteTokensArr.find((quo)=>quo.address.toLowerCase()===quoteToken.toLowerCase())
  return (
    <UiTableTdContainer>
      <StyledText>{`${price} ${pricingUnit.symbol}`}</StyledText>
    </UiTableTdContainer>
  )
}

export default Price

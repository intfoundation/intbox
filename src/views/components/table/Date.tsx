import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import {UiTableTdContainer} from "../layout/UiStyled";

export interface DateProps {
  date: string
}

const StyledText = styled.div`
  color: ${({theme})=> theme.expandColor.color.black};
`

const Date: React.FunctionComponent<DateProps> = ({ date }) => {
  const { t } = useTranslation()
  return (
    <UiTableTdContainer>
      <StyledText>{date}</StyledText>
    </UiTableTdContainer>
  )
}

export default Date

import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import {UiTableTdContainer} from "../layout/UiStyled";

export interface EventProps {
  event: string
}

const StyledText = styled.div`
  color: ${({theme})=> theme.expandColor.color.black};
`

const Event: React.FunctionComponent<EventProps> = ({ event }) => {
  const { t } = useTranslation()
  return (
    <UiTableTdContainer>
      <StyledText>{event}</StyledText>
    </UiTableTdContainer>
  )
}

export default Event

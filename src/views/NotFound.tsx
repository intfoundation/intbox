import React from 'react'
import styled from 'styled-components'
import { Button, Heading, Text, LogoIcon } from '@vipswap/uikit'
import Page from 'components/layout/Page'
import { useTranslation } from 'contexts/Localization'
import LogoLight from "../asset/images/logo-v3-1.png";

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`
const StyledImg = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain; 
`

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <StyledNotFound>
        <StyledImg src={LogoLight} alt="icon" />
        <Heading scale="xxl">404</Heading>
        <Text mb="16px">{t('Page not found.')}</Text>
        <Button as="a" href="/" scale="sm">
          {t('Back Home')}
        </Button>
      </StyledNotFound>
    </Page>
  )
}

export default NotFound

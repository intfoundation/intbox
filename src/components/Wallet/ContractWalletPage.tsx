import React from 'react'
import styled from 'styled-components'
import { Button, Heading, Text } from '@vipswap/uikit'
import Page from 'components/layout/Page'
import { useTranslation } from 'contexts/Localization'
import LogoLight from '../../asset/images/logo-v3-1.png'
import useTheme from "../../hooks/useTheme";
import Wallet from './Wallet'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
  justify-content: center;
  padding-top: 50px;
  box-sizing: border-box;
  background-color: ${({theme})=>theme.expandColor.bg.bg3};
`
const StyledLogo = styled.div`
  width: 120px;
  height: 120px;
  padding: 15px;
  border-radius: 50%;
  background-color: ${({theme})=>theme.expandColor.bg.bg3};
  img{
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`

const ContractWalletPage = () => {
  const { t } = useTranslation()
  const { isDark } = useTheme()

  return (
    <>
      <StyledNotFound>
        <StyledLogo>
          <img src={isDark?LogoLight:LogoLight} alt="logo" />
        </StyledLogo>
        <Text mb="16px">{t('Please connect wallet')}</Text>
        <Wallet />
      </StyledNotFound>
    </>
  )
}

export default ContractWalletPage

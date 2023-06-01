import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router'
import { customMeta, DEFAULT_META } from 'config/constants/meta'
import Container from './Container'
import Footer from "./Footer";
import Header from "./Header";

const StyledPage = styled.div`
  min-height: calc(100vh - 64px);
  padding-top: 16px;
  padding-bottom: 16px;
  background-color: ${({theme})=>theme.expandColor.bg.bg3};

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 64px;
    padding-bottom: 32px;
  }
`
const StyledPage2 = styled(Container)`
  min-height: calc(100vh - 64px);
  padding-top: 0px;
  padding-bottom: 16px;
  max-width: 100%;
  padding-left: 0px;
  padding-right: 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 0px;
    padding-bottom: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 0px;
    padding-bottom: 32px;
  }
`

const PageMeta = () => {
  const { pathname } = useLocation()

  const pageMeta = customMeta[pathname] || {}
  const { title, description, image } = { ...DEFAULT_META, ...pageMeta }

  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Helmet>
  )
}

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <>
      <PageMeta />
      <Header/>
      <StyledPage {...props}>{children}</StyledPage>
      <Footer />
    </>
  )
}

export const PageMaxWidth: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <>
      <PageMeta />
      <Header/>
      <StyledPage2 {...props}>{children}</StyledPage2>
      <Footer/>
    </>
  )
}
export default Page

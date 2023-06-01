import React from 'react'
import styled,{keyframes} from 'styled-components'
import { Spinner } from '@vipswap/uikit'
import LogoLight from 'asset/images/logo-v3-1.png'
import useTheme from "../hooks/useTheme";
import Page from './layout/Page'

const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
`
const pulse = keyframes`
  0% { transform: scale(1); }
  60% { transform: scale(1.1); }
  100% { transform: scale(1); }
`
const AnimatedImg = styled.div`
  animation: ${pulse} 800ms linear infinite;
  & > * {
    width: 72px;
  }
`
const PageLoader: React.FC = () => {
  const { isDark } = useTheme()

  return (
    <Wrapper>
      <AnimatedImg>
        <img src={isDark ? LogoLight : LogoLight} alt="loading-icon" />
      </AnimatedImg>
    </Wrapper>
  )
}

export default PageLoader

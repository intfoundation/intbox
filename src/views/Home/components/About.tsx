import React from "react";
import styled from "styled-components";
import {Flex} from "@vipswap/uikit";

import Container from "../../../components/layout/Container";
import {useTranslation} from "../../../contexts/Localization";
import {UiItemBox, UiItemBoxContainer, UiItemRow} from "../../components/layout/UiStyled";

interface positionProp {
  top: string,
  left: string,
  right: string,
  bottom: string,
}
const positionArr = {
  topLeft: {top: '-20px',right: 'auto', bottom: 'auto', left: '10px'},
  topRight: {top: '-20px',right: '10px', bottom: 'auto', left: 'auto'},
  bottomLeft: {top: 'auto',right: 'auto', bottom: '-20px', left: '10px'},
  bottomRight: {top: 'auto',right: 'auto', bottom: '-20px', left: 'auto'},
}
const About:React.FunctionComponent = () => {
  const { t } = useTranslation()
  return (
    <StyledBox>
      <StyledTitle>{t('The world\'s leading NFT trading platform')}</StyledTitle>
      <StyledSubTitle>{t('aboutSub')}</StyledSubTitle>
      <StyledUiItemRow>
        <StyledUiItemBox>
          <StyledItem afterText='BRAND'  pData={positionArr.topLeft}>
            <StyledItemTitle>{t('aboutLabel1')}</StyledItemTitle>
            <StyledItemDesc>{t('aboutValue1')}</StyledItemDesc>
          </StyledItem>
        </StyledUiItemBox>
        <StyledUiItemBox>
          <StyledItem afterText='AMM'  pData={positionArr.topRight}>
            <StyledItemTitle>{t('aboutLabel2')}</StyledItemTitle>
            <StyledItemDesc>{t('aboutValue2')}</StyledItemDesc>
          </StyledItem>
        </StyledUiItemBox>
        <StyledUiItemBox>
          <StyledItem afterText='BRAND'  pData={positionArr.topLeft}>
            <StyledItemTitle>{t('aboutLabel3')}</StyledItemTitle>
            <StyledItemDesc>{t('aboutValue3')}</StyledItemDesc>
          </StyledItem>
        </StyledUiItemBox>
        <StyledUiItemBox>
          <StyledItem afterText='AMM'  pData={positionArr.topRight}>
            <StyledItemTitle>{t('aboutLabel4')}</StyledItemTitle>
            <StyledItemDesc>{t('aboutValue4')}</StyledItemDesc>
          </StyledItem>
        </StyledUiItemBox>

      </StyledUiItemRow>
    </StyledBox>
  )
}

const StyledBox = styled(Container)`
    position: relative;
    box-sizing: border-box;
    margin-top: 40px;
    overflow: hidden;
`
const StyledTitle = styled.div`
  font-size: 36px;
  text-align: center;
  padding: 0 15px;
  font-weight: 400;
  margin-bottom: 20px;
  margin-top: 80px;
  line-height: 1.4;
  ${({ theme }) => theme.mediaQueries.sm} {
        font-size: 36px;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
        font-size: 48px;
    }
`
const StyledSubTitle = styled.div`
  font-size: 18px;
  text-align: left;
  padding: 0 15px;
  font-weight: 500;
  margin-bottom: 20px;
  line-height: 1.4;
  color: ${({theme})=>theme.expandColor.text.text1};
  ${({ theme }) => theme.mediaQueries.lg} {
      max-width: 75%;
      margin-left: auto;
      margin-right: auto;
  }
`
const StyledUiItemRow = styled(UiItemRow)`
  margin: 0;
  padding: 30px;
  margin-bottom: 80px;
`
const StyledUiItemBox = styled(UiItemBox)`
  width: 100%;
  padding: 15px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 50%;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 50%;
  }
`
const StyledItem = styled(UiItemBoxContainer)<{afterText?: string, pData: positionProp}>`
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({theme})=>theme.expandColor.bg.bg4};
  margin: 0;
  overflow: hidden;
  
  &:after {
    content: "${({afterText})=>afterText??""}";
    position: absolute;
    top: ${({pData})=>pData.top};
    left: ${({pData})=>pData.left};
    right: ${({pData})=>pData.right};
    bottom: ${({pData})=>pData.bottom};
    opacity: 0.1;
    z-index: 1;
    font-size: 50px;
    font-weight: bold;
    color: ${({theme})=>theme.expandColor.text.text3};
  }
`
const StyledItemTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  align-items: center;
  color: ${({theme})=>theme.expandColor.text.text3};
`
const StyledItemDesc = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({theme})=>theme.expandColor.text.text3};
  margin-top: 10px;
  line-height: 1.4;
  text-align: center;
`
export default About

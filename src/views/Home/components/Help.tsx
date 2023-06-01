import React from "react";
import styled from "styled-components";
import {Flex} from "@vipswap/uikit";

import Container from "../../../components/layout/Container";
import {useTranslation} from "../../../contexts/Localization";
import {PrimaryBtn, PrimaryBtnWidthAuto} from "../../components/btn/UiButton";
import {UiItemBox, UiItemBoxContainer, UiItemBoxOld, UiItemRow} from "../../components/layout/UiStyled";

const Help:React.FunctionComponent = () => {
  const { t } = useTranslation()
  return (
    <StyledBox>
      <StyledTitle>{t('How to buy NFT')}</StyledTitle>
      <StyledSubTitle>{t('home-help-subT')}</StyledSubTitle>
      <UiItemRow>
        <UiItemBoxOld>
          <StyledItem>
            <StyledItemIcon src='/images/home/4.png'/>
            <StyledItemTitle>{t('home-help-1-t')}</StyledItemTitle>
            <StyledItemDesc>{t('home-help-1-v')}</StyledItemDesc>
          </StyledItem>
        </UiItemBoxOld>
        <UiItemBoxOld>
          <StyledItem>
            <StyledItemIcon src='/images/home/5.png'/>
            <StyledItemTitle>{t('home-help-2-t')}</StyledItemTitle>
            <StyledItemDesc>{t('home-help-2-v')}</StyledItemDesc>
          </StyledItem>
        </UiItemBoxOld>
        <UiItemBoxOld>
          <StyledItem>
            <StyledItemIcon src='/images/home/6.png'/>
            <StyledItemTitle>{t('home-help-3-t')}</StyledItemTitle>
            <StyledItemDesc>{t('home-help-3-v')}</StyledItemDesc>
          </StyledItem>
        </UiItemBoxOld>
      </UiItemRow>
      <Flex justifyContent="center">
        <a href={t('setUpINTMasterNetWorkUrl')} target="_blank" rel="noreferrer">
          <PrimaryBtnWidthAuto text={t('How to set up INT master network in MetaMask')}/>
        </a>
      </Flex>
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
        font-size: 60px;
    }
`
const StyledSubTitle = styled.div`
  font-size: 18px;
  text-align: center;
  padding: 0 15px;
  font-weight: 500;
  margin-bottom: 80px;
  line-height: 1.4;
  color: ${({theme})=>theme.expandColor.text.text1};
`

const StyledItem = styled(UiItemBoxContainer)`
  box-shadow: 0px 0px 8px #aaa;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({theme})=>theme.expandColor.bg.bg2};
`
const StyledItemIcon = styled.img`
  width: 80px;
  height: 80px;
  margin: 10px;
  object-fit: contain;
`
const StyledItemTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
`
const StyledItemDesc = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({theme})=>theme.expandColor.text.text1};
  margin-top: 20px;
  line-height: 1.4;
  text-align: center;
`
export default Help

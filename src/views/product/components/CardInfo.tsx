import React from "react";
import styled from "styled-components";
import Container from "../../../components/layout/Container";
import {useTranslation} from "../../../contexts/Localization";
import {NftConfig} from "../../../config/constants/types";

interface props {
  curNft: NftConfig
}
const CardInfo:React.FunctionComponent<props> = ({curNft}) => {
  const { t } = useTranslation()
  return (
    <StyledBox>
      <StyledTitle>{t('NFT Description')}</StyledTitle>
      <StyledContent>{curNft.introduction??t('No Data')}</StyledContent>
      <StyledTitle>{t('Brand Description')}</StyledTitle>
      <StyledContent>{curNft.brandDesc??t('No Data')}</StyledContent>
    </StyledBox>
  )
}


const StyledBox = styled(Container)`
    position: relative;
    box-sizing: border-box;
`
const StyledTitle = styled.div`
  margin-top: 80px;
  font-size: 26px;
`
const StyledContent = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: ${({theme})=>theme.expandColor.text.text1};
`

export default CardInfo

import React, {useState} from "react";
import styled, {keyframes} from "styled-components";

import {HotTag, SoldOutTag} from "./Tags";
import {useTranslation} from "../../../contexts/Localization";
import {UiItemBoxContainer} from "../layout/UiStyled";
import {NftConfig} from "../../../config/constants/types";
import {quoteTokensArr} from "../../../config/constants/nfts";
import CardInfoRow from "./components/CardInfoRow";
import CardImgHome from "./components/CardImgHome";

interface props {
  showTag?: boolean
  tag?: 'hot' | 'soldout'
  curNft: NftConfig
}

const getTag = (tag: string)=>{
  if(tag === 'hot'){
    return (<HotTag/>)
  }
  if(tag === 'soldout'){
    return (<SoldOutTag/>)
  }
  return null;
}

const NftCardHome:React.FunctionComponent<props>
  = ({
     showTag=true,
     tag='hot',
      curNft
}) => {
  const { t } = useTranslation()
  const tagView = getTag(tag)
  const pricingUnit = quoteTokensArr.find((quo)=>quo.address.toLowerCase()===curNft.quoteToken.toLowerCase())

  return (
    <StyledUiItemBox>
      <StyledItemContainer>
        {showTag && tagView}
        <CardImgHome curNft={curNft} tag={tag}/>
        <CardInfoRow curNft={curNft} tag={tag}/>
      </StyledItemContainer>
    </StyledUiItemBox>
  )
}

const StyledUiItemBox = styled.div`
    position: relative;
    width: 100%;
    box-sizing: border-box;
    ${({ theme }) => theme.mediaQueries.md} {
        width: 50%;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
        width: 33.333%;
    }
    display: flex;
`
const StyledItemContainer = styled(UiItemBoxContainer)`
  display: flex;
  flex-direction: column;
`

export default NftCardHome

import React, {useState} from "react";
import styled, {keyframes} from "styled-components";
import example2 from "asset/images/card/example2.png";
import toRight from "asset/images/toRight.png";
import vipIcon from "asset/images/tag/vip.png";
import {Flex} from "@vipswap/uikit";
import {Link} from "react-router-dom";

import {HotTag, SoldOutTag} from "./Tags";
import {useTranslation} from "../../../contexts/Localization";
import {UiItemBox, UiItemBoxContainer} from "../layout/UiStyled";
import {ContextApi} from "../../../contexts/Localization/types";
import {NftConfig} from "../../../config/constants/types";
import {getShortAddress} from "../../../utils/formatUtil";
import {quoteTokensArr} from "../../../config/constants/nfts";
import CardImg from "./components/CardImg";
import CardInfoRow from "./components/CardInfoRow";

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

const NftCard:React.FunctionComponent<props>
  = ({
     showTag=true,
     tag='hot',
      curNft
}) => {
  const { t } = useTranslation()
  const tagView = getTag(tag)
  const pricingUnit = quoteTokensArr.find((quo)=>quo.address.toLowerCase()===curNft.quoteToken.toLowerCase())

  return (
    <UiItemBox>
      <StyledItemContainer>
        {showTag && tagView}
        <CardImg curNft={curNft} tag={tag}/>
        <CardInfoRow curNft={curNft} tag={tag}/>
      </StyledItemContainer>
    </UiItemBox>
  )
}
const StyledItemContainer = styled(UiItemBoxContainer)`
  display: flex;
  flex-direction: column;
`

export default NftCard

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

const getMask = (tag: string,t: ContextApi['t'], contract: string, tokenid: number)=>{
  // const { t } = useTranslation()
  if(tag === 'hot'){
    return (
      <StyledCardImgMask>
        <StyledLink to={`/nft/collect/${contract}/${tokenid}`}>
          <StyledCardImgBtn>
            <div>{t('Sell')}</div>
            <img src={toRight} alt=''/>
          </StyledCardImgBtn>
        </StyledLink>
      </StyledCardImgMask>
    )
  }
  if(tag === 'soldout'){
    return (
      <StyledCardImgMask>
        <StyledCardImgBtnSoldOut>
          <div>{t('已售罄')}</div>
        </StyledCardImgBtnSoldOut>
      </StyledCardImgMask>
    )
  }
  return null;
}


const NftCardCollect:React.FunctionComponent<props>
  = ({
     showTag=true,
     tag='hot',
      curNft
}) => {
  const { t } = useTranslation()
  const tagView = getTag(tag)
  const maskView = getMask('hot', t, curNft.contract,curNft.tokenId)
  const pricingUnit = quoteTokensArr.find((quo)=>quo.address.toLowerCase()===curNft.quoteToken.toLowerCase())

  return (
    <UiItemBox>
      <UiItemBoxContainer>
        {showTag && tagView}
        <CardImg curNft={curNft} tag={tag} type="collect"/>
        <CardInfoRow curNft={curNft} tag={tag} type="collect"/>
      </UiItemBoxContainer>
    </UiItemBox>
  )
}

const StyledLink = styled(Link)`
  width: 100%; 
  display: flex;
  justify-content: center;
`
const StyledCardImg = styled.div`
    padding: 40px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({theme})=>theme.expandColor.bg.bg1};
    transition: all 0.3s;
    & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        transition: all 0.3s;
    }
`
const StyledCardImgMask = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left:0;
  display: none;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
`
const StyledCardImgBtn = styled.div`
  height: 50px;
  max-width: 90%;
  min-width: 60%;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({theme})=>theme.expandColor.radius.radius1};
  border: 2px solid ${({theme})=>theme.expandColor.text.text3};
  color: ${({theme})=>theme.expandColor.text.text3};
  background-color: ${({theme})=>theme.expandColor.bg.bg5};
  cursor: pointer;
  font-size: 18px;
  &:hover {
    background-color: ${({theme})=>theme.expandColor.bg.bg4};
  }
  & img {
    width: 16px;
    height: 16px;
    object-fit: contain;
    margin-left: 20px;
  }
`
const StyledCardImgBtnSoldOut = styled(StyledCardImgBtn)`
  background-color: ${({theme})=>theme.expandColor.bg.bg6};
  &:hover {
    background-color: ${({theme})=>theme.expandColor.bg.bg6};
  }
`
const imgScale = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
`;
const StyledCard = styled.div`
    position: relative;
    width: 100%;
    box-sizing: border-box;
    border-top-left-radius: ${({theme})=>theme.expandColor.radius.radius1};
    border-top-right-radius: ${({theme})=>theme.expandColor.radius.radius1};
    overflow: hidden;

    &:hover {
      ${StyledCardImgMask} {
        display: flex;
      }
      ${StyledCardImg} {
        // filter: blur(6px);
        // transform: scale(1.1);
        
        & img {
          filter: blur(3px);
          // animation: ${imgScale} 1s linear 1;
          transform: scale(1.1);
          // scale 会导致 filter 的重新加载
        }
      }
    }
`
const StyledCardInfo = styled.div`
  border-bottom-left-radius: ${({theme})=>theme.expandColor.radius.radius1};
    border-bottom-right-radius: ${({theme})=>theme.expandColor.radius.radius1};
    background-color: ${({theme})=>theme.expandColor.bg.bg2};
    box-shadow: 0px 0px 8px #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 20px;
`
const StyledInfoColumn = styled.div`
  flex: 2;
`
const StyledInfoName = styled.div`
  font-size: 18px;
`
const StyledInfoIcon = styled.div`
  width: 16px;
  height: 16px;
  margin-left: 10px;
  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`
const StyledInfoAuthor = styled.div`
  font-size: 14px;
  color: ${({theme})=> theme.expandColor.text.text1};
  margin-top: 10px;
`
const StyledInfoBtn = styled.div`
  height: 40px;
  border-radius: ${({theme})=>theme.expandColor.radius.radius1};
  border: 2px solid ${({theme})=>theme.expandColor.text.text2};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({theme})=>theme.expandColor.text.text2};
  background-color: ${({theme})=>theme.expandColor.bg.bg2};
  padding: 5px;
  cursor: pointer;
  &:hover {
    color: ${({theme})=>theme.expandColor.text.text3};
    background-color: ${({theme})=>theme.expandColor.text.text2};
  }
`
const StyledInfoBtnSoldOut = styled(StyledInfoBtn)`
  color: ${({theme})=>theme.expandColor.text.text3};
  border: 2px solid ${({theme})=>theme.expandColor.bg.bg7};
  background-color: ${({theme})=>theme.expandColor.bg.bg7};
  &:hover {
    color: ${({theme})=>theme.expandColor.text.text3};
    background-color: ${({theme})=>theme.expandColor.bg.bg7};
  }
`


export default NftCardCollect

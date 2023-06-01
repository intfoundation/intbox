import React from "react";
import styled, {keyframes} from "styled-components";
import {Link} from "react-router-dom";
import example2 from "../../../../asset/images/card/example2.png";
import {NftConfig} from "../../../../config/constants/types";
import {ContextApi} from "../../../../contexts/Localization/types";
import toRight from "../../../../asset/images/toRight.png";
import {useTranslation} from "../../../../contexts/Localization";

interface props {
  tag?: 'hot' | 'soldout'
  curNft: NftConfig
  type?: 'market'|'collect'|'onsale'
}
const getMask = (tag: string,t: ContextApi['t'], contract: string, tokenid: number,type: string)=>{
  // const { t } = useTranslation()
  if(tag === 'hot'){
    return (
      <StyledCardImgMask>
        <StyledLink to={`/nft/${type}/${contract}/${tokenid}`}>
          <StyledCardImgBtn>
            <div>{t('Buy')}</div>
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

const CardImgHome: React.FC<props> =
({
   tag='hot',
   curNft,
   type='market'
 })=>{
  const { t } = useTranslation()
  return (
    <StyledCard>
      <StyledLink to={`/nft/${type}/${curNft.contract}/${curNft.tokenId}`}>
        <StyledCardImg>
          <img src={curNft.img} alt=''/>
        </StyledCardImg>
      </StyledLink>
      {/*
      {maskView}
      */}
    </StyledCard>
  )
}
export default CardImgHome

const StyledLink = styled(Link)`
  width: 100%; 
  display: flex;
  justify-content: center;
`
const StyledCardImg = styled.div`
    width: 100%;
    padding: 40px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({theme})=>theme.expandColor.bg.bg1};
    transition: all 0.3s;
    height: 400px;
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
    max-height: 400px;

    &:hover {
      ${StyledCardImgMask} {
        display: flex;
      }
      ${StyledCardImg} {
        // filter: blur(6px);
        // transform: scale(1.1);
        
        & img {
          // filter: blur(3px);
          // animation: ${imgScale} 1s linear 1;
          transform: scale(1.1);
          // scale 会导致 filter 的重新加载
        }
      }
    }
`

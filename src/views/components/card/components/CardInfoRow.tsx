import React from "react";
import styled, {keyframes} from "styled-components";
import {Link} from "react-router-dom";
import {Flex} from "@vipswap/uikit";
import {NftConfig} from "../../../../config/constants/types";
import {useTranslation} from "../../../../contexts/Localization";
import vipIcon from "../../../../asset/images/tag/vip.png";
import {getShortAddress} from "../../../../utils/formatUtil";
import {quoteTokensArr} from "../../../../config/constants/nfts";

interface props {
  tag?: 'hot' | 'soldout'
  curNft: NftConfig
  type?: 'market'|'collect'|'onsale'
}

const CardInfoRow: React.FC<props> =
  ({
     tag='hot',
     curNft,
     type='market'
   })=>{
    const { t } = useTranslation()
    const pricingUnit = quoteTokensArr.find((quo)=>quo.address.toLowerCase()===curNft.quoteToken.toLowerCase())
    return (
      <StyledCardInfo>
        <StyledInfoColumn>
          <StyledInfoName>
            {curNft.name} {` #${curNft.tokenId}`}
          </StyledInfoName>
          <StyledInfoAuthor>
            <StyledInfoIcon><img src={vipIcon} alt=''/></StyledInfoIcon>
            {getShortAddress(curNft.ownerAddress)}
          </StyledInfoAuthor>
        </StyledInfoColumn>

        {/* 价格跳转详情按钮 */}
        {(type==='market'|| type==='onsale') && (
          <Link to={`/nft/${type}/${curNft.contract}/${curNft.tokenId}`}>
            <StyledInfoBtn>{`${curNft.price} ${pricingUnit.symbol}`}</StyledInfoBtn>
          </Link>
        )}
        {false && tag === 'hot' && (
          <Link to={`/nft/${type}/${curNft.contract}/${curNft.tokenId}`}>
            <StyledInfoBtn>{`${curNft.price} ${pricingUnit.symbol}`}</StyledInfoBtn>
          </Link>
        )}
        {false && tag === 'soldout' && (
          <StyledInfoBtnSoldOut>{`${curNft.price} ${pricingUnit.symbol}`}</StyledInfoBtnSoldOut>
        )}
      </StyledCardInfo>
    )
  }
export default CardInfoRow


const StyledCardInfo = styled.div`
  border-bottom-left-radius: ${({theme})=>theme.expandColor.radius.radius1};
    border-bottom-right-radius: ${({theme})=>theme.expandColor.radius.radius1};
    background-color: ${({theme})=>theme.expandColor.bg.bg2};
    box-shadow: 0px 0px 8px #ccc;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 20px;
    flex: 2;
`
const StyledInfoColumn = styled.div`
  flex: 2;
`
const StyledInfoName = styled.div`
  font-size: 14px;
`
const StyledInfoIcon = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 10px;
  display: inline-block;
  vertical-align: sub;
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

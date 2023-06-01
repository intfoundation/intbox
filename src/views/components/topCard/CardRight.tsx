import React from "react";
import styled from "styled-components";
import SVG from "react-inlinesvg";
import {Link} from "react-router-dom";

import {NftConfig} from "../../../config/constants/types";
import {useTranslation} from "../../../contexts/Localization";
import vipIcon from "../../../asset/images/tag/vip.png";
import callme from "../../../asset/icons/callme.svg";
import InfoDesc from "../../product/components/info/InfoDesc";
import {getShortAddress} from "../../../utils/formatUtil";
import InfoAuthor from "../../product/components/info/InfoAuthor";
import {useTokenSymbol} from "../../../hooks/useTokenBalance";

interface props {
  curNft: NftConfig,
  // canChooseNumber 是否显示'选择其他nft' 按钮
  canChooseNumber: boolean
}
const CardRight: React.FC<props> =
  ({
     curNft,
     canChooseNumber,
     children,
   })=>{
    const { t } = useTranslation()
    // const quoteTokenSymbol = useTokenSymbol(curNft.quoteToken)
    return (
      <StyledCardInfo>
        {curNft.isCertified && (
          <InfoApprove>
            <ApproveIcon src={vipIcon} alt=''/>
            <ApproveText>{t('该作品拥有INT官方认证')}</ApproveText>
          </InfoApprove>
        )}

        <InfoTitle>{t(curNft.name)}</InfoTitle>

        <DescRow>
          <CardNo>{`${t('TokenId')}: #${curNft?.tokenId}`}</CardNo>
          {canChooseNumber && (
            <Link to="/nfts">
              <CardNoLink>
                <div>{t('Choose another number')}</div>
                <SVG src={callme} width={16} />
              </CardNoLink>
            </Link>
          )}
        </DescRow>

        <InfoDesc
          address={curNft.contract}
          label={t('Contract Address')}
          value={getShortAddress(curNft.contract)}
        />

        <InfoPrice>{`${curNft?.price} ${curNft.quoteTokenSymbol}`}</InfoPrice>

        {children}

        {/*
        <InfoNum>{t('全球限量')} </InfoNum>
        */}

        <InfoAuthor
          address={curNft.creatorAddress}
          label="Creator"
          value={curNft.creatorName}
          type="disable"
          // imgUrl="/images/uheadimg1.jpeg"
        />
        <InfoAuthor
          address={curNft.ownerAddress}
          label="Owner"
          value={getShortAddress(curNft.ownerAddress)}
          // imgUrl="/images/uheadimg2.jpeg"
          imgBg="#4a58bd"
        />

      </StyledCardInfo>
    )
  }
export default CardRight
const StyledCardInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    margin-top: 15px;
    
    ${({ theme }) => theme.mediaQueries.sm} {
        width: 63%;
        padding: 0 15px;
        margin-top: 0px;
    }
`
const InfoApprove = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`
const ApproveText = styled.div`
  font-size: 14px;
  color: ${({theme})=>theme.expandColor.text.text1};
`
const InfoTitle = styled.div`
    font-size: 26px;
    line-height: 1.4;
    font-weight: 400;
    ${({ theme }) => theme.mediaQueries.sm} {
        font-size: 26px;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
        font-size: 40px;
    }
`
const DescRow = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
`
const InfoBtn = styled.div`
    border-radius: ${({theme})=>theme.expandColor.radius.radius1};
    background-color: ${({theme})=>theme.expandColor.bg.bg4};
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({theme})=>theme.expandColor.text.text3};
    height: 60px;
    cursor: pointer;
    margin-top: 15px;
    &:hover {
      background-color: ${({theme})=>theme.expandColor.bg.bg5};
    }
`
const InfoBtnText = styled.div`
    font-size: 16px;
    font-weight: 600;
`
const InfoBtnIcon = styled.img`
    width: 16px;
    height: 16px;
    object-fit: contain;
`
const ApproveIcon = styled(InfoBtnIcon)`
  margin-right: 10px;
`
const InfoNum = styled.div`
  font-size: 12px;
  padding-top: 5px;
  padding-bottom: 15px;
  text-align: right;
  margin-top: 5px;
  color: ${({theme})=>theme.expandColor.text.text1};
  border-bottom: 1px solid #ccc;
`
const CardNo = styled.span`
  color: ${({theme})=>theme.expandColor.text.text1};
  font-size: 16px;
  margin-right: 10px;
`
const CardNoLink = styled.div`
  display: flex;
  align-items: center;
  color: ${({theme})=>theme.expandColor.text.text4};
  
  & svg {
    fill: ${({ theme }) => theme.expandColor.text.text4};
  }
`
const InfoPrice = styled.div`
  font-size: 24px;
  color: ${({theme})=>theme.expandColor.text.text2};
  margin-top: 15px;
  ${({ theme }) => theme.mediaQueries.sm} {
      font-size: 40px;
  }
`

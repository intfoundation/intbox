import React, {useState} from "react";
import styled from "styled-components";
import example1 from "asset/images/card/example1.png";
import toRight from "asset/images/toRight.png";
import {Flex} from "@vipswap/uikit";
import {Link} from "react-router-dom";

import Container from "../../../components/layout/Container";
import {useTranslation} from "../../../contexts/Localization";
import {useGetNft, useNftsState} from "../../../state/nfts/hooks";
import {useTokenSymbol} from "../../../hooks/useTokenBalance";
import Circular from "../../components/layout/Circular";

const TopCard:React.FunctionComponent = () => {
  const { t } = useTranslation()
  const {data:nftList} = useNftsState()
  // const curNft = useGetNft('0x34596f8c16dc1112a7746bf528c637e49cf1347c',1)
  const curNft = nftList[0]
  // const quoteTokenSymbol = useTokenSymbol(curNft?curNft.quoteToken:'0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE')
  return curNft ? (
    <StyledBox>
      <StyledCardFlex>
        <StyledCard>
          <img src={curNft.img} alt=''/>
        </StyledCard>
        <StyledCardInfoM>
          <InfoTitle>{curNft.name}</InfoTitle>
          <InfoAuthor>
            <AuthorImg>
              <img src="/images/headimg.png" alt=''/>
            </AuthorImg>
            <AuthorInfo>
              <AuthorNameLabel>{t('Creator')}</AuthorNameLabel>
              <AuthorName>{curNft.creatorName}</AuthorName>
            </AuthorInfo>
          </InfoAuthor>
          <Flex alignItems="center">
            <DescPrice>{`${curNft.price} ${curNft.quoteTokenSymbol}`}</DescPrice>
            <Link to={`/nft/${curNft.contract}/${curNft.tokenId}`}>
              <InfoBtn>
                <InfoBtnText>{t('Buy')}</InfoBtnText>
                <InfoBtnIcon src={toRight} alt=''/>
              </InfoBtn>
            </Link>
          </Flex>

        </StyledCardInfoM>
      </StyledCardFlex>

      <StyledCardInfo>
        <InfoTitle>{curNft.name}</InfoTitle>
        <InfoAuthor>
          <AuthorImg>
            <img src="/images/headimg.png" alt=''/>
          {/*
            <img src="/images/uheadimg1.jpeg" alt=''/>
          */}
          </AuthorImg>
          <AuthorInfo>
            <AuthorNameLabel>{t('Creator')}</AuthorNameLabel>
            <AuthorName>{curNft.creatorName}</AuthorName>
          </AuthorInfo>
        </InfoAuthor>

        <InfoDesc>
          <DescLabel>{t('Price')}</DescLabel>
          <DescPrice>{`${curNft.price} ${curNft.quoteTokenSymbol}`}</DescPrice>
          <DescLabel>{t('Description')}</DescLabel>
          <DescContent>{t(`${curNft.contract.toLowerCase()} —— ${curNft.tokenId}`)}</DescContent>
          <DescLabel>{t('Introduction')}</DescLabel>
          <DescContent>{curNft.introduction}</DescContent>
        </InfoDesc>

        <Link to={`/nft/market/${curNft.contract}/${curNft.tokenId}`}>
          <InfoBtn>
            <InfoBtnText>{t('Buy')}</InfoBtnText>
            <InfoBtnIcon src={toRight} alt=''/>
          </InfoBtn>
        </Link>
      </StyledCardInfo>
    </StyledBox>
  ):null
}

const StyledBox = styled(Container)`
    position: relative;
    box-sizing: border-box;
    display: none;
    justify-content: space-between;
    ${({ theme }) => theme.mediaQueries.sm} {
        display: flex;
    }
`
const StyledCardFlex = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    ${({ theme }) => theme.mediaQueries.sm} {
        width: 35%;
        justify-content: center;
    }
`
const StyledCard = styled.div`
    position: relative;
    width: 100%;
    box-sizing: border-box;
    border-top-left-radius: ${({theme})=>theme.expandColor.radius.radius1};
    border-top-right-radius: ${({theme})=>theme.expandColor.radius.radius1};
    
    overflow: hidden;
    max-height: 500px;
    
    padding: 40px 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({theme})=>theme.expandColor.bg.bg1};
    ${({ theme }) => theme.mediaQueries.sm} {
       min-height: 500px;
       border-radius: ${({theme})=>theme.expandColor.radius.radius1};
    }
    
    & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
   
`

const StyledCardInfo = styled.div`
    width: 100%;
    display: none;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 15px;
    
    ${({ theme }) => theme.mediaQueries.sm} {
        width: 61%;
        display: flex;
    }
`
const InfoTitle = styled.div`
    font-size: 26px;
    line-height: 1.4;
    font-weight: 400;
    margin-bottom: 15px;
    ${({ theme }) => theme.mediaQueries.sm} {
        font-size: 26px;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
        font-size: 40px;
    }
`
const InfoAuthor = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
     margin-bottom: 15px;
`
const AuthorImg = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    background-color: ${({theme})=>theme.expandColor.bg.bg1};
    
    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
const AuthorInfo = styled.div`
    flex: 2;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`
const AuthorNameLabel = styled.div`
    font-size: 16px;
    line-height: 1.2;
    color: ${({theme})=>theme.expandColor.text.text1};
`
const AuthorName = styled.div`
    font-size: 16px;
    line-height: 1.2;
`
const InfoDesc = styled.div`
    padding: 30px;
    background-color: ${({theme})=>theme.expandColor.bg.bg2};
    border-radius: ${({theme})=>theme.expandColor.radius.radius1};
    box-shadow: 0px 0px 8px #ccc;
    ${({ theme }) => theme.mediaQueries.sm} {
        // max-height: 250px;
        // overflow: auto;
         margin-bottom: 15px;
    }
`
const DescLabel = styled.div`
    font-size: 16px;
    margin-bottom: 20px;
`
const DescPrice = styled.div`
    font-size: 30px;
    color: ${({theme})=>theme.expandColor.text.text2};
    margin-bottom: 30px;
`
const DescContent = styled.div`
    font-size: 16px;
    color: ${({theme})=>theme.expandColor.text.text1};
    margin-bottom: 15px;
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

const StyledCardInfoM = styled.div`
   border-bottom-left-radius: ${({theme})=>theme.expandColor.radius.radius1};
   border-bottom-right-radius: ${({theme})=>theme.expandColor.radius.radius1};
   background-color: ${({theme})=>theme.expandColor.bg.bg2};
   padding: 15px;
   ${({ theme }) => theme.mediaQueries.sm} {
        display: none;
    }
   
   ${InfoTitle} {
      font-size: 20px;
      margin-bottom: 15px;
   }
   ${InfoAuthor} {
      margin-bottom: 15px;
      ${AuthorImg} {
        width: 40px;
        height: 40px;
      }
   }
   ${DescPrice} {
      font-size: 20px;
      margin-bottom: 0;
      margin-right: 20px;
      flex: 1;
   }
   ${InfoBtn} {
    flex: 1;
    height: 40px;
   }
`

export default TopCard

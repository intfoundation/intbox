import React from 'react'
import styled from 'styled-components'
import {Heading, Text, BaseLayout, Flex} from '@vipswap/uikit'
import { useTranslation } from 'contexts/Localization'
import Page from 'components/layout/Page'
import Container from "components/layout/Container";
import {Link, useParams,useRouteMatch} from "react-router-dom";

interface props {
  name: string,
  address: string,
  headimg?: string,
  desc?: string,
}
const UserInfo: React.FC<props> = (props) => {
  const { t } = useTranslation()
  const { name,address,headimg,desc } = props

  return (
    <Container>
      <StyledInfoBox>
        <StyledHeadimg>
          <img src="/logo-v3-1.png" alt=""/>
        </StyledHeadimg>
        <StyledMsgBox>
          <StyledName>{t('UserAddress')}</StyledName>
          <StyledAddress>{address}</StyledAddress>
        </StyledMsgBox>
        <StyledLink>
          <Link to='/nft/nftCreate'>Create new item</Link>
        </StyledLink>
      </StyledInfoBox>
    </Container>
  )
}

const StyledInfoBox = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
  align-items: flex-end;
`
const StyledHeadimg = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${({theme})=>theme.expandColor.bg.bg1};
  border-radius: 50%;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 80px;
    height: 80px;
  }
  
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`
const StyledMsgBox = styled.div`
  flex: 2;
  padding-left: 15px;
`
const StyledName = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 28px;
    margin-bottom: 15px;
  }
`
const StyledAddress = styled.div`
  font-size: 12px;
  word-break: break-all;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 18px;
  }
`

const StyledLink = styled.div`
  font-size: 12px;
  color: #4a58bd;

  & a:hover{
    color: #4a58bdBf;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 18px;
  }

`
export default UserInfo

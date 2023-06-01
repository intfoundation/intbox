import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import {Link} from "react-router-dom";
import {useWeb3React} from "@web3-react/core";

import {getExplorerUrl} from "../../../../utils/formatUtil";

interface props {
  address: string,
  imgUrl?: string,
  label:string,
  value: string,
  type?: 'explorer'|'local'|'disable'
  imgBg?: string,
}
const InfoAuthor: React.FunctionComponent<props> =
  ({
     address,
    label,
    value,
    imgUrl,
     imgBg,
    type='explorer'
   }) => {
  const { t } = useTranslation()
    const {chainId} = useWeb3React()
    const explorerUrl = getExplorerUrl(chainId)
  return (
    <StyledInfoAuthor>
      <AuthorImg imgBg={imgBg??'#3e9bbd'}>
        <img src={imgUrl??"/images/headimg.png"} alt=''/>
      </AuthorImg>
      <AuthorInfo>
        <AuthorNameLabel>{t(label)}</AuthorNameLabel>
        {type==='disable' && (
          <AuthorName>{value}</AuthorName>
        )}
        {type==='local' && (
          <Link to={`/user/${address}?type=COLLECT`}>
            <AuthorName>{value}</AuthorName>
          </Link>
        )}
        {type==='explorer' && (
          <a href={`${explorerUrl}/address/${address}`} target="_blank" rel="noreferrer">
            <AuthorName>{value}</AuthorName>
          </a>
        )}
      </AuthorInfo>
    </StyledInfoAuthor>
  )
}
const StyledInfoAuthor = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 15px;
`
const AuthorImg = styled.div<{imgBg: string}>`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    // background-color: ${({theme})=>theme.expandColor.bg.bg1};
    background-color: ${({imgBg})=>imgBg};
    ${({ theme }) => theme.mediaQueries.sm} {
        width: 50px;
        height: 50px;
    }
    
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
    font-size: 14px;
    line-height: 1.2;
    color: ${({theme})=>theme.expandColor.text.text1};
    ${({ theme }) => theme.mediaQueries.sm} {
        font-size: 16px;
    }
`
const AuthorName = styled.div`
    font-size: 14px;
    line-height: 1.2;
    ${({ theme }) => theme.mediaQueries.sm} {
        font-size: 16px;
    }
`
export default InfoAuthor

import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import {Link} from "react-router-dom";
import {useWeb3React} from "@web3-react/core";

import {getExplorerUrl, getShortAddress} from "../../../../utils/formatUtil";

interface props {
  address: string,
  label:string,
  value: string,
}
const InfoDesc: React.FunctionComponent<props> =
({
   address,
   label,
   value,
 }) => {
  const { t } = useTranslation()
  const {chainId} = useWeb3React()
  const explorerUrl = getExplorerUrl(chainId)
  return (
    <StyledInfoDesc>
      <DescRow>
        <DescLabel>{label}</DescLabel>
        <a href={`${explorerUrl}/address/${address}`} target="_blank" rel="noreferrer">
          <DescContent>{value}</DescContent>
        </a>
      </DescRow>
    </StyledInfoDesc>
  )
}

const StyledInfoDesc = styled.div`
    padding: 15px;
    background-color: ${({theme})=>theme.expandColor.bg.bg2};
    border-radius: ${({theme})=>theme.expandColor.radius.radius1};
    box-shadow: 0px 0px 8px #ccc;
`
const DescRow = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
`
const DescLabel = styled.div`
    font-size: 16px;
    margin-right: 15px;
`
const DescContent = styled.div`
    font-size: 16px;
    color: ${({theme})=>theme.expandColor.text.text2};
    flex: 2;
`
export default InfoDesc

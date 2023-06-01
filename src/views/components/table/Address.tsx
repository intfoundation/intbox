import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import {Link} from "react-router-dom";
import {useWeb3React} from "@web3-react/core";

import {UiTableTdContainer} from "../layout/UiStyled";
import {getExplorerUrl, getShortAddress} from "../../../utils/formatUtil";

export interface AddressProps {
  address: string
}

const StyledText = styled.div`
  color: ${({theme})=> theme.expandColor.color.color2};
`

const Address: React.FunctionComponent<AddressProps> = ({ address }) => {
  const { t } = useTranslation()
  const {chainId} = useWeb3React()
  return (
    <UiTableTdContainer>
      <a href={`${getExplorerUrl(chainId)}/address/${address}`} target="_blank" rel="noreferrer">
        <StyledText>{address===''?'--':getShortAddress(address)}</StyledText>
      </a>
    </UiTableTdContainer>
  )
}

export default Address

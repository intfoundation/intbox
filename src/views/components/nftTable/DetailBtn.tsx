import React from 'react'
import styled from 'styled-components'
import {Link} from "react-router-dom";
import { useTranslation } from 'contexts/Localization'
import { NftConfig} from "../../../config/constants/types";

export interface DetailBtnProps extends NftConfig{
  orderBy?: number
}

const StyledText = styled.div`
  color: ${({theme})=> theme.expandColor.text.text2};
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 10px;
  font-size: 16px;
`

const DetailBtn: React.FunctionComponent<DetailBtnProps> = ({ contract,tokenId}) => {
  const { t } = useTranslation()

  return (
    <Container>
      <Link to={`/nft/${contract}/${tokenId}`}>
        <StyledText>{t('查看商品')}</StyledText>
      </Link>
    </Container>
  )
}

export default DetailBtn

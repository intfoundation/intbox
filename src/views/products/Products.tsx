import React from 'react'
import styled from 'styled-components'
import {Heading, Text, BaseLayout, Flex} from '@vipswap/uikit'
import {useParams,useLocation} from "react-router-dom";
import { useTranslation } from 'contexts/Localization'
import Page from 'components/layout/Page'
import hotIcon from "asset/images/tag/hot2.png"

import CardList from "./components/CardList";
import Container from "../../components/layout/Container";
import {usePollNftsDataByPage} from "../../state/nfts/hooks";
import {NFT_PER_PAGE} from "../components/types";

const Products: React.FC = () => {
  const { t } = useTranslation()
  // 获取页码
  const { search } = useLocation()
  const paramsString = search.substring(1)
  const searchParams = new URLSearchParams(paramsString)
  const curPage = searchParams.get('page')??'1'
  usePollNftsDataByPage(parseInt(curPage),NFT_PER_PAGE, '', '')

  return (
    <Page>
      <Container>
        <Flex alignItems="center" >
          <StyledIcon src={hotIcon} alt="" />
          <StyledTitle>{t('Hot Sale')}</StyledTitle>
        </Flex>
      </Container>
      <CardList curPage={curPage}/>
    </Page>
  )
}
const StyledTitle = styled.div`
  font-size: 36px;
  padding: 0 15px;
`
const StyledIcon = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
`

export default Products

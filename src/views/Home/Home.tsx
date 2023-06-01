import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@vipswap/uikit'
import { useTranslation } from 'contexts/Localization'
import Page from 'components/layout/Page'
import TopCard from "./components/TopCard";
import CardList from "./components/CardList";
import Help from "./components/Help";
import About from "./components/About";
import {usePollNftsData} from "../../state/nfts/hooks";

const Home: React.FC = () => {
  const { t } = useTranslation()
  usePollNftsData()

  return (
    <Page>
        <TopCard/>
        <CardList/>
        <Help/>
        <About/>
    </Page>
  )
}

export default Home

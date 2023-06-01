import React from 'react'
import styled from 'styled-components'
import {Heading, Text, BaseLayout, Flex} from '@vipswap/uikit'
import { useTranslation } from 'contexts/Localization'
import {useParams,useLocation} from "react-router-dom";
import {useWeb3React} from "@web3-react/core";

import Page from 'components/layout/Page'
import Container from "../../components/layout/Container";
import UserInfo from "./components/UserInfo";
import {getAddress} from "../../utils/addressHelpers";
import ButtonRow from "./components/ButtonRow";
import UserNfts from "./components/UserNfts";
import ContractWalletPage from "../../components/Wallet/ContractWalletPage";
import {usePollNftsDataByPage} from "../../state/nfts/hooks";
import {NFT_PER_PAGE} from "../components/types";
import BulkSale from './components/BulkSale';


interface paramsProps {
  address: string,
}
const UserSpace: React.FC = () => {
  const { t } = useTranslation()
// 获取路由参数
  const {address} = useParams<paramsProps>()
  const { account } = useWeb3React()
  const curAdd = address==='my'?account:address
  // 获取 type
  const { search } = useLocation()
  const paramsString = search.substring(1)
  const searchParams = new URLSearchParams(paramsString)
  const type = searchParams.get('type')??'COLLECT'
  const curPage = searchParams.get('page')??'1';
  // console.log(curPage);
  
  
  usePollNftsDataByPage(parseInt(curPage),NFT_PER_PAGE)

  return account?(
    <Page>
      
      <UserInfo name={curAdd} address={curAdd}  />

      <ButtonRow address={curAdd} type={type}/> 
      <StyledBox>
        {type==='COLLECT' && (
          <UserNfts address={curAdd} type={type} curPage={curPage}/>
        )}
        {type==='ONSALE' && (
          <UserNfts address={curAdd} type={type} curPage={curPage}/>
        )}   
        <StyledTable>
          {type==='BULKSALE' && (
            <BulkSale curPage={curPage}/>
          )}
        </StyledTable>
      </StyledBox>
    </Page>
  ):(
    <Page>
      <ContractWalletPage/>
    </Page>
  )
}

const StyledBox =styled.div`
  width: 100%;
  padding: 10px 0;
  max-width: 1200px;
  margin: 0 auto;
`
const StyledTable = styled.div`
  margin: 30px;
`

export default UserSpace

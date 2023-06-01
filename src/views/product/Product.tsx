import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useParams,useHistory} from "react-router-dom";
import {useWeb3React} from "@web3-react/core";
import { useSnackbar } from 'notistack'
import { useTranslation } from 'contexts/Localization'
import Collapse from '@material-ui/core/Collapse'
import Page from 'components/layout/Page'

import TopCard from "./components/TopCard";
import CardInfo from "./components/CardInfo";
import {useGetNft, useNftsState, usePollNftsData} from "../../state/nfts/hooks";
import {useAppDispatch} from "../../state";
import useRefresh from "../../hooks/useRefresh";
import {
  fetchNftsPublicDataAsync,
  fetchNftsUserAllowanceAsync, fetchNftsUserApproveAsync,
  fetchNftsUserSellDataAsync,
  fetchUserNftsDataAsync
} from "../../state/nfts";
import Trading from "./components/Trading";
import NotFound from "../NotFound";
import Circular from "../components/layout/Circular";
import {useGetNftDetail, useGetNftDetailONline} from "./hooks/useGetNftDetail";
import {getNFTSAddress} from "../../utils/addressHelpers";

interface paramsProps {
  contract: string,
  tokenid: string,
}
const Product: React.FC = () => {
  const { t } = useTranslation()
  const history = useHistory()
  // 更新nft数据
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  const { account,chainId } = useWeb3React()
  useEffect(() => {
    // dispatch(fetchNftsPublicDataAsync())
    if (account) {
      dispatch(fetchNftsUserAllowanceAsync(account))
      dispatch(fetchNftsUserApproveAsync(account))
      // dispatch(fetchUserNftsDataAsync(account))
      dispatch(fetchNftsUserApproveAsync(account))

    }
  }, [account, dispatch, slowRefresh])

  history.listen(route => {
    // console.log(route); // 这个route里面有当前路由的各个参数信息 如果变化直接js强制操作刷新页面...~~
    // window.location.reload();
    window.scrollTo(0,0)
  });
  // 获取路由参数
  const params = useParams<paramsProps>()
  const curNft = useGetNft(params.contract,Number(params.tokenid))
  // console.log(curNft)
  const fetchNft = useGetNftDetailONline(params.contract,Number(params.tokenid))
  // console.log(fetchNft)
  const [query, setQuery] = useState('')

  // const rowData = nftGroup.nft && nftGroup.nft.map((item,i)=>{
  //   const row:RowProps = {
  //     no: {...item},
  //     name: {...item},
  //     id: {...item},
  //     owner: {...item},
  //     status: {...item},
  //     price: {...item},
  //     detailBtn: {...item},
  //   }
  //   return row
  // })
  //
  // const renderContent = (): JSX.Element => {
  //   if(rowData.length){
  //     const columns = DesktopColumnSchema.map((column) => ({
  //       id: column.id,
  //       name: column.name,
  //       label: column.label,
  //       sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
  //         switch (column.name) {
  //           case 'no':
  //             return b.original.no.no - a.original.no.no
  //
  //           case 'id':
  //             return b.original.id.id - a.original.id.id
  //           default:
  //             return 1
  //         }
  //       },
  //       sortable: column.sortable,
  //     }))
  //     return <NftTable data={rowData} columns={columns} nftDataReady={false} />
  //   }
  //   return null
  // }
  const {dataLoaded} = useNftsState()
  const nftExchangeAdd = getNFTSAddress()

  return  fetchNft?(
    <Page>
      <TopCard curNft={curNft??fetchNft} isSell={!(nftExchangeAdd.toLowerCase()===fetchNft.ownerAddress.toLowerCase())}/>
      <CardInfo curNft={curNft??fetchNft}/>
      <Trading curNft={curNft??fetchNft}/>
      {/*
      <Container>
        {renderContent()}
      </Container>
      */}
    </Page>
  ):(
    <Page>
      <Circular />
    </Page>
  )
}


export default Product
// export default withRouter(Product)

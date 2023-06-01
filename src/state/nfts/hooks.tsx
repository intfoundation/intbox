import {useEffect} from "react";
import {useWeb3React} from "@web3-react/core";
import {useSelector} from "react-redux";

import {useAppDispatch} from "../index";
import useRefresh from "../../hooks/useRefresh";
import {fetchNftsPublicDataAsync, fetchSetNftLoadFalse, fetchSetUserNftLoadFalse} from "./index";
import { NftsState, State} from "../types";
import {NftConfig, NftUserAllowanceQuoteToken} from "../../config/constants/types";
import {NFT_PER_PAGE} from "../../views/components/types";

export const usePollNftsData = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()

  useEffect(() => {
    dispatch(fetchNftsPublicDataAsync({page:1,size:NFT_PER_PAGE, artworkType: '', name: ''}))
  }, [dispatch, slowRefresh, account])
}
export const usePollNftsDataByPage = (curpage:number,perpage:number, artworkType?: string, name?: string) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()

  useEffect(() => {
    dispatch(fetchNftsPublicDataAsync({page:curpage,size:perpage, artworkType, name}))
  }, [dispatch, slowRefresh, account, curpage, perpage, artworkType, name])
}
export const useSetNftDataLoadFalse = ()=>{
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchSetNftLoadFalse)
    dispatch(fetchSetUserNftLoadFalse)
  }, [dispatch])
}

// nfts
export const useNftsState = ():NftsState => {
  const nfts = useSelector((state: State)=> state.nfts)
  return nfts
}
export const useGetNft = (contract: string, tokenId: number):NftConfig =>{
  const nftFind = useSelector((state: State)=>state.nfts.data.find((nft)=>nft.tokenId===tokenId&&nft.contract.toLowerCase()===contract.toLowerCase()))
  return nftFind
}
export const useGetUserNft = (contract: string, tokenId: number):NftConfig =>{
  const nftFind = useSelector((state: State)=>state.nfts.userData.find((nft)=>nft.tokenId===tokenId&&nft.contract.toLowerCase()===contract.toLowerCase()))
  return nftFind
}
// 查找出售中的nft
export const useGetUserOnSaleNft = (contract: string, tokenId: number):NftConfig =>{
  const nftFind = useSelector((state: State)=>state.nfts.userSell.find((nft)=>nft.tokenId===tokenId&&nft.contract.toLowerCase()===contract.toLowerCase()))
  return nftFind
}
export const useGetUserAllowanceQuoteToken = (contract: string,quoteToken: string):NftUserAllowanceQuoteToken =>{
  const allowanceFind = useSelector((state:State) => state.nfts.userAllowance.find((nft)=>nft.nftToken.toLowerCase()===contract.toLowerCase()&&nft.quoteToken.toLowerCase()===quoteToken.toLowerCase()))
  return allowanceFind
}

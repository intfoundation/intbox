import { useCallback } from 'react'
import { Contract } from 'web3-eth-contract'
import { useWeb3React } from '@web3-react/core'

import { useAppDispatch } from '../../../state'
import { useExchangeNFTs } from '../../../hooks/useContract'
import {approve, buyTokenNFT, cancelSellTokenNFT, sellTokenNFT, batchSellTokenNFT} from '../../../utils/callHelpers'
import {
  fetchNftsPublicDataAsync,
  fetchNftsUserAllowanceAsync,
  fetchNftsUserSellDataAsync,
  fetchUserNftsDataAsync,
} from '../../../state/nfts'
import useWeb3 from '../../../hooks/useWeb3'

// 购买nft
export const useBuyToken = (nftToken: string,tokenId: number,quoteToken: string,price:number,) => {
  const dispatch = useAppDispatch()
  const { account,chainId } = useWeb3React()
  const exchangeNFTsContract = useExchangeNFTs()
  // const web3 = useWeb3()

  const handleBuy = useCallback(async () => {
    try {
      const tx = await buyTokenNFT( exchangeNFTsContract,nftToken, tokenId,quoteToken,price, account)
      // dispatch(fetchNftsPublicDataAsync())
      // dispatch(fetchUserNftsDataAsync(account))
      return tx
    } catch (e) {
      console.error(e)
      return false
    }
  }, [account, exchangeNFTsContract,nftToken,tokenId,quoteToken,price])

  return { onBugNft: handleBuy }
}

// 出售nft
export const useSellToken = (nftToken: string,tokenId: number,quoteToken: string,price:string,) => {
  const dispatch = useAppDispatch()
  const { account,chainId } = useWeb3React()
  const exchangeNFTsContract = useExchangeNFTs()

  const handleSell = useCallback(async () => {
    try {
      const tx = await sellTokenNFT( exchangeNFTsContract,nftToken, tokenId,quoteToken,price, account)
      // dispatch(fetchNftsPublicDataAsync())
      dispatch(fetchNftsUserAllowanceAsync(account))
      // dispatch(fetchUserNftsDataAsync(account))
      dispatch(fetchNftsUserSellDataAsync({account}))
      return tx
    } catch (e) {
      console.error(e)
      return false
    }
  }, [account, dispatch, exchangeNFTsContract,nftToken,tokenId,quoteToken,price])

  return { onSellNft: handleSell }
}

// 撤销 出售的nft
export const useCancelSellToken = (nftToken: string,tokenId: number)=>{

  const dispatch = useAppDispatch()
  const { account,chainId } = useWeb3React()
  const exchangeNFTsContract = useExchangeNFTs()


  const handleCancelSell = useCallback(async () => {
    try {
      const tx = await cancelSellTokenNFT( exchangeNFTsContract,nftToken, tokenId, account)
      // dispatch(fetchNftsPublicDataAsync())
      // dispatch(fetchUserNftsDataAsync(account))
      dispatch(fetchNftsUserSellDataAsync({account}))
      return tx
    } catch (e) {
      console.error(e)
      return false
    }
  }, [account, dispatch, exchangeNFTsContract,nftToken,tokenId])

  return { onCancelSellNft: handleCancelSell }
}

// 批量出售
export const useBatchSellToken = () => {
  const dispatch = useAppDispatch()
  const { account,chainId } = useWeb3React()
  const exchangeNFTsContract = useExchangeNFTs()
  const handleBatchSell = useCallback(async (nftTokens: any[],tokenIds: any[],quoteTokens: any[],prices: any[], selleStatus: any[]) => {
    try {
      const tx = await batchSellTokenNFT(exchangeNFTsContract, nftTokens, tokenIds, quoteTokens, prices, selleStatus, account)
      // dispatch(fetchNftsPublicDataAsync())
      dispatch(fetchNftsUserAllowanceAsync(account))
      // dispatch(fetchUserNftsDataAsync(account))
      dispatch(fetchNftsUserSellDataAsync({account}))
      return tx
    } catch (e) {
      console.error(e)
      return false
    }
  }, [account, dispatch, exchangeNFTsContract])
  return {onBatchSellNft: handleBatchSell}
}
export default null

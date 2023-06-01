import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers, Contract } from 'ethers'

import { useAppDispatch } from '../../../state'
import { useExchangeNFTs } from '../../../hooks/useContract'
import {approve, approveNftAll, approveNftToAddress} from '../../../utils/callHelpers'
import {fetchNftsUserAllowanceAsync, fetchNftsUserApproveAsync, fetchUserNftsDataAsync} from '../../../state/nfts'
import { getNFTSAddress } from '../../../utils/addressHelpers'
import {useCallWithGasPrice} from "../../../hooks/useCallWithGasPrice";

export const useApproveQuoteToken = (quoteTokenContract: Contract) => {
  const dispatch = useAppDispatch()
  const { account,chainId } = useWeb3React()
  const exchangeNFTsContract = useExchangeNFTs()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(quoteTokenContract, exchangeNFTsContract, account)
      dispatch(fetchNftsUserAllowanceAsync(account))
      return tx
    } catch (e) {
      console.error(e)
      return false
    }
  }, [account, dispatch, quoteTokenContract, exchangeNFTsContract])

  return { onApprove: handleApprove }
}

export const useApproveSellNft = (nftContract: Contract, tokenid: number) => {
  const dispatch = useAppDispatch()
  const { account,chainId } = useWeb3React()
  const exchangeNftAddress = getNFTSAddress()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approveNftToAddress(nftContract, exchangeNftAddress,tokenid, account)
      // dispatch(fetchUserNftsDataAsync(account))
      dispatch(fetchNftsUserApproveAsync(account))
      return tx
    } catch (e) {
      console.error(e)
      return false
    }
  }, [account, dispatch, nftContract, tokenid,exchangeNftAddress])

  return { onApprove: handleApprove }

}
export const useApproveSellNftAll = (nftContract: Contract, tokenid: number) => {
  const dispatch = useAppDispatch()
  const { account,chainId } = useWeb3React()
  const exchangeNftAddress = getNFTSAddress()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approveNftAll(nftContract, exchangeNftAddress,tokenid, account)
      // dispatch(fetchUserNftsDataAsync(account))
      dispatch(fetchNftsUserApproveAsync(account))
      return tx
    } catch (e) {
      console.error(e)
      return false
    }
  }, [account, dispatch, nftContract, tokenid,exchangeNftAddress])

  return { onApprove: handleApprove }

}
export const useApproveSellNftBak = (nftContract: Contract, tokenid: number) => {
  const exchangeNftAddress = getNFTSAddress()
  const { callWithGasPrice } = useCallWithGasPrice()
  const handleApprove = useCallback(async () => {
    try {
      const tx = await callWithGasPrice(nftContract, 'approve', [
        exchangeNftAddress,
        tokenid,
      ])
      const receipt = await tx.wait()
      return receipt.status
    } catch (e) {
      return false
    }
  }, [nftContract, exchangeNftAddress, callWithGasPrice,tokenid])

  return { onApprove: handleApprove }
}

export default null

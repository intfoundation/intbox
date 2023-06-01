import { useCallback } from 'react'
import IntBoxNFTAbi from 'vipswap/lib/abi/nfts/INTBoxNFT.json'
import INTBoxNFTFactory from 'vipswap/lib/abi/nfts/INTBoxNFTFactory.json'
import { Contract } from 'web3-eth-contract'
import { useWeb3React } from '@web3-react/core'

import { useAppDispatch } from '../../../state'
import {useERC20, useExchangeNFTs, useNftContract} from '../../../hooks/useContract'
import {getNFTfactoryAddress} from "../../../utils/addressHelpers";
import {approve, buyTokenNFT, cancelSellTokenNFT, sellTokenNFT, createTokenNFT, setTokenURI, queryTokenURI, setBaseURI} from '../../../utils/callHelpers'
import {
  fetchNftsPublicDataAsync,
  fetchNftsUserAllowanceAsync,
  fetchNftsUserSellDataAsync,
  fetchUserNftsDataAsync,
} from '../../../state/nfts'
import useWeb3 from '../../../hooks/useWeb3'

export const useCreateToken = (to: string, supportCommToken: string)=>{
  const useNFTContract = useNftContract(INTBoxNFTFactory, getNFTfactoryAddress());
  const useERC20Contract = useERC20(supportCommToken);
  // console.log(useERC20Contract);
  const getSupport = async () => {
    // 调用supportCommission
    const support = await useNFTContract.supportCommission();
    // console.log(support.supportCommToken);
    // console.log(typeof (support.supportCommToken));
    return support;
  }
  const handleCreate = useCallback(async (uri) => {
    // console.log(1)
    // console.log('useNFTContract: ' )
    // console.log(useNFTContract)
    try {
      // console.log(uri)

      const tx = await createTokenNFT(useNFTContract, to, uri, useERC20Contract)
      // console.log(4)
      // console.log(tx)
      return tx
    } catch (e) {
      console.error(e)
      return false
    }
  }, [useNFTContract, to, useERC20Contract])
  // console.log(5)
  return { onCreateNft: handleCreate, getSupport}
}

// 设置token uri
export const useSetTokenURI = (id: number, uri: string)=>{
  const useNFTContract = useNftContract(IntBoxNFTAbi, '0x34596f8c16dc1112a7746bf528c637e49cf1347c')
  // console.log('useNFTContract: ' )
  // console.log(useNFTContract)
  const handleSetTokenURI = useCallback(async () => {
    // console.log(1)
    try {
      const tx = await setTokenURI(useNFTContract, id, uri)
      return tx
    } catch (e) {
      console.error(e)
      return false
    }
  }, [useNFTContract, id, uri])
  return { onSetTokenURI: handleSetTokenURI }
}

// 查找token uri
export const useQueryTokenURI = ()=>{
  const useNFTContract = useNftContract(IntBoxNFTAbi, '0x34596f8c16dc1112a7746bf528c637e49cf1347c')
  // console.log('useNFTContract: ' )
  // console.log(useNFTContract)
  const handleTokenURI = useCallback(async (id: number) => {
    // console.log(1)
    try {
      const tx = await queryTokenURI(useNFTContract, id)
      return tx
    } catch (e) {
      console.error(e)
      return false
    }
  }, [useNFTContract])
  return { onTokenURI: handleTokenURI }
}

// 设置token
export const useSetBaseURI = (uri: string)=>{
  const useNFTContract = useNftContract(IntBoxNFTAbi, '0x34596f8c16dc1112a7746bf528c637e49cf1347c')
  // console.log('useNFTContract: ' )
  // console.log(useNFTContract)
  const handleSetBaseURI = useCallback(async () => {
    // console.log(1)
    try {
      const tx = await setBaseURI(useNFTContract, uri)
      return tx
    } catch (e) {
      console.error(e)
      return false
    }
  }, [useNFTContract, uri])
  return { onSetBaseURI: handleSetBaseURI }
}
export default null

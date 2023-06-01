import {useWeb3React} from "@web3-react/core";
import BigNumber from "bignumber.js";
import {useCallback, useEffect, useState} from "react";
import {getMasterChefAddress, getNFTSAddress} from "../../../utils/addressHelpers";
import multicall from "../../../utils/multicall";
import masterchefABI from "../../../vipswap/lib/abi/vipswapPoolsV1.json";
import {DEFAULT_TOKEN_DECIMAL} from "../../../config";
import {NftConfig, NftTrading} from "../../../config/constants/types";
import {getNftTxList, getUserNft, getUserNftTotalNum} from "../../../state/nfts/helpers";
import {nftsLocalOnlyToken} from "../../../config/constants/nfts";
import NFTsAbi from "../../../vipswap/lib/abi/GameSeaExchangeNFTs.json";

/** 获取用户 创建的nft
 */
export const useGetUserCreateNfts = () => {
  const { account } = useWeb3React()
  const [data, setData] = useState<NftConfig[]>([])

  const fun = useCallback(async () => {
    const masterChefAddress = getMasterChefAddress()
    const calls = [
      {
        address: masterChefAddress,
        name: 'rewardInfos',
        params: [account],
      },
    ]
    const [
      rewardInfos,
    ] = await multicall(masterchefABI, calls)
    setData([])
  }, [ setData, account])

  useEffect(() => {
    if (account) {
      fun()
    }
  }, [ setData, account, fun])

  return data
}
/** 获取用户 拥有的nft
 */
export const useGetUserCollectNfts = () => {
  const { account } = useWeb3React()
  const [inviteRewardDebtAllPools, setInviteRewardDebtAllPools] = useState(0)

  const rewardDebtAllPools = useCallback(async () => {
    const masterChefAddress = getMasterChefAddress()
    const calls = [
      {
        address: masterChefAddress,
        name: 'rewardInfos',
        params: [account],
      },
    ]
    const [
      rewardInfos,
    ] = await multicall(masterchefABI, calls)
    const result = new BigNumber(rewardInfos.inviteReward._hex).div(DEFAULT_TOKEN_DECIMAL);
    setInviteRewardDebtAllPools(new BigNumber(result.toFixed(3)).toNumber())
  }, [ setInviteRewardDebtAllPools, account])

  useEffect(() => {
    if (account) {
      rewardDebtAllPools()
    }
  }, [ setInviteRewardDebtAllPools, account, rewardDebtAllPools])

  return inviteRewardDebtAllPools
}

// 获取用户nft总量
const fetchAsks = async (account:string, name: string, artworkType: string)=>{
  const res = await  Promise.all(
    nftsLocalOnlyToken.map(async (item)=>{
      const data = await getUserNftTotalNum(item.token, account, name, artworkType)
      // console.log(data);
      
      return parseInt(data.pageCount)
    })
  )
  return res.flat()
}
export const useGetUserNftTotal = (account: string, name: string, artworkType: string)=> {
  const [total, setTotal] = useState(0)
    const handleFunction = useCallback(async () => {
    const resData = await fetchAsks(account, name, artworkType)
    let num = 0;
    resData.map((l)=>{
      // console.log('totalnew', new BigNumber(total).plus(new BigNumber(l)).toNumber())
      num += l
      return l
    })
    setTotal(num)
  }, [account, name, artworkType])

  useEffect(() => {
    if(account){
      handleFunction()
    }
  }, [ handleFunction,setTotal,account])

  return total
}

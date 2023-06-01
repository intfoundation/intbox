import {useWeb3React} from "@web3-react/core";
import {useCallback, useEffect, useState} from "react";
import BigNumber from "bignumber.js";
import moment from 'moment';
import {DEFAULT_TOKEN_DECIMAL} from "../../../config";
import { NftConfig, NftTrading} from "../../../config/constants/types";
import {getNftTxList, getUserNftTotalNum} from "../../../state/nfts/helpers";
import multicall from "../../../utils/multicall";
import {nftsLocalOnlyToken} from "../../../config/constants/nfts";
import {getNFTSAddress} from "../../../utils/addressHelpers";
import NFTsAbi from "../../../vipswap/lib/abi/GameSeaExchangeNFTs.json";
import {marketCount} from "./helpers";

const fetchAsks = async (artworkType?: string, name?: string)=>{
  const nftContract = getNFTSAddress()
  const res = await  Promise.all(
    nftsLocalOnlyToken.map(async (item)=>{
        const data = await marketCount(nftContract, artworkType, name)
        return data
    })
  )
  return res.flat()
}
/** 获取 nft trading
 */
const useGetTotalNum = (artworkType?: string, name?: string) => {
  const [total, setTotal] = useState(0)

  const handleFunction = useCallback(async () => {
    const resData = await fetchAsks(artworkType, name)
    let num = 0;
    resData.map((l)=>{
      // console.log('totalnew', new BigNumber(total).plus(new BigNumber(l)).toNumber())
      num += l
      return l
    })
    setTotal(num)
  }, [artworkType, name])

  useEffect(() => {
    handleFunction()
  }, [ handleFunction,setTotal])

  return total
}
export default  useGetTotalNum

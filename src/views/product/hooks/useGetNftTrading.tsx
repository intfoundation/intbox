import {useWeb3React} from "@web3-react/core";
import {useCallback, useEffect, useState} from "react";
import BigNumber from "bignumber.js";
import moment from 'moment';
import {DEFAULT_TOKEN_DECIMAL} from "../../../config";
import { NftConfig, NftTrading} from "../../../config/constants/types";
import {getNftTxList} from "../../../state/nfts/helpers";

/** 获取 nft trading
 */
const useGetNftTrading = (nft:NftConfig) => {
  const [trading, setTrading] = useState<NftTrading[]>(null)

  const handleFunction = useCallback(async () => {
    const listOrder = await getNftTxList(nft.contract, nft.tokenId)
    const txList:NftTrading[] = listOrder.map((item)=>{
      return {
        tokenId: item.tokenId,
        price: new BigNumber(item.price).div(DEFAULT_TOKEN_DECIMAL).toNumber(),
        event: item.evenName,
        from: item.seller,
        to: item.buyer??'',
        date: moment(item.timestamp*1000).format('YYYY-MM-DD HH:mm:ss'),
        tx: item.txHash,
        quoteToken: item.quoteToken,
      }
    })
    setTrading(txList)
  }, [ setTrading,nft])

  useEffect(() => {
    handleFunction()
  }, [ setTrading, handleFunction])

  return trading
}
export default  useGetNftTrading

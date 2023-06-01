import { NftConfig } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import NFTsAbi from 'vipswap/lib/abi/GameSeaExchangeNFTs.json'

import { nftsLocalArr } from '../../../config/constants/nfts'
import { getNFTSAddress } from '../../../utils/addressHelpers'
import multicall from '../../../utils/multicall'
import { DEFAULT_TOKEN_DECIMAL } from '../../../config'
import {getNftDataById, getQuoteTokenUsdtPrice, getUserNft} from "./helpers";

const fetchNfts = async (option:{page:number,size: number}) => {
  const ndata:NftConfig[][] = await Promise.all(
    // 获取本地保存的 nft token 数组，循环查询 token下的所有nft
    nftsLocalArr.map( async (nftToken,_i)=>{
      const nftContract = getNFTSAddress()
      const calls = [
        {
          address: nftContract,
          name: 'getAsksByPage',
          params: [nftToken.token,nftToken.quoteToken,option.page,option.size],
        },
      ]
      const [
        asksData,
      ] = await multicall(NFTsAbi, calls)

      const asks = asksData[0]
      const asksArr:NftConfig[] = await Promise.all(
        asks.map(async (item)=>{
          const tokenCalls = [
            {
              address: nftToken.token,
              name: 'ownerOf',
              params: [new BigNumber(item.tokenId._hex).toNumber()],
            },
          ]
          const [
            nftOwner,
          ] = await multicall(nftToken.abi, tokenCalls)
          const nftData = await getNftDataById(nftToken.token,new BigNumber(item.tokenId._hex).toNumber())
          const quoteUsdt = await getQuoteTokenUsdtPrice(nftToken.quoteToken)
          const nftPriceUsdt = new BigNumber(quoteUsdt).times(new BigNumber(item.price._hex).div(DEFAULT_TOKEN_DECIMAL))

          return {
            contract: nftToken.token,
            quoteToken: nftToken.quoteToken,
            quoteTokenSymbol: nftToken.quoteTokenSymbol,
            tokenId: new BigNumber(item.tokenId._hex).toNumber(),
            price: new BigNumber(item.price._hex).div(DEFAULT_TOKEN_DECIMAL).toNumber(),
            priceUsdt: nftPriceUsdt.toNumber(),
            ownerAddress: nftOwner?nftOwner[0]:'',
            // 柯基
            name: nftData.name,
            contractName: nftToken.name,
            type: 'img',
            // img: '/nftassest/sample.png',
            img: nftData.imgBase64,
            creatorName: nftData.creatorName,
            introduction: nftData.introduction,
            brandDesc: nftData.brandDesc,
          }
        })
      )
      return asksArr
    })
  )

  return ndata
}

export default fetchNfts

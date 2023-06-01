import { NftConfig } from 'config/constants/types'
import {useState} from "react";
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import NFTsAbi from 'vipswap/lib/abi/GameSeaExchangeNFTs.json'

import { nftsLocalArr, nftsLocalOnlyToken } from '../../config/constants/nfts'
import { getNFTSAddress } from '../../utils/addressHelpers'
import multicall from '../../utils/multicall'
import { DEFAULT_TOKEN_DECIMAL } from '../../config'
import erc20ABI from '../../vipswap/lib/abi/erc20.json'
import {getNftById, getNftDataById, getQuoteTokenUsdtPrice, getUserNft} from "./helpers";
import {marketList} from "../../views/products/hooks/helpers";

const defaultNftInfoData = {
  creatorName: 'INT Designer',
  introduction: 'Panda Freddy was born from a fun emoji contest in the INT community. A community member made a panda-related image that was loved by so many people that the image of a panda was identified as the INT mascot and named Panda Freddy . "Panda Freddy - hello world!" - this piece is the first in a series of works of the mascot, which was born and says hello to the world.',
  brandDesc: "The image of Freddy Panda was inspired by a panda emoji holding a computer and drinking in a meme contest organized by the INT German community. This image gained so much love from the community throughout the contest that we decided to make him the INT mascot and asked for proposals for a name - Freddy Panda.\nFreddy Panda represents the INT community's active participation in the community as well as their dedication to creativity and talent. Only 30 Freddy Panda items have been made as yet, and more are waiting to be inspired!",
}
const fetchNfts = async (option:{page:number,size: number, artworkType?: string, name?: string}) => {
  const nftContract = getNFTSAddress()
  const ndata:NftConfig[][] = await Promise.all(
    // 获取本地保存的 nft token 数组，循环查询 token下的所有nft
    nftsLocalArr.map( async (nftToken,_i)=>{

      const quoteUsdt = await getQuoteTokenUsdtPrice(nftToken.quoteToken)

      const calls = [
        {
          address: nftContract,
          name: 'getAsks',
          params: [nftToken.token,nftToken.quoteToken],
        },
      ]
      const [
        asksData,
      ] = await multicall(NFTsAbi, calls)

      const asks = asksData[0]
      const asksArr:NftConfig[] = await Promise.all(
        asks.map(async (item)=>{
          // const tokenCalls = [
          //   {
          //     address: nftToken.token,
          //     name: 'ownerOf',
          //     params: [new BigNumber(item.tokenId._hex).toNumber()],
          //   },
          // ]
          // const [
          //   nftOwner,
          // ] = await multicall(nftToken.abi, tokenCalls)
          // const nftData = await getNftDataById(nftToken.token,new BigNumber(item.tokenId._hex).toNumber())
          const nftPriceUsdt = new BigNumber(quoteUsdt).times(new BigNumber(item.price._hex).div(DEFAULT_TOKEN_DECIMAL))

          return {
            contract: nftToken.token,
            quoteToken: nftToken.quoteToken,
            quoteTokenSymbol: nftToken.quoteTokenSymbol,
            tokenId: new BigNumber(item.tokenId._hex).toNumber(),
            price: new BigNumber(item.price._hex).div(DEFAULT_TOKEN_DECIMAL).toNumber(),
            priceUsdt: nftPriceUsdt.toNumber(),
            // ownerAddress: nftOwner?nftOwner[0]:'',
            // // 柯基
            // name: nftData.name,
            contractName: nftToken.name,
            // type: 'img',
            // // img: '/nftassest/sample.png',
            // img: nftData.imgBase64,
            // creatorName: nftData.creatorName,
            // introduction: nftData.introduction,
            // brandDesc: nftData.brandDesc,
          }
        })
      )
      return asksArr
    })
  )
    const data = ndata.flat();
    const result = await marketList(nftContract, option.page, option.size, option.artworkType, option.name);
    const resultList: NftConfig[] = await Promise.all(
        result.map(async (list)=>{
            const index = data.findIndex(d => Number(d.tokenId) === Number(list.tokenid));
            return {
                contract: list.tokenAddress,
                quoteToken: data[index].quoteToken,
                quoteTokenSymbol: data[index].quoteTokenSymbol,
                tokenId: list.tokenid,
                price: data[index].price,
                priceUsdt: data[index].priceUsdt,
                ownerAddress: list.owner,
                name: list.name,
                contractName: data[index].contractName,
                type: list.artworkType,
                img: list.image ? list.image : 'https://ipfs.io/ipfs/bafkreib5blv6zcpdwmntvr553vicdwywy3csk6rxrlnwtnhdkffismr5mm',
                creatorName: list.creatorName,
                introduction: list.description,
                brandDesc: list.brandDesc,
            }
        })
    )
  return resultList
}

/** 获取用户在对应的购买币是否授权
 * */
export const fetchNftsUserAllowances = async (account: string) => {
  const exchangeNftAddress = getNFTSAddress()
  const bnbAddress ='0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
  const nftsFilter = nftsLocalArr.filter((f)=>f.quoteToken.toLowerCase() !== bnbAddress.toLowerCase())
  const nftsBnbs = nftsLocalArr.filter((f)=>f.quoteToken.toLowerCase() === bnbAddress.toLowerCase())

  const calls = nftsFilter.map((nft) => {
    return { address: nft.quoteToken, name: 'allowance', params: [account, exchangeNftAddress] }
  })

  const rawQuoteTokenAllowances = await multicall(erc20ABI, calls)

  const bnbAllowancces = nftsBnbs.map((nft)=>{
   return {
     nftToken: nft.token,
     quoteToken: nft.quoteToken,
     quoteTokenAllowance: new BigNumber(ethers.constants.MaxUint256._hex).toJSON()
   }
  })
  const parsedQuoteTokenAllowances = rawQuoteTokenAllowances.map((quoteTokenBalance,i) => {
    return {
      nftToken: nftsFilter[i].token,
      quoteToken: nftsFilter[i].quoteToken,
      quoteTokenAllowance: new BigNumber(quoteTokenBalance).toJSON(),
    }
  })
  return parsedQuoteTokenAllowances.concat(bnbAllowancces)
}


export const fetchAllNft = async (): Promise<NftConfig[]> => {
  const ndata: NftConfig[][] = await Promise.all(
    // 获取本地保存的 nft token 数组，循环查询 token下的所有nft
    nftsLocalArr.map(async (nftToken, _i) => {
      const nftContract = getNFTSAddress()
      const quoteUsdt = await getQuoteTokenUsdtPrice(nftToken.quoteToken)
      const calls = [
        {
          address: nftContract,
          name: 'getAsks',
          params: [nftToken.token, nftToken.quoteToken],
        },
      ]
      const [
        asksData,
      ] = await multicall(NFTsAbi, calls)

      const asks = asksData[0]
      const asksArr: NftConfig[] = await Promise.all(
        asks.map(async (item) => {
          // const tokenCalls = [
          //   {
          //     address: nftToken.token,
          //     name: 'ownerOf',
          //     params: [new BigNumber(item.tokenId._hex).toNumber()],
          //   },
          // ]
          // const [
          //   nftOwner,
          // ] = await multicall(nftToken.abi, tokenCalls)
          // const nftData = await getNftDataById(nftToken.token, new BigNumber(item.tokenId._hex).toNumber())
          const nftPriceUsdt = new BigNumber(quoteUsdt).times(new BigNumber(item.price._hex).div(DEFAULT_TOKEN_DECIMAL))

          return {
            contract: nftToken.token,
            quoteToken: nftToken.quoteToken,
            quoteTokenSymbol: nftToken.quoteTokenSymbol,
            tokenId: new BigNumber(item.tokenId._hex).toNumber(),
            price: new BigNumber(item.price._hex).div(DEFAULT_TOKEN_DECIMAL).toNumber(),
            priceUsdt: nftPriceUsdt.toNumber(),
            ownerAddress: '',
            // 柯基
            name: '',
            contractName: nftToken.name,
            type: 'img',
            // img: '/nftassest/sample.png',
            img: '',
            creatorName: '',
            introduction: '',
            brandDesc: '',
          }
        })
      )
      return asksArr
    })
  )
  return ndata.flat()

}

/** 获取用户 售卖的nft
 * */
export const fetchNftsUserSell = async (options: {account: string, name?: string, artworkType?: string}) => {
  const ndata:NftConfig[][] = await Promise.all(
    // 获取本地保存的 nft token 数组，循环查询 token下的所有nft
    nftsLocalOnlyToken.map( async (nftToken)=>{
      const nftContract = getNFTSAddress()
      const calls = [
        {
          address: nftContract,
          name: 'getUserAsksByNFT',
          params: [nftToken.token, options.account],
        },
      ]
      const [
        uAsksData,
      ] = await multicall(NFTsAbi, calls)
      // console.log('uAsksData', uAsksData)
      // 查询所有在售nft
      const allNft = await fetchAllNft()

      const asks = uAsksData.asks
      const asksArr:NftConfig[] = await Promise.all(
        asks.map(async (item)=>{
          const tid = new BigNumber(item.tokenId._hex).toNumber()
          const findNft = allNft.find((n)=>n.contract.toLowerCase()===nftToken.token.toLowerCase()&&n.tokenId===tid)
            // console.log(findNft)
          if(findNft){
            // 获取 baseurl nft介绍数据
            // const nftData = await getNftDataById(nftToken.token,findNft.tokenId)
                const nftData = await getNftById(nftToken.token,findNft.tokenId, options.name, options.artworkType)
                if (nftData && nftData.length > 0) {
                    return {
                        ...findNft,
                        ownerAddress: options.account,
                        name: nftData[0].name ? nftData[0].name : '',
                        type: nftData[0].artworkType ? nftData[0].artworkType : '',
                        img: nftData[0].image ? nftData[0].image : 'https://ipfs.io/ipfs/bafkreib5blv6zcpdwmntvr553vicdwywy3csk6rxrlnwtnhdkffismr5mm',
                        creatorName: nftData[0].creatorName ? nftData[0].creatorName : '',
                        introduction: nftData[0].description ? nftData[0].description : '',
                        brandDesc: nftData[0].brandDesc ? nftData[0].brandDesc : '',
                    }
                }
                return null
          }
          return []
        })
      )
        // 去除空对象
        const sellList = []
        asksArr.map(async (item)=>{
            if (item) {
                sellList.push(item)
            }
        })
      // 测试数据
      // return [allNft[0]]
      return sellList
    })
  )

  return ndata
}
/** 获取用户 售卖的nft
 * */
export const fetchNftsUserSellBak = async (account: string) => {
  const ndata:any[][] = await Promise.all(
    // 获取本地保存的 nft token 数组，循环查询 token下的所有nft
    nftsLocalOnlyToken.map( async (nftToken)=>{
      const nftContract = getNFTSAddress()
      const calls = [
        {
          address: nftContract,
          name: 'getUserAsksByNFT',
          params: [nftToken.token,account],
        },
      ]
      const [
        uAsksData,
      ] = await multicall(NFTsAbi, calls)

      const asks = uAsksData.asks
      const asksArr:any[] = await Promise.all(
        asks.map(async (item)=>{
          return {
            tokenId: new BigNumber(item.tokenId._hex).toNumber(),
            contract: nftToken.token,
          }
        })
      )
      return asksArr
    })
  )
  return ndata
}
export default fetchNfts

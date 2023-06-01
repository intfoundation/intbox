import {useState} from "react";
import BigNumber from 'bignumber.js'
import {NftConfig, NftUserAllowanceQuoteToken, NftUserApprove} from 'config/constants/types'

import { nftsLocalArr, nftsLocalOnlyToken } from '../../config/constants/nfts'
import { getNFTSAddress } from '../../utils/addressHelpers'
import multicall from '../../utils/multicall'
import NFTsAbi from '../../vipswap/lib/abi/GameSeaExchangeNFTs.json'
import { DEFAULT_TOKEN_DECIMAL } from '../../config'
import {getNftById, getNftDataById, getUserNft} from './helpers'

const defaultNftInfoData = {
  creatorName: 'INT Designer',
  introduction: 'Panda Freddy was born from a fun emoji contest in the INT community. A community member made a panda-related image that was loved by so many people that the image of a panda was identified as the INT mascot and named Panda Freddy . "Panda Freddy - hello world!" - this piece is the first in a series of works of the mascot, which was born and says hello to the world.',
  brandDesc: "The image of Freddy Panda was inspired by a panda emoji holding a computer and drinking in a meme contest organized by the INT German community. This image gained so much love from the community throughout the contest that we decided to make him the INT mascot and asked for proposals for a name - Freddy Panda.\nFreddy Panda represents the INT community's active participation in the community as well as their dedication to creativity and talent. Only 30 Freddy Panda items have been made as yet, and more are waiting to be inspired!",

}
// 测试数据
const testData = [{
  id: 1115,
  tokenAddress: "0xaaf244486784abbb646b4c9505fa46c0a6bbc265",
  tokenid: 1077,
  owner: "0x3f6F2e4EC10E02136976cF56BEac566e0fdc040D",
  timestamp: "1638520525",
  lastHash: "0x9252fafa2066db7823ea7140c18798201266ba199708e199df6ef764c6a13706",
  lastBlockNumber: "2448246"
}]
const fetchUserNfts = async (options:{accounts: string,page:number,size: number, name: string, artworkType: string}) => {
  // 查询链上 nfts 数据
  const data:NftConfig[][] = await Promise.all(
    // 获取本地保存的 nft token 数组，循环查询 token下的所有nft
    nftsLocalOnlyToken.map( async (nftToken)=>{
      const apiData = await getUserNft(nftToken.token,options.accounts,options.page,options.size, options.name, options.artworkType)
      const asksArr:NftConfig[] = await Promise.all(
        apiData.map(async (item)=>{
          const nftContract = getNFTSAddress()
          const ownerCall = [
            {
              address: nftToken.token,
              name: 'getApproved',
              params: [new BigNumber(item.tokenid).toNumber()],
            },
            {
              address: nftToken.token,
              name: 'isApprovedForAll',
              params: [item.owner,nftContract],
            },
          ]
          // 获取 baseurl nft介绍数据
          // const nftData = await getNftDataById(nftToken.token,new BigNumber(item.tokenid).toNumber())
          const nftData = await getNftById(nftToken.token,new BigNumber(item.tokenid).toNumber(), '', '')
          const [
            approveCall,
            approvedForAll
          ] = await multicall(nftToken.abi, ownerCall)
          const nftdata:NftConfig = {
              contractName: nftToken.name,
              contract: nftToken.token,
              quoteToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
              quoteTokenSymbol: 'INT',
              tokenId: new BigNumber(item.tokenid).toNumber(),
              price: 0,
              priceUsdt: 0,
              ownerAddress: options.accounts,
              // 柯基
              name: nftData[0].name ? nftData[0].name : '',
              type: nftData[0].artworkType ? nftData[0].artworkType : '',
              img: nftData[0].image ? nftData[0].image : 'https://ipfs.io/ipfs/bafkreib5blv6zcpdwmntvr553vicdwywy3csk6rxrlnwtnhdkffismr5mm',
              creatorName: nftData[0].creatorName ? nftData[0].creatorName : '',
              introduction: nftData[0].description ? nftData[0].description : '',
              brandDesc: nftData[0].brandDesc ? nftData[0].brandDesc : '',
              userData: {
                quoteTokenAllowance:'',
                sellApprove: approvedForAll[0]
              }
          }
          return nftdata
        })
      )

      // const calls = [
      //   {
      //     address: nftToken.token,
      //     name: 'totalSupply',
      //     params: [],
      //   },
      // ]
      // // 获取当前nft的数量
      // const [
      //   totalSupply,
      // ] = await multicall(nftToken.abi, calls)
      //
      // const asksArr:NftConfig[] = await Promise.all(
      //   [...Array(new BigNumber(totalSupply).toNumber())].map(async (item,index)=>{
      //     // 获取对应index的tokenid
      //     const tokenidCalls = [
      //       {
      //         address: nftToken.token,
      //         name: 'tokenByIndex',
      //         params: [index],
      //       },
      //     ]
      //     const [
      //       tokenid,
      //     ] = await multicall(nftToken.abi, tokenidCalls)
      //     const ownerCall = [
      //       {
      //         address: nftToken.token,
      //         name: 'ownerOf',
      //         params: [new BigNumber(tokenid).toNumber()],
      //       },
      //       {
      //         address: nftToken.token,
      //         name: 'getApproved',
      //         params: [new BigNumber(tokenid).toNumber()],
      //       },
      //     ]
      //     const [
      //       tokenOwner,
      //       approveCall
      //     ] = await multicall(nftToken.abi, ownerCall)
      //
      //     const nftdata:NftConfig = {
      //       contract: nftToken.token,
      //       quoteToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      //       tokenId: new BigNumber(tokenid).toNumber(),
      //       price: 0,
      //       priceUsdt: 0,
      //       protocol: 'ERC721',
      //       chainName: 'BSC',
      //       ownerAddress: tokenOwner[0],
      //       // 柯基
      //       name: nftToken.name,
      //       contractName: nftToken.name,
      //       type: 'img',
      //       img: '/nftassest/sample.png',
      //       userData: {
      //         quoteTokenAllowance:'',
      //         sellApprove: approveCall[0].toString().toLowerCase()!=='0x0000000000000000000000000000000000000000'
      //       }
      //     }
      //     return nftdata
      //   })
      // )
      return asksArr
    })
  )

  return data
}

export const fetchUserApproveNfts = async (account:string) => {
  // 查询链上 nfts 数据
  const data:NftUserApprove[] = await Promise.all(
    // 获取本地保存的 nft token 数组，循环查询 token下的所有nft
    nftsLocalOnlyToken.map( async (nToken)=>{
      const nftContract = getNFTSAddress()
      const ownerCall = [

        {
          address: nToken.token,
          name: 'isApprovedForAll',
          params: [account,nftContract],
        },
      ]
      const [
        approvedForAll
      ] = await multicall(nToken.abi, ownerCall)
      const asksArr:NftUserApprove =  {
        nftToken: nToken.token,
        sellApprove: approvedForAll[0]
      }

      return asksArr
    })
  )

  return data
}

export default fetchUserNfts

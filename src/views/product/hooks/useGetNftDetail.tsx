import {useEffect, useState} from "react";
import {NftConfig} from "../../../config/constants/types";
import multicall from "../../../utils/multicall";
import {nftsLocalArr, nftsLocalOnlyToken} from "../../../config/constants/nfts";
import {getNftDataById, getNftById} from "../../../state/nfts/helpers";
import {fetchAllNft} from "../../../state/nfts/fetchNfts";

export const useGetNftDetail = (
  token: string,
  tokenid: number
)=>{
  const [data, setData] = useState<NftConfig>()

  useEffect(() => {
    const fetchData = async () => {

      const curNftToken = nftsLocalOnlyToken.find((n)=>n.token.toLowerCase()===token.toLowerCase())
      const tokenCalls = [
        {
          address: token,
          name: 'ownerOf',
          params: [tokenid],
        },
      ]
      const [
        nftOwner,
      ] = await multicall(curNftToken.abi, tokenCalls)
      const nftData = await getNftDataById(token,tokenid)
      const nftD:NftConfig = {
        contract: token,
        quoteToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        quoteTokenSymbol: 'INT',
        tokenId: tokenid,
        price: 0,
        priceUsdt: 0,
        ownerAddress: nftOwner?nftOwner[0]:'',
        // 柯基
        name: nftData.name,
        contractName: curNftToken.name,
        type: 'img',
        // img: '/nftassest/sample.png',
        img: nftData.imgBase64,
        creatorName: nftData.creatorName,
        introduction: nftData.introduction,
        brandDesc: nftData.brandDesc,
      }
      setData(nftD)
    }

    fetchData()
  }, [setData,token,tokenid])

  return data
}
export const useGetNftDetailONline = (
  token: string,
  tokenid: number
)=>{
  const [data, setData] = useState<NftConfig>()
  useEffect(() => {
    const fetchData = async () => {
      const nftList = await fetchAllNft()
      const findNftToken = nftList.find((n)=>n.contract.toLowerCase()===token.toLowerCase()&& n.tokenId===tokenid)
      const curNftToken = nftsLocalOnlyToken.find((n)=>n.token.toLowerCase()===token.toLowerCase())
      const tokenCalls = [
        {
          address: token,
          name: 'ownerOf',
          params: [tokenid],
        },
      ]
      const [
        nftOwner,
      ] = await multicall(curNftToken.abi, tokenCalls)
      // const nftData = await getNftDataById(token,tokenid)
      const nftData = await getNftById(token, tokenid, '', '')

      const nftD:NftConfig = {
        contract: token,
        quoteToken: findNftToken?findNftToken.quoteToken:'0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        quoteTokenSymbol: findNftToken?findNftToken.quoteTokenSymbol:'INT',
        tokenId: tokenid,
        price: findNftToken ? findNftToken.price : 0,
        priceUsdt: findNftToken ? findNftToken.priceUsdt : 0,
        ownerAddress: nftOwner ? nftOwner[0] : '',
        // 柯基
        name: nftData[0].name ? nftData[0].name : '',
        contractName: curNftToken.name ? curNftToken.name : '',
        type: nftData[0].artworkType ? nftData[0].artworkType : '',
        img: nftData[0].image ? nftData[0].image : 'https://ipfs.io/ipfs/bafkreib5blv6zcpdwmntvr553vicdwywy3csk6rxrlnwtnhdkffismr5mm',
        creatorName: nftData[0].creatorName ? nftData[0].creatorName : '',
        introduction: nftData[0].description ? nftData[0].description : '',
        brandDesc: nftData[0].brandDesc ? nftData[0].brandDesc : '',
      }

      setData(nftD)
    }

    fetchData()
  }, [setData,token,tokenid])

  return data
}

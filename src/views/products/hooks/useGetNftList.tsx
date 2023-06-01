import {useCallback, useEffect, useState} from "react";
import fetchNfts from "./fetchNfts";
import {NftConfig} from "../../../config/constants/types";

/** 获取 nft trading
 */
const useGetNftList = (options:{page:number,size:number}) => {
  const [dataV, setData] = useState<NftConfig[]>([])
  const [isLoadV,setIsLoad] = useState(false)

  const handleFunction = useCallback(async () => {
    try {
      const resData = await fetchNfts(options)
      const resFlat = resData.flat()
      setData(resFlat)
      setIsLoad(true)
    }catch (e) {
      console.error(e)
      setIsLoad(true)
    }

  }, [ setData,options,setIsLoad])

  useEffect(() => {
    handleFunction()
  }, [ handleFunction,options])

  return {isLoad:isLoadV,data:dataV}
}
export default  useGetNftList

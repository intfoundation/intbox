import {useCallback, useEffect, useState} from "react";
import {useWeb3React} from "@web3-react/core";
import {useNftContract} from "../../../hooks/useContract";
import {getNFTfactoryAddress} from "../../../utils/addressHelpers";
import INTBoxNFTFactory from "../../../vipswap/lib/abi/nfts/INTBoxNFTFactory.json";

const useSupport = () => {
  const { account } = useWeb3React()
  const [support, setSupport] = useState('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE');
  const nftContract = useNftContract(INTBoxNFTFactory, getNFTfactoryAddress());
  // console.log(nftContract)
  const handleFunction = useCallback(async () => {
    try {
      const data = await nftContract.supportCommission()
      // console.log(data)
      setSupport(data.supportCommToken);
    }catch (e){
      console.log(e)
    }
  }, [nftContract, setSupport])

  useEffect(() => {
    // console.log(111)
    if (account) {
      handleFunction()
    }
  }, [account, handleFunction])

  return support
}
export default useSupport

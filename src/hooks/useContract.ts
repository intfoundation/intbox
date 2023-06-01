import { useMemo } from 'react'
import {
  getMasterchefContract,
  getInviteV1Contract,
  getNFTsContract,
  getBep20Contract,
  getErc721Contract, getNFTContract
} from 'utils/contractHelpers'
import useActiveWeb3React from "./useActiveWeb3React";

/**
 * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
 */
export const useMasterchef = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getMasterchefContract( library.getSigner()), [library])
}

export const useInviteV1 = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getInviteV1Contract( library.getSigner()), [library])
}

// 获取nft合约链接
export const useExchangeNFTs = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getNFTsContract( library.getSigner()), [library])
}

export const useERC20 = (address: string) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getBep20Contract(address, library.getSigner()), [address, library])
}
export const useERC721 = (address: string) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getErc721Contract(address, library.getSigner()), [address, library])
}

export const useNftContract = (api:any, address: string) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getNFTContract(api,address, library.getSigner()), [address, library,api])
}

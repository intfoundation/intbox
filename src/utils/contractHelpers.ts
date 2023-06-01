import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import web3NoAccount from 'utils/web3'
import {ethers} from "ethers";

// Addresses
import {
  getVipAddress,
  getMasterChefAddress, getInviteAddress, getMulticallAddress, getNFTSAddress, getNFTConfigurationAddress,
} from 'utils/addressHelpers'

// ABI
import bep20Abi from 'vipswap/lib/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'
import lpTokenAbi from 'vipswap/lib/abi/uni_v2_lp.json'
import vipAbi from 'vipswap/lib/abi/vipswap.json'
import masterChef from 'vipswap/lib/abi/vipswapPoolsV1.json'
import vipswapInviteV1Abi from 'vipswap/lib/abi/vipswapInviteV1.json'
import MultiCallAbi from 'config/abi/Multicall.json'
import NFTsAbi from 'vipswap/lib/abi/GameSeaExchangeNFTs.json'
import NFTConfigurationAbi from 'vipswap/lib/abi/GameSeaExchangeNFTConfiguration.json'

import {simpleRpcProvider} from "./providers";


const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}

export const getBep20Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bep20Abi, address, signer)
}
export const getErc721Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(erc721Abi, address, signer)
}
export const getLpContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(lpTokenAbi, address, signer)
}
export const getVipContract = ( signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(vipAbi, getVipAddress(), signer)
}
export const getMasterchefContract = ( signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(masterChef, getMasterChefAddress(), signer)
}

export const getInviteV1Contract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(vipswapInviteV1Abi, getInviteAddress(), signer)
}

export const getMulticallContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(MultiCallAbi, getMulticallAddress(), signer)
}


export const getNFTsContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(NFTsAbi, getNFTSAddress(), signer)
}
export const getNFTConfigurationContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(NFTConfigurationAbi, getNFTConfigurationAddress(), signer)
}

export const getNFTContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(abi, address, signer)
}


import addresses from 'config/constants/contracts'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address): string => {
  const mainNetChainId = 2047
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[mainNetChainId]
}

export const getVipAddress = () => {
  return getAddress(addresses.vipswap)
}
export const getMasterChefAddress = () => {
  return getAddress(addresses.masterChef)
}
export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall)
}
export const getWbnbAddress = () => {
  return getAddress(addresses.weth)
}
export const getInviteAddress = () => {
  return getAddress(addresses.vipswapInviteV1)
}

// 获取nft合约地址
export const getNFTSAddress = () => {
  return getAddress(addresses.nfts)
}

// 获取nft configuration 合约地址
export const getNFTConfigurationAddress = () => {
  return getAddress(addresses.nftConfiguration)
}

// 获取nft factory 合约地址
export const getNFTfactoryAddress = () => {
  return getAddress(addresses.factory)
}
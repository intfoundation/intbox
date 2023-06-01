import BigNumber from "bignumber.js";

export interface Address {
  97?: string
  56: string
}

export interface Token {
  symbol: string
  address?: Address
  decimals?: number
  projectLink?: string
}

// nft作品详细编号
export type NftConfig = {
  // nft 地址
  contract: string
  // nft 交易用的币种地址
  quoteToken: string
  quoteTokenSymbol: string
  // nft 编号
  tokenId: number
  price: number
  priceUsdt: number
  // nft 协议类型 erc721
  protocol?: string
  // 链名 bsc
  chainName?: string
  // 简介
  introduction?: string
  // 品牌介绍
  brandDesc?: string
  // 拥有者地址
  ownerAddress: string
  // 拥有者名
  ownerName?:string
  //创建者名
  creatorName?:string
  // 创建者地址
  creatorAddress?: string
  // nft 名称
  name: string
  // contract 名称 即分类名
  contractName: string
  img?: string
  type: 'img'|'video'|'music'
  // 官方认证
  isCertified?: boolean
  userData?:{
    // 是否授权
    quoteTokenAllowance: string
    sellApprove?: boolean
  }
}
// nft trading
export type NftTrading = {
  tokenId: number
  event: string
  price: number
  from: string
  to: string
  date: string
  tx: string
  quoteToken: string
}

// nft userAllowance =
export type NftUserAllowanceQuoteToken = {
  nftToken: string,
  quoteToken: string,
  quoteTokenAllowance: string
  sellApprove?: boolean
}
// nft userAllowance =
export type NftUserApprove = {
  nftToken: string,
  sellApprove: boolean
}
export type PageMeta = {
  title: string
  description?: string
  image?: string
}

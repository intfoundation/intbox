import IntBoxNFTAbi from 'vipswap/lib/abi/nfts/INTBoxNFT.json'
import tokens from './tokens'

const nfts = {
  id: 1,
}

export const DEFAULT_QUOTETOKEN = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

// nft tokens
const TokenPandaFreddyT = '0x34596f8c16dc1112a7746bf528c637e49cf1347c'
const TokenPandaFreddyM = '0xaaf244486784abbb646b4c9505fa46c0a6bbc265'

interface nftProps {
  token: string
  name: string
  quoteToken: string
  quoteTokenSymbol: string
  abi:any
}
interface nftOnlyProps {
  token: string
  name: string
  abi:any
}
// nft token 数组
const nftsTestNet:nftProps[] = [
  {
    token: TokenPandaFreddyT,
    name: 'Panda Freddy',
    quoteToken: DEFAULT_QUOTETOKEN,
    quoteTokenSymbol: 'INT',
    abi: IntBoxNFTAbi,
  },
  {
    token: TokenPandaFreddyT,
    name: 'Panda Freddy',
    quoteToken: tokens.usdt.address['2048'],
    quoteTokenSymbol: tokens.usdt.symbol,
    abi: IntBoxNFTAbi,
  },
]
const nftsMainNet:nftProps[] = [
  {
    token: TokenPandaFreddyM,
    name: 'Panda Freddy',
    quoteToken: DEFAULT_QUOTETOKEN,
    quoteTokenSymbol: 'INT',
    abi: IntBoxNFTAbi,
  },
  {
    token: TokenPandaFreddyM,
    name: 'Panda Freddy',
    quoteToken: tokens.usdt.address['2047'],
    quoteTokenSymbol: tokens.usdt.symbol,
    abi: IntBoxNFTAbi,
  },
]

export interface quoteTokenOptions {
  address: string,
  symbol: string,
  // 指定币对usdt的swap
  usdtSwap: string,
}
const quoteTokensTest:quoteTokenOptions[] = [
  {
    address: DEFAULT_QUOTETOKEN,
    symbol: tokens.int.symbol,
    usdtSwap: '',
  },
  {
    address: tokens.usdt.address['2048'],
    symbol: tokens.usdt.symbol,
    usdtSwap: '',
  },
]
const quoteTokensMain:quoteTokenOptions[] = [
  {
    address: DEFAULT_QUOTETOKEN,
    symbol: tokens.int.symbol,
    usdtSwap: '',
  },
  {
    address: tokens.usdt.address['2047'],
    symbol: tokens.usdt.symbol,
    usdtSwap: '',
  },
]

const nftTokenOnlyTest:nftOnlyProps[] = [
  {
    token: TokenPandaFreddyT,
    name: 'cat',
    abi: IntBoxNFTAbi,
  },
]
const nftTokenOnlyMain:nftOnlyProps[] = [
  {
    token: TokenPandaFreddyM,
    name: 'cat',
    abi: IntBoxNFTAbi,
  },
]
// export const quoteTokensArr = quoteTokensTest
export const quoteTokensArr = quoteTokensMain
// export const nftsLocalArr = nftsTestNet
export const nftsLocalArr = nftsMainNet
// nftsLocalOnlyToken 用于读取用户的nft列表
// export const nftsLocalOnlyToken = nftTokenOnlyTest
export const nftsLocalOnlyToken = nftTokenOnlyMain
export default nfts

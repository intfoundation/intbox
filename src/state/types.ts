import BigNumber from 'bignumber.js'
import {NftConfig, NftUserAllowanceQuoteToken, NftUserApprove} from 'config/constants/types'

// Block
export interface BlockState {
  currentBlock: number
  initialBlock: number
}

// nfts
export interface NftsState {
  data: NftConfig[]
  dataLoaded: boolean
  userData: NftConfig[]
  userSell: NftConfig[]
  userDataLoaded: boolean
  userAllowance: NftUserAllowanceQuoteToken[]
  userNftApprove: NftUserApprove[]
}

// Global state

export interface State {
  block: BlockState
  nfts: NftsState
}

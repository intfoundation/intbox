/* eslint-disable no-param-reassign */
import { createAsyncThunk,createSlice } from '@reduxjs/toolkit'
import { useWeb3React } from "@web3-react/core";
// import isArchivedPid from 'utils/farmHelpers'
import { NftsState } from '../types'
import {NftConfig, NftUserApprove} from '../../config/constants/types'
import fetchNfts, { fetchNftsUserAllowances, fetchNftsUserSell } from './fetchNfts'
import fetchUserNfts, {fetchUserApproveNfts} from './fetchUserNfts'

const initialState: NftsState = { data: [],dataLoaded: false, userData: [],userSell: [], userDataLoaded: false,userAllowance:[],userNftApprove:[] }

// Async thunks
export const fetchNftsPublicDataAsync = createAsyncThunk<NftConfig[],{page:number,size:number, artworkType: string, name: string}>(
  'nfts/fetchNftsPublicDataAsync',
  async (option:{page, size, artworkType, name}) => {
    try {
      const nfts = await fetchNfts(option)
      // 将数组降维
      return nfts.flat()
    }catch (e) {
      return []
    }
  },
)
export const fetchUserNftsDataAsync = createAsyncThunk<NftConfig[],{accounts: string,page:number,size: number, name: string, artworkType: string}>(
  'nfts/fetchUserNftsDataAsync',
  async (options:{accounts: string, page:number, size: number, name: string, artworkType: string}) => {
    try {
      const nfts = await fetchUserNfts(options)
      const nfts2 = nfts.flat()
      const accountNft = nfts2.filter((n)=>n.ownerAddress.toLowerCase()===options.accounts.toLowerCase())
      return accountNft
    }catch (e) {
      return []
    }
  },
)

export const fetchNftsUserAllowanceAsync = createAsyncThunk<any[],string>(
  'nfts/fetchNftsUserAllowanceAsync',
  async (account:string) => {
    const allowances = await fetchNftsUserAllowances(account)
    return allowances
  },
)

export const fetchNftsUserSellDataAsync = createAsyncThunk<NftConfig[], {account: string, name?: string, artworkType?: string}>(
  'nfts/fetchNftsUserSellDataAsync',
  async (options: {account:string, name?: string, artworkType?: string}) => {
    const tokenids = await fetchNftsUserSell(options)
    // 将数组降维
    return tokenids.flat()
  },
)
export const fetchNftsUserApproveAsync = createAsyncThunk<NftUserApprove[],string>(
  'nfts/fetchNftsUserApproveAsync',
  async (account:string) => {
    const data = await fetchUserApproveNfts(account)
    return data
  },
)
export const fetchSetNftLoadFalse = createAsyncThunk<boolean>(
  'nfts/fetchSetNftLoadFalse',
  async () => {
    return false
  },
)
export const fetchSetUserNftLoadFalse = createAsyncThunk<boolean>(
  'nfts/fetchSetUserNftLoadFalse',
  async () => {
    return false
  },
)
export const nftsSlice = createSlice({
  name: 'Nfts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Update nfts with live data
    builder.addCase(fetchNftsPublicDataAsync.fulfilled, (state, action) => {
      // if(state.data.length > 0){
      //   state.data = state.data.map((nft) => {
      //     const liveNftData = action.payload.find((f) => f.contract === nft.contract && f.tokenId === nft.tokenId )
      //     return { ...nft, ...liveNftData }
      //   })
      // }else {
      //   state.data = action.payload
      // }
      state.data = action.payload
      state.dataLoaded = true
    })
    // Update nfts with user allowance 更新用户对nft的指定购买币授权状态
    builder.addCase(fetchNftsUserAllowanceAsync.fulfilled, (state, action) => {
      const allowanceArr = action.payload
      // if(state.data.length > 0){
      //   state.data = state.data.map((nft,i) => {
      //     const curAllowance = allowanceArr.find((f) => f.nftToken.toLowerCase() === nft.contract.toLowerCase() && f.quoteToken.toLowerCase() === nft.quoteToken.toLowerCase() )
      //     return { ...nft, userData: {
      //         quoteTokenAllowance: curAllowance.allowance
      //       }}
      //   })
      // }
      state.userAllowance = allowanceArr
    })
    // Update nfts with user data
    builder.addCase(fetchUserNftsDataAsync.fulfilled, (state, action) => {
      state.userData = []
      action.payload.forEach((userDataEl) => {
        state.userData.push(userDataEl)
      })
      state.userDataLoaded = true
    })

    builder.addCase(fetchNftsUserSellDataAsync.fulfilled, (state, action) => {
      state.userSell = action.payload
      // state.userSell = []
      // action.payload.forEach((asks) => {
      //   const { contract,tokenId } = asks
      //   const findData = state.data.find((nft) => nft.contract === contract&& nft.tokenId === tokenId)
      //   if (findData){
      //     state.userSell.push(findData)
      //   }
      // })
    })
    builder.addCase(fetchNftsUserApproveAsync.fulfilled, (state, action) => {
      state.userNftApprove = action.payload
    })
    builder.addCase(fetchSetNftLoadFalse.fulfilled, (state, action) => {
      state.dataLoaded = action.payload
    })
    builder.addCase(fetchSetUserNftLoadFalse.fulfilled, (state, action) => {
      state.userDataLoaded = action.payload
    })
  },
})

export default nftsSlice.reducer

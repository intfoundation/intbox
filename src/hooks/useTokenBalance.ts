import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { getBep20Contract } from 'utils/contractHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { simpleRpcProvider } from 'utils/providers'

import useRefresh from './useRefresh'
import useLastUpdated from './useLastUpdated'
import { DEFAULT_TOKEN_DECIMAL } from '../config'

type UseTokenBalanceState = {
  balance: BigNumber
  fetchStatus: FetchStatus
}
type UseTokenSymbolState = {
  symbol: string
  fetchStatus: FetchStatus
}

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  SUCCESS = 'success',
  FAILED = 'failed',
}

const useTokenBalance = (tokenAddress: string) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus
  const [balanceState, setBalanceState] = useState<UseTokenBalanceState>({
    balance: BIG_ZERO,
    fetchStatus: NOT_FETCHED,
  })
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress)
      try {
        // const res = await contract.methods.balanceOf(account).call()
        const res = await contract.balanceOf(account)
        setBalanceState({ balance: new BigNumber(res.toString()).div(DEFAULT_TOKEN_DECIMAL), fetchStatus: SUCCESS })
      } catch (e) {
        console.error(e)
        setBalanceState((prev) => ({
          ...prev,
          fetchStatus: FAILED,
        }))
      }
    }

    if (account && tokenAddress && tokenAddress!=='') {
      fetchBalance()
    }
  }, [account, tokenAddress, fastRefresh, SUCCESS, FAILED])

  return balanceState
}

export const useTokenSymbol = (tokenAddress: string) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus
  const [symbolState, setSymbolState] = useState<UseTokenSymbolState>({
    symbol: 'INT',
    fetchStatus: NOT_FETCHED,
  })
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchSymbol = async () => {
      if(tokenAddress.toLowerCase() === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'.toLowerCase()){
        setSymbolState({ symbol: 'INT', fetchStatus: SUCCESS })
        return
      }
      const contract = getBep20Contract(tokenAddress)
      try {
        // const res = await contract.methods.symbol().call()
        const res = await contract.symbol()
        setSymbolState({ symbol: res.toString(), fetchStatus: SUCCESS })
      } catch (e) {
        console.error(e)
        setSymbolState((prev) => ({
          ...prev,
          fetchStatus: FAILED,
        }))
      }
    }

    if (account) {
      fetchSymbol()
    }
  }, [account, tokenAddress, fastRefresh, SUCCESS, FAILED])

  return symbolState
}

export const useBurnedBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(BIG_ZERO)
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress)
      // const res = await contract.methods.balanceOf('0x000000000000000000000000000000000000dEaD').call()
      const res = await contract.balanceOf('0x000000000000000000000000000000000000dEaD')
      setBalance(new BigNumber(res.toString()))
    }

    fetchBalance()
  }, [tokenAddress, slowRefresh])

  return balance
}

export const useGetBnbBalance = () => {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED)
  const [balance, setBalance] = useState(BIG_ZERO)
  const { account } = useWeb3React()
  const { lastUpdated, setLastUpdated } = useLastUpdated()

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const walletBalance = await simpleRpcProvider.getBalance(account)
        setBalance(new BigNumber(walletBalance.toString()).div(DEFAULT_TOKEN_DECIMAL))
        setFetchStatus(FetchStatus.SUCCESS)
      } catch {
        setFetchStatus(FetchStatus.FAILED)
      }
    }

    if (account) {
      fetchBalance()
    }
  }, [account, lastUpdated, setBalance, setFetchStatus])

  return { balance, fetchStatus, refresh: setLastUpdated }
}

export const useGetBnbSymbol = () => {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED)
  const [balance, setBalance] = useState(BIG_ZERO)
  const { account } = useWeb3React()
  const { lastUpdated, setLastUpdated } = useLastUpdated()

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const walletBalance = await simpleRpcProvider.getBalance(account)
        setBalance(new BigNumber(walletBalance.toString()).div(DEFAULT_TOKEN_DECIMAL))
        setFetchStatus(FetchStatus.SUCCESS)
      } catch {
        setFetchStatus(FetchStatus.FAILED)
      }
    }

    if (account) {
      fetchBalance()
    }
  }, [account, lastUpdated, setBalance, setFetchStatus])

  return { balance, fetchStatus, refresh: setLastUpdated }
}


export default useTokenBalance

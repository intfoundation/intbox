import { useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { orderBy } from 'lodash'
import { getWeb3NoAccount } from 'utils/web3'
import { getAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import useRefresh from 'hooks/useRefresh'

import {NftsState, State} from './types'
import {fetchNftsPublicDataAsync} from "./nfts";

// Nfts
export const useNfts = (): NftsState => {
  const nfts = useSelector((state: State) => state.nfts)
  return nfts
}

// Block
export const useBlock = () => {
  return useSelector((state: State) => state.block)
}

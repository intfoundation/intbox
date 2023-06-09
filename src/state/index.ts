import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import blockReducer from './block'
import nftsReducer from './nfts'

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    block: blockReducer,
    nfts: nftsReducer,
  },
})

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch
// export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppDispatch = () => useDispatch()

export default store

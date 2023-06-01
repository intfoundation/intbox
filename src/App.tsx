import React, { lazy } from 'react'
import { Router, Redirect, Route, Switch, withRouter, BrowserRouter } from 'react-router-dom'
import { ResetCSS } from '@vipswap/uikit'
import 'antd/dist/antd.css';
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import ToastListener from './components/ToastListener'
import PageLoader from './components/PageLoader'
import EasterEgg from './components/EasterEgg'
import history from './routerHistory'
import Products from "./views/products";
import Product from "./views/product";
import {usePollNftsData} from "./state/nfts/hooks";
import UserSpace from "./views/User";
import NftDetailCollect from "./views/product/NftDetailCollect";
import NftDetailOnSale from "./views/product/NftDetailOnSale";
import ScrollToTop from "./ScrollToTop";
import NftCreate from "./views/nftCreate";
import Test from "./views/User/Test";

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Home = lazy(() => import('./views/Home'))
const NotFound = lazy(() => import('./views/NotFound'))

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  useEagerConnect()
  // usePollNftsData()

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <ScrollToTop/>
      {/* <Menu> */}
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/nfts" exact>
              <Products />
            </Route>
            <Route path="/nft/market/:contract/:tokenid" exact>
              <Product />
            </Route>
            <Route path="/nft/collect/:contract/:tokenid" exact>
              <NftDetailCollect />
            </Route>
            <Route path="/nft/onsale/:contract/:tokenid" exact>
              <NftDetailOnSale />
            </Route>
            <Route path="/user/:address" exact>
              <UserSpace />
            </Route>
            <Route path="/nft/nftCreate" exact>
              <NftCreate />
            </Route>
            <Route path="/nft/test" exact>
              <Test />
            </Route>
            {/* Redirect */}

            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      {/* </Menu> */}
      <EasterEgg iterations={2} />
      <ToastListener />
    </Router>
  )
}

export default React.memo(App)
// export default withRouter(App)

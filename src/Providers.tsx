import React from 'react'
import { ModalProvider } from '@vipswap/uikit'
import { Web3ReactProvider } from '@web3-react/core'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { getLibrary } from 'utils/web3React'
import { ThemeContextProvider } from 'contexts/ThemeContext'
import { LanguageProvider } from 'contexts/Localization'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import { ToastsProvider } from 'contexts/ToastsContext'
import store from 'state'
import {SnackbarProvider} from "notistack";

const Providers: React.FC = ({ children }) => {
  return (
    <SnackbarProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Provider store={store}>
          <ToastsProvider>
            <HelmetProvider>
              <ThemeContextProvider>
                <LanguageProvider>
                  <RefreshContextProvider>
                    <ModalProvider>{children}</ModalProvider>
                  </RefreshContextProvider>
                </LanguageProvider>
              </ThemeContextProvider>
            </HelmetProvider>
          </ToastsProvider>
        </Provider>
      </Web3ReactProvider>
    </SnackbarProvider>
  )
}

export default Providers

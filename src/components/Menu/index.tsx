import React from 'react'
import { NftMenu as UikitMenu, ConnectorNames } from '@vipswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import useAuth from 'hooks/useAuth'
import { links, socials, walletSet, webAsset } from './config'

const Menu: React.FC = (props) => {
  const { t } = useTranslation()
  const { account, chainId } = useWeb3React()
  const { login, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const { currentLanguage, setLanguage } = useTranslation()

  return (
    <UikitMenu
      account={account}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      tokenPriceUsd={0}
      links={links(t)}
      socials={socials}
      webAsset={webAsset}
      walletSet={walletSet}
      {...props}
      key={currentLanguage.code}
      contactList={[]}
      contactFlex="row"
    />
  )
}

export default Menu

import { MenuEntry, Socials } from '@vipswap/uikit'
import { ContextApi } from 'contexts/Localization/types'
import webIcon from 'asset/images/logo-v3-2.png'

export const links: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    icon: 'HomeIcon',
    href: '/',
    iconLink: '',
    iconSize: 24,
    labelStringId: 'Home',
  },
  {
    label: t('Market'),
    icon: 'HomeIcon',
    href: '/nfts',
    iconLink: '',
    iconSize: 24,
    labelStringId: 'nfts',
  },
  {
    label: t('My'),
    icon: 'HomeIcon',
    href: '/user/my',
    iconLink: '',
    iconSize: 24,
    labelStringId: 'nfts',
  },
]

export const socials: Socials[] = []

export const webAsset = {
  Images: {
    webIconLight: webIcon,
    webIconDark: webIcon
  },
  webIcon: {
    width: 24,
    height: 24,
    light: webIcon,
    dark: webIcon
  },
  tokenAsset: {
    tokenIcon: webIcon,
    priceLink: 'https://pancakeswap.info/token/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'
  }
}

const walletSetMain = {
  scanLabel: 'View On IntChain',
  scanLink: 'https://titansexplorer.intchain.io/address/',
  helpLink: 'https://ethereum.org/wallets/'
}
const walletSetTest = {
  scanLabel: 'View On IntChain TestNet',
  scanLink: 'https://test.titansexplorer.intchain.io/address/',
  helpLink: 'https://ethereum.org/wallets/'
}
export const walletSet = walletSetMain

/**
*
 xs: 370,
 sm: 576,
 md: 852,
 lg: 968,
 xl: 1080,
* */

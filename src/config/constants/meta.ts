import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'intbox',
  description:
    'intbox.',
  image: 'https://intbox.org/logo-v3-1.png',
}

export const customMeta: { [key: string]: PageMeta } = {
  '/': {
    title: 'Home | intbox',
  },
  '/invite': {
    title: 'Invite | intbox',
  },
}

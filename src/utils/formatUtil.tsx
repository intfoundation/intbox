// 获取短地址
export const getShortAddress = (address: string) => {
  return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`
}

// 获取区块链地址
export const getExplorerUrl = (chainId: number) => {
  // const urls = {
  //   56: 'https://bscscan.com',
  //   97: 'https://testnet.bscscan.com',
  //   2048: 'https://test.titansexplorer.intchain.io',
  //   2047: 'https://titansexplorer.intchain.io'
  // }
  switch (chainId) {
    case 56: return 'https://bscscan.com';
    case 97: return 'https://testnet.bscscan.com';
    case 2048:  return 'https://test.titansexplorer.intchain.io';
    case 2047:  return 'https://titansexplorer.intchain.io';
    default:  return 'https://titansexplorer.intchain.io';
  }
  // return urls[chainId]
}
export default null

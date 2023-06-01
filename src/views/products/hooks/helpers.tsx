import tokens from "../../../config/constants/tokens";

/**
 *  获取nft的交易记录
 * */
// const API_URL = 'http://192.168.0.99:8882/api'
const API_URL = 'https://api.intbox.org'
export const getNftTxList = async (
  nftTokenV: string,
  tokenIdV: number
): Promise<any[]> => {
  const url = `${API_URL}/intbox/listOrder`
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nftToken: nftTokenV,
      tokenId: tokenIdV,
    }),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const data = await response.json()
  return data
}

export const marketList = async (
    nftContract: string,
    pageV: number,
    size: number,
    artworkType: string,
    name: string
): Promise<any[]> => {
  const url = `${API_URL}/intbox/marketList`
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      owner: nftContract,
      page: pageV,
      pageSize: size,
      artworkType,
      name
    }),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const data = await response.json()
  return data
}

export const marketCount = async (
    nftContract: string,
    artworkType: string,
    name: string
): Promise<any[]> => {
  const url = `${API_URL}/intbox/marketCount`
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      owner: nftContract,
      artworkType,
      name
    }),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const data = await response.json()
  return data
}

// 获取用户拥有的nft （未出售的） https://api.intbox.org/intbox/listErc721
export const getUserNft = async (
  nftTokenV: string,
  account: string,
  pageV: number,
  size: number,
  name: string,
  artworkType: string
): Promise<any[]> => {
  const url = `${API_URL}/intbox/listErc721`
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nftToken: nftTokenV,
      owner: account,
      page:pageV,
      pageSize: size,
      name,
      artworkType
    }),
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const data = await response.json()
  return data
}

// 同步旧版本NFT的JSON数据
export const syncErc721Json = async (): Promise<any[]> => {
  const url = `${API_URL}/intbox/syncErc721Json`
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const data = await response.json()
  return data
}

// https://api.intbox.org/nft/{token}/{tokenid}.json
export const getNftDataById = async (
  token: string,
  tokenid: number,
):Promise<any> => {
  // testnft 为测试数据 `${API_URL}/testnft/${token}/${tokenid}.json`
  // nft为正式网数据  `${API_URL}/nft/${token}/${tokenid}.json`
  const url = `${API_URL}/nft/${token}/${tokenid}.json`
  const response = await fetch(url,{
    mode: 'cors',
    // credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
  if (!response.ok) {
    // throw new Error(response.statusText)
    console.error(response)
    return {
      name: `#${tokenid}`,
      creatorName: "INT Designer",
      introduction: `${token} - #${tokenid}`,
      brandDesc: "The image of Freddy Panda was inspired by a panda emoji holding a computer and drinking in a meme contest organized by the INT German community. This image gained so much love from the community throughout the contest that we decided to make him the INT mascot and asked for proposals for a name - Freddy Panda.\nFreddy Panda represents the INT community's active participation in the community as well as their dedication to creativity and talent. Only 30 Freddy Panda items have been made as yet, and more are waiting to be inspired!",
      imgBase64: "/images/example2.png"
    }
  }

  // try{
  //   const data = await response.json()
  //   return data
  // }catch (e) {
  //   console.error(e)
  // }
  const data2 = await response.json()
  return data2
}

export const getIntPriceData = async () => {
  const url = `${API_URL}/intprice`
  const response = await fetch(url,{
    // mode: 'cors',
    // credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
  if (!response.ok) {
    // throw new Error(response.statusText)
    console.error(response)
    return '0'
  }
  const data = await response.json()
  return data
}

export const getQuoteTokenUsdtPrice = async (
  quoteToken: string
)=>{
  switch (quoteToken.toLowerCase()) {
    case '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'.toLowerCase():
      return getIntPriceData();
    case tokens.usdt.address['2047'].toLowerCase():
      return 1;
    case tokens.usdt.address['2048'].toLowerCase():
      return 1;
    default: return 0;
  }
}

// 获取用户nft数量
export const getUserNftTotalNum = async (
  nftTokenV: string,
  account: string,
  name: string,
  artworkType: string
) =>{
  const url = `${API_URL}/intbox/listErc721Count`
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nftToken: nftTokenV,
      owner: account,
      name,
      artworkType
    }),
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const data = await response.json()
  return data
}

export default null

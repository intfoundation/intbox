import BigNumber from 'bignumber.js'
import {DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL} from 'config'
import { ethers } from 'ethers'
import { BIG_TEN, BIG_ZERO } from './bigNumber'
import getGasPrice from "./getGasPrice";
import {useERC20, useNftContract} from "../hooks/useContract";
import INTBoxNFTFactory from "../vipswap/lib/abi/nfts/INTBoxNFTFactory.json";

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const approve = async (lpContract, masterChefContract, account) => {

  const tx = await lpContract.approve(
    masterChefContract.address,
    ethers.constants.MaxUint256
  )
  const receipt = await tx.wait()
  return receipt.status
  // return receipt.status
  //   return lpContract.methods
  //       .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
  //       .send({ from: account })
}

// ---nft---- start
export const buyTokenNFT = async (exchangeNftContract,nftToken,tokenId,quoteToken,price, account)=>{
  if(quoteToken.toLowerCase() === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'.toLowerCase()){
        const priceEth = new BigNumber(price).times(DEFAULT_TOKEN_DECIMAL).toString()
        const tx = await exchangeNftContract.buyToken(
          nftToken,
          tokenId,
          quoteToken,
          new BigNumber(price).times(DEFAULT_TOKEN_DECIMAL).toString(),
          { from: account,value: priceEth}
        )
        const receipt = await tx.wait()
        return receipt.status
    }
  const tx = await exchangeNftContract.buyToken(
    nftToken,
    tokenId,
    quoteToken,
    new BigNumber(price).times(DEFAULT_TOKEN_DECIMAL).toString()
  )
  const receipt = await tx.wait()
  return receipt.status
}
export const approveNftToAddress = async (nftContract, exchangeNftAddress, tokenid,account)=>{
  const tx = await nftContract.approve(exchangeNftAddress, tokenid)
  const receipt = await tx.wait()
  return receipt.status
}
export const approveNftAll = async (nftContract, exchangeNftAddress, tokenid,account)=>{
  const tx = await nftContract.setApprovalForAll(exchangeNftAddress, true)
  const receipt = await tx.wait()
  return receipt.status
}
export const sellTokenNFT = async (exchangeNftContract,nftToken,tokenId,quoteToken,price, account)=>{
  const tx = await exchangeNftContract.readyToSellToken(
    nftToken,
    tokenId,
    quoteToken,
    new BigNumber(price).times(DEFAULT_TOKEN_DECIMAL).toString(),
  )
  // console.log('price', new BigNumber(price).times(DEFAULT_TOKEN_DECIMAL).toString())
  // const tx = await exchangeNftContract.batchReadyToSellToken(
  //   [nftToken],
  //   [tokenId],
  //   [quoteToken],
  //   [new BigNumber(price).times(DEFAULT_TOKEN_DECIMAL).toString()],
  //   [0]
  // )
  const receipt = await tx.wait()
  return receipt.status
}

export const cancelSellTokenNFT = async (exchangeNftContract,nftToken,tokenId, account)=>{
  const tx = await exchangeNftContract.cancelSellToken(
    nftToken,
    tokenId,
  )
  const receipt = await tx.wait()
  return receipt.status
}

export const batchSellTokenNFT = async (exchangeNftContract, nftTokens, tokenIds, quoteTokens, prices, selleStatus, account) => {
  const price = [];
  prices.map((item)=>{
    price.push(new BigNumber(item).times(DEFAULT_TOKEN_DECIMAL).toString());
    return null;
  })
  // console.log(price);
  // console.log(nftTokens);
  // console.log(tokenIds);
  // console.log(quoteTokens);
  // console.log(selleStatus);
  const tx = await exchangeNftContract.batchReadyToSellToken(
      nftTokens,
      tokenIds,
      quoteTokens,
      price,
      selleStatus,
  )
  const receipt = await tx.wait()
  // console.log(receipt)
  return receipt.status
}

export const createTokenNFT = async (useNFTContract, to, uri, useERC20Contract)=>{
  // console.log(2)
  // console.log(to)
  // console.log(uri)
  let receipt;
  // 调用supportCommission
  const support = await useNFTContract.supportCommission();
  // console.log(support);
  // console.log(support.isSupported);
  // 获取isSupported判断是否为true
  if (support.isSupported === true) {
    //  如果是true判断supportCommToken是否为0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE
    if (support.supportCommToken === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') {
      //  如果是nftSafeMint多传个参数value=poolCommAmount
      // console.log(support.poolCommAmount);
      const value = support.poolCommAmount
      const tx = await useNFTContract.nftSafeMint(
          to,
          uri,
          {value}
      )
      // console.log(tx);
      receipt = await tx.wait();
      // console.log(receipt);
    } else {
      // console.log(useERC20Contract);
      // 获取已授权数量
      const allowanceValue = await useERC20Contract.allowance(to , '0xa8c057d73be509c3d2d0230f12488dc4fa334528');
      // console.log(allowanceValue);
      // 判断数量是否充足
      if (allowanceValue < support.poolCommAmount) {
        // 如果不足则授权
        const supportResult = await useERC20Contract.approve('0xa8c057d73be509c3d2d0230f12488dc4fa334528', '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF');
        // console.log(supportResult);
      }
      const tx = await useNFTContract.nftSafeMint(
          to,
          uri,
      )
      // console.log(tx);
      receipt = await tx.wait();
      // console.log(receipt);
    }
  } else {
    // 如果isSupported为false
    const tx = await useNFTContract.nftSafeMint(
        to,
        uri,
    )
    console.log(tx);
    receipt = await tx.wait();
    console.log(receipt);

  }
  return receipt
}

export const setTokenURI = async (useNFTContract, id, uri)=>{
  const tx = await useNFTContract.setTokenURI(
      id,
      uri
  )
  console.log(tx)
  const receipt = await tx.wait()
  console.log(receipt)
  return receipt.status
}

export const queryTokenURI = async (useNFTContract, id)=>{
  const tx = await useNFTContract.tokenURI(
      id
  )
  return tx
}

export const setBaseURI = async (useNFTContract, uri)=>{
  const tx = await useNFTContract.setBaseURI(
      uri
  )
  console.log(tx)
  const receipt = await tx.wait()
  console.log(receipt)
  return receipt.status
}



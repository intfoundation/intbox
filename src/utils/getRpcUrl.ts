import random from 'lodash/random'

// Array of available nodes to connect to
export const nodes = [process.env.REACT_APP_NODE_1, process.env.REACT_APP_NODE_2, process.env.REACT_APP_NODE_3]

const getNodeUrl = () => {
  const randomIndex = random(0, nodes.length - 1)
  return nodes[randomIndex]
}

export const rpcurls = {
  56: process.env.REACT_APP_NODE_1,
  97: process.env.REACT_APP_NODE_1,
  65: process.env.REACT_APP_OKTEX_RPC,
  2048: process.env.REACT_APP_INT_RPC,
}

export const getRpcUrlByChainId = (chainId: number)=>{
  return rpcurls[chainId]
}
export default getNodeUrl

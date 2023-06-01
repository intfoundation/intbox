import { ethers } from 'ethers'
import getNodeUrl ,{getRpcUrlByChainId} from 'utils/getRpcUrl'

const RPC_URL = getNodeUrl()

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL)
export const getSimpleRpcProviderByChainId = (chainId:number)=>{
    const curRpcUrl = getRpcUrlByChainId(chainId)
    const curSimpleRpcProvider = new ethers.providers.JsonRpcProvider(curRpcUrl)
    return curSimpleRpcProvider
}

export default null

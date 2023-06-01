import BigNumber from "bignumber.js";

/**
 * 获取1级和2级好友数量
 * @param vipswapInviteContract
 * @param account
 * @returns [lowers1Len, lowers2Len]
 */
export const inviteLower2Count = async (vipswapInviteContract,account)=>{
    // const res = await vipswapInviteContract.methods.inviteLower2Count(account).call();
    const resData = await vipswapInviteContract.inviteLower2Count(account);
    const res = resData.map(item=>{
        return new BigNumber(item._hex).toNumber()
    })
    return res;
}

/**
 * 我的邀请（下一级好友）
 * @param vipswapInviteContract
 * @param account
 * @returns {Promise<*>}
 */
export const inviteLower1 = async (vipswapInviteContract, account)=>{
    // const res =  await vipswapInviteContract.methods.inviteLower1(account).call();
    const res =  await vipswapInviteContract.inviteLower1(account);
    console.log('inviteLower1 res', res)
    return res;
}
/**
 * 接受好友邀请
 * @param vipswapInviteContract
 * @param inviter
 * @param account
 * @returns {Promise<*>}
 */
export const acceptInvitation = async (vipswapInviteContract,inviter,account)=>{
    const tx2 = await vipswapInviteContract.acceptInvitation(inviter)
    const receipt = await tx2.wait()
    console.log('receipt', receipt)
    return  vipswapInviteContract
        .acceptInvitation(inviter)
        .send({ from: account })
        .on('transactionHash', (tx) => {
            // console.log(tx)
            return tx.transactionHash
        })
}

/**
 * 激活矿工
 * @param vipswapInviteContract
 * @param invitees Array(数组)
 * @returns {Promise<*>}
 */
export const inviteBatch = async (vipswapInviteContract,invitees,account)=>{
    const tx2 = await vipswapInviteContract.inviteBatch(invitees)
    const receipt = await tx2.wait()
    console.log('receipt', receipt)
    return  vipswapInviteContract.methods
        .inviteBatch(invitees)
        .send({ from: account })
        .on('transactionHash', (tx) => {
            // console.log(tx)
            return tx.transactionHash
        })
}
/**
 * 判断用户是否已经被邀请
 * @param vipswapInviteContract
 * @param account
 * @returns {Promise<boolean>}
 */
export const judgeUseIsInvited = async (vipswapInviteContract,account)=>{
    const inviterUser = await vipswapInviteContract.inviteUserInfoV2(account);
    if(inviterUser.startBlock === 0){
        // 当前用户没有被邀请
        return false;
    }
    return true;
}
export default null

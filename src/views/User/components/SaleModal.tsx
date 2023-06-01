import React, {useCallback, useEffect, useState} from 'react';
import {Button, message} from 'antd';
import { Modal, useWalletModal } from '@vipswap/uikit'
import styled from "styled-components";
import {useWeb3React} from "@web3-react/core";
import {useBatchSellToken} from "../../product/hooks/useAction";
import {nftsLocalOnlyToken, quoteTokenOptions, quoteTokensArr} from '../../../config/constants/nfts'
import SelectQuoteToken from "../../product/Modals/SelectQuoteToken";
import {useNftContract} from "../../../hooks/useContract";
import {useApproveSellNftAll} from "../../product/hooks/useApprove";
import {useGetUserNft, useNftsState} from "../../../state/nfts/hooks";
import {useGetNftDetailONline} from "../../product/hooks/useGetNftDetail";
import InputSell from "../../product/Modals/InputSell";
import {useTranslation} from "../../../contexts/Localization";

interface props {
    checkedList: Array<any>,
    method: string,
    onDismiss?: () => void
}
const SaleModal: React.FC<props> = ({ checkedList, method, onDismiss}) => {
    const { t } = useTranslation()
    const { account } = useWeb3React()
    const [sellPrice, setSellPrice] = useState('')

    const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSellPrice(event.target.value);
    }

    const [quoteToken, setQuoteToken] = useState('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE');
    const handleOptionChange = (option: quoteTokenOptions): void => {
        setQuoteToken(option.address);
    }

    const [nftTokens, setNftTokens] = useState([]);
    const [tokenIds, setTokenIds] = useState([]);
    const [quoteTokens, setQuoteTokens] = useState([]);
    const [prices, setNftPrices] = useState([]);
    const [selleStatus, setNftSelleStatus] = useState([]);
    useEffect(() => {
        // 初始化参数
        const init = async () => {
            // console.log(sellPrice);
            // console.log(checkedList);
            // console.log(quoteToken);
            const nftTokensList = [];
            const tokenIdsList = [];
            const quoteTokensList = [];
            const pricesList = [];
            const selleStatusList = [];
            if (checkedList.length > 0) {
                for (let i = 0; i < checkedList.length; i++) {
                    nftTokensList.push(checkedList[i].tokenAddress);
                    tokenIdsList.push(checkedList[i].tokenid);
                    quoteTokensList.push(quoteToken);
                    pricesList.push(sellPrice);
                    selleStatusList.push(0);
                }
                setNftTokens(nftTokensList);
                setTokenIds(tokenIdsList);
                setQuoteTokens(quoteTokensList);
                setNftPrices(pricesList);
                setNftSelleStatus(selleStatusList);
            }
        }
        init();
    }, [checkedList, quoteToken, sellPrice])

    // 授权 nft 给 exchangenft 合约
    // 获取nft的合约abi
    // console.log(checkedList)
    const {userNftApprove} = useNftsState()
    // console.log(userNftApprove)
    const [isApprove,setIsApprove] = useState(userNftApprove[0].sellApprove??false)
    const nftAbi = nftsLocalOnlyToken;
    // console.log(nftAbi);
    const nftContract = useNftContract(nftAbi[0].abi, userNftApprove[0].nftToken)
    const {onApprove} = useApproveSellNftAll(nftContract, null)
    const [requestedApproval, setRequestedApproval] = useState(false)

    const handleApprove = useCallback(async () => {
        try {
            setRequestedApproval(true)
            const res = await onApprove()
            if(res){
                setIsApprove(true)
            }
            setRequestedApproval(false)
            // onDismiss()
        } catch (e) {
            console.error(e)
        }
    }, [onApprove,setIsApprove,])

    const { onBatchSellNft } = useBatchSellToken();
    const [pendingTx, setPendingTx] = useState(false);

    return (
        <Modal title={t(method)}
               onDismiss={onDismiss}
        >
            <StyledContainer>
                <StyledPriceBox>
                    <InputSell onChange={handleChangePrice}/>
                    <SelectQuoteToken onChange={handleOptionChange} options={quoteTokensArr}/>
                </StyledPriceBox>

                {account && isApprove && (
                    <StyledConfirmBtn
                        // className='sub'
                        // onClick={submit}
                        className={sellPrice===''||pendingTx?'disable':""}
                        onClick={async () => {
                            if(pendingTx) return
                            setPendingTx(true)
                            const res = await onBatchSellNft(nftTokens, tokenIds, quoteTokens, prices, selleStatus)
                            setPendingTx(false)
                            // console.log(res);
                            if(res === 1) {
                                onDismiss()
                                message.success(t('Success'))
                                window.location.href=`/user/my?type=ONSALE`
                            } else {
                                message.error(t('Fail'))
                            }
                        }}>
                        Sell
                    </StyledConfirmBtn>
                )}
                {account && !isApprove && (
                    <StyledConfirmBtn className={requestedApproval?'disable':""} onClick={handleApprove}>
                        Approve NFT
                    </StyledConfirmBtn>
                )}

            </StyledContainer>
        </Modal>
    )

}
const StyledContainer = styled.div`
  position: relative;
`
const StyledPriceBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const StyledConfirmBtn = styled.div`
  width: 250px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  font-size: 16px;
  background: ${({theme})=>theme.expandColor.color.active};
  color: ${({theme})=>theme.expandColor.color.white};
  border: 1px solid ${({theme})=> theme.expandColor.color.color1};

  cursor: pointer;
  margin: 20px auto;
  &.disable {
    cursor: disable;
    opacity: 0.6;
  }
  &:hover {
    opacity: 0.8;
  }
  &.disable:hover {
    cursor: not-allowed;
    opacity: 0.6;
  }
`
const StyledBalanceRow = styled.div`
  display: flex;
  justify-content: flex-end;
`
const BalanceData = styled.div`
  font-size: 14px;

`

export default SaleModal
import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Checkbox, Select, Input, Space, message} from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { useTranslation } from 'contexts/Localization'
import {useWeb3React} from "@web3-react/core";
import {useModal} from "@vipswap/uikit";
import {
    fetchNftsUserAllowanceAsync, fetchNftsUserApproveAsync,
    fetchNftsUserSellDataAsync,
    fetchUserNftsDataAsync
  } from "../../../state/nfts";
  import {NFT_PER_PAGE} from "../../components/types";
import {useAppDispatch} from "../../../state";
import SaleModal from './SaleModal';
import Pagination from "./Pagination";
import {getUserNft, getUserNftTotalNum} from "../../../state/nfts/helpers";
import {nftsLocalOnlyToken} from "../../../config/constants/nfts";
import SellModal from "../../product/Modals/SellModal";
import {InfoBtn, InfoBtnIcon, InfoBtnText} from "../../product/Modals/ModalStyled";
import toRight from "../../../asset/images/toRight.png";


const CheckboxGroup = Checkbox.Group;
const { Option } = Select;
const { Search } = Input;

interface props {
    curPage: string
}

const BulkSale: React.FC<props> = ({curPage}) => {
    const { t } = useTranslation()
    const [checkedList, setCheckedList] = useState([]);
    // const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(false);
    const [data, setData] = useState([]);
    const [num,setNum]=  useState()
    const { account,chainId } = useWeb3React()
    const dispatch = useAppDispatch()
    const [name, setName] = useState('');
    const [artworkType,setArtworkType] = useState('')

    useEffect(()=>{
        if (account) {
            // dispatch(fetchUserNftsDataAsync({accounts:account,page:parseInt(curPage),size:NFT_PER_PAGE}));
            dispatch(fetchNftsUserAllowanceAsync(account));
            dispatch(fetchNftsUserSellDataAsync({account}));
            dispatch(fetchNftsUserApproveAsync(account));
        }
        setCheckedList([]);
        setCheckAll(false);
        getDate();
        getListNum();
    }, [account, curPage, dispatch, chainId, artworkType, name]) // eslint-disable-line react-hooks/exhaustive-deps

    const nftToken = nftsLocalOnlyToken[0].token;
    function getDate(){
        const getList = async () => {
            const result = await getUserNft(nftToken, account, Number(curPage), 10, name, artworkType);
            setData(result);
            // console.log(curPage,'curPage');
        }
        return getList();
    }

    function getListNum(){
        const getNumber = async() =>{
            const nums = await getUserNftTotalNum(nftToken, account, name, artworkType);
            setNum(nums.pageCount)
            // console.log(nums[0].pageCount,'nums'); 
        }
        return getNumber();
    }


    const onChange = (list) => {
        setCheckedList(list);    
        // console.log(list);
        
        // setIndeterminate(!!list.length && list.length < data.length);
        setCheckAll(list.length === data.length);
        
    };

    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? data : []);
        // console.log(e.target.checked ,'checked ');
        // setIndeterminate(false);
        setCheckAll(e.target.checked);
    };


    function handleChange(value) {
        setArtworkType(value)
    }


    const searchItems = (searchValue) => {
        setName(searchValue);
    }

    const [onBulkSaleModal] = useModal(
        <SaleModal
            checkedList={checkedList}
            method='Bulk Sale'
        />,
    )
    const handleClickBulkSale = (event): void => {
        event.stopPropagation()
        if (checkedList.length ===0){
            message.info(t('Please make a selection'))
        } else {
            onBulkSaleModal()
        }
    }
    const [onSellModal] = useModal(
        <SaleModal
            checkedList={checkedList}
            method='Sell'
        />,
    )
    const handleClickSell = (event): void => {
        event.stopPropagation()
        // console.log(event.target.id)
        // console.log(typeof (event.target.id))
        const index = data.findIndex(item => item.id === Number(event.target.id));
        // console.log(data)
        // console.log(index)
        setCheckedList([data[index]]);
        // console.log(checkedList)
        onSellModal()
    }
    return (
        <Sale>
        <>
            <StyledAll>
                <StyledFlex>
                    <Checkbox
                        onChange={onCheckAllChange}
                        checked={checkAll}> {t('Check all')}
                    </Checkbox>
                     <button onClick={handleClickBulkSale}>{t('Bulk Sale')}</button>
                     {/* <SaleModal checkedList={checkedList} method='Bulk Sale'></SaleModal> */}
                </StyledFlex>
                <StyledFlex>
                    <>
                    <Select defaultValue={t('All')} onChange={handleChange} getPopupContainer={triggerNode => (triggerNode.parentElement || document.body)}>
                        <Option value="">{t('All')}</Option>
                        <Option value="Picture">{t('Picture')}</Option>
                        <Option value="Gif">{t('Gif')}</Option>
                    </Select>
                    </>
                </StyledFlex>

                <StyledFlex>
                    <StyledSearch>
                        <Space direction="vertical">
                            <Input placeholder={t('Title')} onChange={(e) => searchItems(e.target.value)}/>
                        </Space>
                    </StyledSearch>
                </StyledFlex>
                
                
            </StyledAll>
            <StyledSale>
                <CheckboxGroup value={checkedList} onChange={onChange} >
                <StyledTop>
                    <span>{t('TokenId')}</span>
                    <span>{t('Artwork Type')}</span>
                    <span>{t('Title')}</span>
                    {/* <span>{t('Operate')}</span> */}
                </StyledTop>
                    { 
                        data.length === 0?(
                                <StyledList>
                                    <p>No Data</p>
                                </StyledList>
                        ):(
                            data.map((item) => {
                                return <StyledList key={item.id}>
                                    <Checkbox  value={item}>
                                        <div className='list'>
                                            <span>#{item.tokenid}</span>
                                            <span>{item.artworkType}</span>
                                            <span className='info'>{item.name}</span>
                                            {/* <span> */}
                                            {/*     <button id={item.id} onClick={handleClickSell}>Sell</button> */}
                                            {/*    <SaleModal checkedList={[item]} method='Sell'></SaleModal> */}
                                            {/* </span> */}
                                        </div>
                                    </Checkbox>
                                </StyledList>
                            })
                        )
                    }
                </CheckboxGroup>
            </StyledSale>
            <Pagination
                curPage={Number(curPage)}
                per={10}
                total={num}
                baseUrl="/user/my?type=BULKSALE"
            />
        </>
        </Sale>  
    );
};

const Sale = styled.div` 
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px 26px ;
    box-shadow: 0px 0px 8px #ccc;
    zoom: 1;

    & .ant-select-selection-search-input{
        width: 16px;
        height: 16px;
        border: 2px solid #4a58db;
        margin-right: 12px;
        zoom: 1;
    }

    ${({ theme }) => theme.mediaQueries.xs} {
        zoom: .4    
    }

    ${({ theme }) => theme.mediaQueries.sm}{
        zoom: .7;
    }  


    ${({ theme }) =>  theme.mediaQueries.lg}{
        zoom: 1;
    } 

`

const StyledAll = styled.div`
    padding: 20px 10px;
    display: flex;
    justify-content: space-between;
    /* justify-content: flex-start; */

    & .ant-checkbox-wrapper{
        font-size: 16px;
        padding-top: 5px;
        margin-right: 30px;
    }

    & .ant-select{
        height: 34px;
        color: #4a58db;
        border: 2px solid #4a58db;
        border-radius: 4px;

    }

    & .ant-select-selector{
        font-size: 16px;
        color: #4a58db;
        border: 2px solid #4a58db;
        border-radius: 4px;
       
    }

    & .ant-select{
        width: 124px !important;
    }

    & .ant-select-single:not(.ant-select-customize-input) .ant-select-selector{
        padding: 0 22px;
        height: 30px;
        width: 120px;
    }

    & .ant-select-arrow{
        color: #4a58db;
    }

    & .ant-select-open{
        display: block !important;
    }


    & .ant-select-focused{
        display: block !important;
    }

    button{
        font-size: 16px;
        height: 34px;
        background-color: #fff;
        color: #4a58db;
        border: 2px solid #4a58db;
        padding: 0 18px;
        border-radius: 4px;
        margin-left: -4px;
        cursor: pointer;


        ${({ theme }) => theme.mediaQueries.xs} {
            padding: 0 12px; 
            margin-left: -18px; 
        }

        ${({ theme }) => theme.mediaQueries.sm}{
            padding: 0 12px;
            margin-left: -22px;
        }  
    }
`

const StyledFlex = styled.div`
    flex: 1;
`

const StyledSale = styled.ul`
    list-style: none;

    & .ant-checkbox-group {
        width: 100%;
    }

`

const StyledList = styled.li`
    list-style: none;
    padding: 20px 0 20px 10px;
    border-top: 1px solid #cccccc7f;
    line-height: 30px;

    & p{
        text-align: center;
        padding: 80px;
    }

 
    & .ant-checkbox-wrapper{
        width: 100%;

        .ant-checkbox + span {
            width: 100%;
        }

    }

    & .list{
        display: flex;
        flex-direction: row;

        & span{
            flex: 1;
        } 
    }
`

const StyledSearch = styled.div`

    & .ant-input{
        height: 34px;
        border: 2px solid #4a58db;
        color: #4a58db;

        ::-webkit-input-placeholder {
            color: #4a58db4f;
            font-size: 16px;
        }
    }

    & .ant-space-item{
        width: 280px;

        ${({ theme }) => theme.mediaQueries.sm}{
            width: 240px;
        }  
    }
`

const StyledTop = styled.div`
    display: flex;
    flex-direction: row;
    padding: 20px 10px ;
    border-top: 1px solid #cccccc7f;
    line-height: 30px;

    & span{
        flex: 1;
        display: inline-block;
        font-size: 16px;
        /* color: #4a58db; */

        :nth-child(2){
            padding-left: 20px;
        } 
        :nth-child(4){
            text-align: end;
        }
    } 

`



export default BulkSale;
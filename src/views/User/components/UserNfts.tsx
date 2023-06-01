import React, {useEffect, useState} from "react";
import styled from "styled-components";
import example1 from "asset/images/card/example1.png";
import toRight from "asset/images/toRight.png";
import {Flex} from "@vipswap/uikit";
import {useWeb3React} from "@web3-react/core";
import {useHistory} from "react-router-dom";
import {Input, Select, Space} from "antd";
import Container from "../../../components/layout/Container";
import {useTranslation} from "../../../contexts/Localization";
import {PrimaryBtn} from "../../components/btn/UiButton";
import NftCard from "../../components/card/NftCard";
import {UiItemRow} from "../../components/layout/UiStyled";
import {useNftsState, usePollNftsData} from "../../../state/nfts/hooks";
import {
  fetchNftsUserAllowanceAsync, fetchNftsUserApproveAsync,
  fetchNftsUserSellDataAsync,
  fetchUserNftsDataAsync
} from "../../../state/nfts";
import {useAppDispatch} from "../../../state";
import useRefresh from "../../../hooks/useRefresh";
import NftCardCollect from "../../components/card/NftCardCollect";
import NftCardOnSale from "../../components/card/NftCardOnSale";
import {NFT_PER_PAGE} from "../../components/types";
import Pagination from "../../components/layout/Pagination";
import Circular from "../../components/layout/Circular";
import {useGetUserNftTotal} from "../hooks/useGetUserNfts";
import BulkSale from './BulkSale';

const { Option } = Select;

interface props {
  address: string,
  type: string,
  curPage: string,
}


const UserNfts:React.FunctionComponent<props> = ({address,type,curPage}) => {
  const { t } = useTranslation()
  const [artworkType,setArtworkType] = useState('')
  const [name, setName] = useState('');
  const {userData} = useNftsState()
  const [showMore,setShowMore] = useState(true)
  const { account,chainId } = useWeb3React()
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()



  // usePollNftsData()
  useEffect(() => {
    if (account) {
      dispatch(fetchUserNftsDataAsync({accounts:account, page:parseInt(curPage), size:NFT_PER_PAGE, name, artworkType}))
      dispatch(fetchNftsUserAllowanceAsync(account))
      dispatch(fetchNftsUserSellDataAsync({account, name, artworkType}))
      dispatch(fetchNftsUserApproveAsync(account))
    }
  }, [account, dispatch, slowRefresh, chainId, curPage, name, artworkType])
  const {userData: nftUserList, userSell: nftSellList,userDataLoaded} = useNftsState()
  const nftList = type==='ONSALE'? nftSellList : nftUserList

  const totalNum = useGetUserNftTotal(account, name, artworkType)
  // console.log(totalNum);
  // console.log(nftList);
  
  const [isLoad,setIsLoad] = useState(userDataLoaded)
  const history = useHistory()
  history.listen(route => {
    // console.log(route); // 这个route里面有当前路由的各个参数信息 如果变化直接js强制操作刷新页面...~~
    // window.location.reload();
    window.scrollTo(0,0)
    setIsLoad(false)
  });

  useEffect(()=>{
    if(userDataLoaded){
      setIsLoad(userDataLoaded)
    }
  },[userDataLoaded,setIsLoad,nftList])

  function handleChange(value) {
    setArtworkType(value)
  }

  const searchItems = (searchValue) => {
    setName(searchValue);
  }

  return isLoad?(
    <StyledBox>
      <StyledAll>
        <>
          <Select defaultValue={t(artworkType)} onChange={handleChange} getPopupContainer={triggerNode => (triggerNode.parentElement || document.body)}>
            <Option value="">{t('All')}</Option>
            <Option value="Picture">{t('Picture')}</Option>
            <Option value="Gif">{t('Gif')}</Option>
          </Select>
        </>



        <StyledSearch>
          <Space direction="vertical">
            <Input placeholder={t('Title')} value={name} onChange={(e) => searchItems(e.target.value)} />
          </Space>
        </StyledSearch>



      </StyledAll>
      <UiItemBox>
        {nftList.map((item) => {
          return type==='ONSALE'?(
            <NftCardOnSale key={`${item.contract}-${item.tokenId}`} curNft={item} showTag={false} />
          ):(
            <NftCardCollect key={`${item.contract}-${item.tokenId}`} curNft={item} showTag={false}/>
          )
        })}
      </UiItemBox>

      {isLoad && nftList.length===0 && (
        <Flex justifyContent="center">
          <StyledNoMore>{t('No Data')}</StyledNoMore>
        </Flex>
      )}
      
      {/* <Flex justifyContent="center">
        <StyledNoMore>{t('end')}</StyledNoMore>
      </Flex> */}

      {type === 'ONSALE' ?
           null :
          <Pagination
              curPage={Number(curPage)}
              per={NFT_PER_PAGE}
              total={totalNum}
              baseUrl={`/user/my?type=${type}`}
              urlKey="&"
          />
      }
    </StyledBox>
  ):(
    <StyledBox>
      <Circular />
    </StyledBox>
  )
}

const StyledBox = styled(Container)`
  position: relative;
  box-sizing: border-box;
  margin-bottom: 40px;
`

const UiItemBox = styled.div`
  margin: 0 20px;
  display: flex;
  flex-wrap: wrap;

  ${({ theme }) => theme.expandColor.media.max}{
    margin: 0;
  } 

`
const StyledNoMore = styled.div`
  font-size: 14px;
  color: ${({theme})=>theme.expandColor.text.text1};
  margin: 64px 0;
`
const StyledAll = styled.div`
    padding: 20px 50px;
    display: flex;
    justify-content: space-between;
    zoom: .6;

    ${({ theme }) => theme.mediaQueries.sm}{
      padding: 20px 40px;
      zoom: .8;

    }  

    ${({ theme }) => theme.mediaQueries.md} {
      padding: 20px 30px;
      zoom: 1;
    }


    ${({ theme }) => theme.expandColor.media.max} {
      padding: 20px 10px;
    }


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
        background-color: transparent;
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


const StyledSearch = styled.div`

    & .ant-input{
        height: 34px;
        border: 2px solid #4a58db;
        color: #4a58db;
        background-color: transparent;

        ::-webkit-input-placeholder {
            color: #4a58db4f;
            font-size: 16px;
        }
    }

    & .ant-space-item{
        width: 280px;

        ${({ theme }) => theme.mediaQueries.sm}{
            width: 380px;
        }  
    }
`
export default UserNfts

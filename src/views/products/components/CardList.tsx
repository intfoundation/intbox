import React, {useEffect, useState} from "react";
import styled from "styled-components";
import example1 from "asset/images/card/example1.png";
import toRight from "asset/images/toRight.png";
import {Flex} from "@vipswap/uikit";
import {useHistory} from "react-router-dom";
import {Checkbox, Input, Select, Space} from "antd";

import Container from "../../../components/layout/Container";
import {useTranslation} from "../../../contexts/Localization";
import NftCard from "../../components/card/NftCard";
import {UiItemRow} from "../../components/layout/UiStyled";

import {useNftsState, usePollNftsDataByPage} from "../../../state/nfts/hooks";
import {NFT_PER_PAGE} from "../../components/types";
import Pagination from "../../components/layout/Pagination";
import useGetTotalNum from "../hooks/useGetTotalNum";
import useGetNftList from "../hooks/useGetNftList";
import Circular from "../../components/layout/Circular";

const { Option } = Select;

interface props {
  curPage: string
}
const CardList:React.FunctionComponent<props> = ({curPage}) => {
  const { t } = useTranslation()
  const [artworkType,setArtworkType] = useState('')
  const [name, setName] = useState('');
  usePollNftsDataByPage(parseInt(curPage), NFT_PER_PAGE, artworkType, name)
  const {data: nftList,dataLoaded} = useNftsState()
  // const {isLoad,data: nftList} = useGetNftList({page:parseInt(curPage),size:NFT_PER_PAGE})
  const totalNum = useGetTotalNum(artworkType, name)
  const [showMore,setShowMore] = useState(true)
  // const filterNftList = nftList.slice(NFT_PER_PAGE*(parseInt(curPage)-1),NFT_PER_PAGE*parseInt(curPage))
  const filterNftList = nftList
  const [isLoad,setIsLoad] = useState(dataLoaded)

  const history = useHistory()
  history.listen(route => {
    // console.log(route); // 这个route里面有当前路由的各个参数信息 如果变化直接js强制操作刷新页面...~~
    // window.location.reload();
    window.scrollTo(0,0)
    setIsLoad(false)
  });

  useEffect(()=>{
    if(dataLoaded){
      setIsLoad(dataLoaded)
    }
  },[dataLoaded,setIsLoad,nftList])

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
      <UiItemRow>
        {filterNftList.map((item) => {
          return (
            <NftCard key={`${item.contract}-${item.tokenId}`} curNft={item}/>
          )
        })}
      </UiItemRow>
      {filterNftList.length ===0 && (
        <Flex justifyContent="center">
          <StyledNoMore>{t('No data yet~')}</StyledNoMore>
        </Flex>
      )}
      <Pagination
        curPage={Number(curPage)}
        per={NFT_PER_PAGE}
        total={totalNum}
        baseUrl="/nfts"
      />
    </StyledBox>
  ):(
    <StyledBox>
      <Circular/>
    </StyledBox>
  )
}

const StyledBox = styled(Container)`
    position: relative;
    box-sizing: border-box;
    margin-top: 40px;
`
const StyledNoMore = styled.div`
  font-size: 14px;
  color: ${({theme})=>theme.expandColor.text.text1};
  margin: 64px 0;
`
const StyledAll = styled.div`
    padding: 20px 0px;
    display: flex;
    justify-content: space-between;
    zoom: .6;

    ${({ theme }) => theme.mediaQueries.sm}{
      zoom: .8;
    }  

    ${({ theme }) => theme.mediaQueries.md} {
      zoom: 1;
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
export default CardList
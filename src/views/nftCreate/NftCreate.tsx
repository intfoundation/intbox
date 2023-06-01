import React, {useEffect, useState} from 'react'
import axios from "axios";
import { message, Button } from 'antd';
import {useParams,useHistory} from "react-router-dom";
import {useWeb3React} from "@web3-react/core";
import { useTranslation } from 'contexts/Localization'
import styled from "styled-components";
import Page from 'components/layout/Page'
import Container from 'components/layout/Container';
import FormCard from "./components/FormCard";
import Desc from './components/Desc';
import {createErc721, getNftDataById} from "../../state/nfts/helpers";
import {useAppDispatch} from "../../state";
import useRefresh from "../../hooks/useRefresh";



// import Container from "../../../components/layout/Container";

import {
  fetchNftsPublicDataAsync,
  fetchNftsUserAllowanceAsync, fetchNftsUserApproveAsync,
  fetchNftsUserSellDataAsync,
  fetchUserNftsDataAsync
} from "../../state/nfts";
import {useCreateToken} from "./hooks/useAction";
import useSupport from "./hooks/useSupport";
import {useNftContract} from "../../hooks/useContract";
import INTBoxNFTFactory from "../../vipswap/lib/abi/nfts/INTBoxNFTFactory.json";
import {fetchAllNft} from "../../state/nfts/fetchNfts";
import multicall from "../../utils/multicall";
import {NftConfig} from "../../config/constants/types";
import ContractWalletPage from "../../components/Wallet/ContractWalletPage";

const NftCreate: React.FC = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const supportCommToken = useSupport()
  // console.log(supportCommToken)
  const [artworkType, setArtworkType] = useState('Picture');
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [royalties, setRoyalties] = useState('');
  const [description, setDescription] = useState('');
  const [brandDesc, setBrandDesc] = useState('');
  const [socialMedia, setSocialMedia] = useState('');
  const [image, setImage] = useState<any>();
  const [select, setSelect] = useState(false);
  const [submitText, setSubmitText] = useState('Create NFT');
  // const [supportCommToken, setSupportCommToken] = useState('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE');
  const [submitClass, setSubmitClass] = useState('');

  const getArtworkType = (typeValue): void => {
    setArtworkType(typeValue);
  }
  const getTitle = (event): void => {
    setTitle(event.target.value);
  }
  const getName = (event): void => {
    setName(event.target.value);
  }
  const getRoyalties = (event): void => {
    setRoyalties(event.target.value);
  }
  const getBrandDesc = (event): void => {
    setBrandDesc(event.target.value);
  }
  const getDescription = (event): void => {
    setDescription(event.target.value);
  }
  const getSocialMedia = (event): void => {
    setSocialMedia(event.target.value);
  }
  const getSelect = (event): void => {
    setSelect(event.target.checked);
  }


  const {getSupport, onCreateNft} = useCreateToken(account, supportCommToken);
  // const useNFTContract = useNftContract(INTBoxNFTFactory, '0xa8c057d73be509c3d2d0230f12488dc4fa334528');

  // useEffect(() => {
  //   // 更新合约
  //   const support = async () => {
  //     // const supportList = await getSupport();
  //     console.log(supportList)
  //     // 获取isSupported判断是否为true
  //     if (supportList.isSupported === true) {
  //       //  如果是true判断supportCommToken是否为0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE
  //       if (supportList.supportCommToken !== '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') {
  //         //  如果不是则授权supportCommToken
  //         setSupportCommToken(supportList.supportCommToken);
  //       }
  //     }
  //   }
  //   support();
  // }, [account, getSupport, setSupportCommToken, supportList])

  // const supportFun = async () => {
  //   // 更新合约
  //   const supportList = await getSupport();
  //   console.log(supportList);
  //   // 获取isSupported判断是否为true
  //   if (supportList.isSupported === true) {
  //     //  如果是true判断supportCommToken是否为0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE
  //     if (supportList.supportCommToken !== '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') {
  //       //  如果不是则授权supportCommToken
  //       setSupportCommToken(supportList.supportCommToken);
  //     }
  //   }
  // }

  let uri = '';
  const submit = async(event) => {
    // Prevent repeated clicks
    event.stopPropagation();
    // await supportFun();
    if (title === '') {
      message.warning(t('Enter the title'))
      return;
    }
    if (name ==='') {
      message.warning(t('Enter the artist name'))
      return;
    }
    // if (royalties === '') {
    //   message.warning('Please enter Royalties')
    //   return;
    // }

    if (description === '') {
      message.warning(t('Enter the brief description'))
      return;
    }

    if (brandDesc === '') {
      message.warning(t('Enter a brief description of the Brand'))
      return;
    }

    if (submitText === 'Pending') {
      return;
    }

    setSubmitText('Pending');
    setSubmitClass('disable');
    // console.log(select);
    if (!select) {
      message.warning(t('Please agree to the above'));
      setSubmitText('Create NFT');
      setSubmitClass('');
      return;
    }

    // console.log(title, name, description, royalties, socialMedia);
    const obj = {
      artworkType,
      title,
      name,
      description,
      brandDesc,
      royalties: Number(royalties),
      socialMedia,
      image: ''
    };
    // const bearer = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAzZDFkM2Y4NDFjNTVhOWUxRjMxOWU3MjM3NzNGRDljODlEQTQ5MjYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzOTcxMjM0MzEwOSwibmFtZSI6InRlc3QifQ.tE-U4pyntIF1qT-iYRNT91h-NnAOD51bXbg7glfbjhE';
    // intbox@intchain.io私钥
    const bearer = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDlCZTQyNjBCRjM1MkYwNzdDQmI5RTUxYzNDOWI2QzEzMzM2RjVkMjUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0MTc4NTIyMjQ1MCwibmFtZSI6ImludGJveCJ9.WuROV73BuCGNSYHbda3RYaaWbxjQ4USppZlh1pTaWpc';
    if (image) {
      await axios({
        headers: {
          'accept': 'application/json',
          'Content-Type': 'image/*',
          'Authorization': bearer,
        },
        method: 'post',
        url: 'https://api.nft.storage/upload',
        data: image,
      }).then((res) => {
        if (res.status === 200 && res.data && res.data.ok === true) {
          // console.log(res.data);
          obj.image = `https://ipfs.io/ipfs/${res.data.value.cid}`;
        }
      }).catch((err) => {
        console.log(err);
      });
      if (obj.image) {
        await axios({
          headers: {
            'accept': 'application/json',
            'Content-Type': 'image/*',
            'Authorization': bearer,
          },
          method: 'post',
          url: 'https://api.nft.storage/upload',
          data: obj,
        }).then((res1) => {
          if (res1.status === 200 && res1.data && res1.data.ok === true) {
            // console.log(res1.data);
            // nft创建上链
            uri = `https://ipfs.io/ipfs/${res1.data.value.cid}`;
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    } else {
      message.warning(t('Upload artwork image'));
      setSubmitText('Create NFT');
      setSubmitClass('');
      return;
    }
    if (uri) {
      const nftData = await onCreateNft(uri);
      // console.log(nftData);
      if (nftData && nftData.status === 1) {
        // console.log(nftData.transactionHash);
        // 创建NFT数据到数据库
        // await createErc721(nftData.blockNumber, nftData.to, artworkType, title, name, description, brandDesc, Number(royalties), socialMedia, obj.image);
        message.success(t('Success'));
        window.location.href=`/user/my?type=COLLECT`
      } else {
        message.error(t('Fail'));
      }
    }
    setSubmitText('Create NFT');
    setSubmitClass('');
  }

  return account? (
    <Page>
      <StyledBox>
        <StyledTitle> {t('INTBOX Artists')} </StyledTitle>
        <StyledCard>
          <FormCard artworkType={artworkType} getArtworkType={getArtworkType} getTitle={getTitle} getName={getName} getRoyalties={getRoyalties} setImage={setImage} />
          <Desc getDescription={getDescription} getBrandDesc={getBrandDesc} getSocialMedia={getSocialMedia} />
          <StyledFooter>
            <StyledIpt>
              <input  type="checkbox" onChange={getSelect} />
              <span>{t('I declare that is an original artwork. I understand that no plagiarism is allowed, and that the artwork can be removed anytime if detected.')}</span>
            </StyledIpt>
            <Styledspan>{t('Mint an NFT charges 100 INT, please do not upload any sensitive content')}</Styledspan>
            <StyledButton className={submitClass} onClick={submit}>{t(submitText)}</StyledButton>
          </StyledFooter>
        </StyledCard>
      </StyledBox>
    </Page>
  ): (
      <Page>
        <ContractWalletPage/>
      </Page>
  )
}

const StyledBox = styled(Container)`
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const StyledTitle = styled.p`
  font-size: 36px;
`

const StyledCard = styled.div`
  margin-top: 50px;
  background-color:#fff;
  width: 100%;
  padding: 30px 30px;
  border-radius: 10px;
  box-shadow: rgb(204 204 204) 0px 0px 8px;
  margin-bottom: 80px;
  
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 50px 90px;
  }


  
`

const StyledFooter = styled.div`
    margin-top: 48px;
`
const StyledButton = styled.button`
      background-color: #4a58db;
      border: none;
      color: #fff;
      border-radius: 10px;
      width: 100%;
      height: 70px;
      font-size: 18px;
      margin-top: 74px;
      cursor: pointer;

      &.disable {
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
const Styledspan = styled.p`  
  
    margin-top: 38px;
    text-align: center;
    color: #4a58db;
`

const StyledIpt = styled.div`
    padding: 0 26px;
    
    display: flex;
    justify-content: space-between;

    input{
      margin: 6px 14px 0 0;
    }

    span{
      line-height: 24px;
    }
`


export default NftCreate
// export default withRouter(NftCreate)

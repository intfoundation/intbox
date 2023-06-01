import React, {useState} from "react";
import styled from "styled-components";
import example1 from "asset/images/card/example1.png";
import toRight from "asset/images/toRight.png";
import {Flex} from "@vipswap/uikit";
import {Link} from "react-router-dom";

import Container from "../../../components/layout/Container";
import {useTranslation} from "../../../contexts/Localization";
import {PrimaryBtn} from "../../components/btn/UiButton";
import {UiItemRow} from "../../components/layout/UiStyled";
import {useNftsState} from "../../../state/nfts/hooks";
import NftCardHome from "../../components/card/NftCardHome";
import Circular from "../../components/layout/Circular";

const CardList:React.FunctionComponent = () => {
  const { t } = useTranslation()
  const {data: nftGroupList,dataLoaded} = useNftsState()
  return dataLoaded?(
    <StyledBox>
      <UiItemRow>
        {nftGroupList.map(( item,i) => {
          if(i>8) return null
          return (
            <NftCardHome key={`${item.contract}-${item.tokenId}`} curNft={item} />
          )
        })}
      </UiItemRow>
      {nftGroupList.length>0 && (
        <Flex justifyContent="center">
          <Link to="/nfts">
            <PrimaryBtn text={t('More')} />
          </Link>
        </Flex>
      )}

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
    ${({ theme }) => theme.mediaQueries.sm} {
        margin-top: 40px;
    }
`

export default CardList

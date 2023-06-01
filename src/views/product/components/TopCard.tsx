import React from "react";
import styled from "styled-components";

import Container from "components/layout/Container";
import {useTranslation} from "../../../contexts/Localization";
import {NftConfig} from "../../../config/constants/types";
import PurchaseButton from "../Modals/PurchaseButton";
import CardLeft from "../../components/topCard/CardLeft";
import CardRight from "../../components/topCard/CardRight";
import SellOutButton from "../Modals/SellOutButton";

interface Props {
  curNft: NftConfig,
  isSell: boolean
}
const TopCard:React.FunctionComponent<Props> = ({curNft,isSell}) => {
  const { t } = useTranslation()
  return (
    <StyledBox>
      <CardLeft curNft={curNft} />
      <CardRight curNft={curNft} canChooseNumber>
        {isSell?(
          <SellOutButton />
        ):(
          <PurchaseButton details={curNft}/>
        )}
      </CardRight>

    </StyledBox>
  )
}

const StyledBox = styled(Container)`
    position: relative;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`

export default TopCard

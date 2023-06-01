import React from "react";
import styled from "styled-components";

import Container from "components/layout/Container";
import {useTranslation} from "../../../contexts/Localization";
import {NftConfig} from "../../../config/constants/types";
import SellButton from "../Modals/SellButton";
import CardLeft from "../../components/topCard/CardLeft";
import CardRight from "../../components/topCard/CardRight";

interface Props {
  curNft: NftConfig,
}
const TopCardCollect:React.FunctionComponent<Props> = ({curNft,}) => {
  const { t } = useTranslation()
  return (
    <StyledBox>
      <CardLeft curNft={curNft} />
      <CardRight curNft={curNft} canChooseNumber={false}>
        <SellButton details={curNft}/>
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

export default TopCardCollect

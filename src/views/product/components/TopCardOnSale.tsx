import React from "react";
import styled from "styled-components";

import Container from "components/layout/Container";
import {useTranslation} from "../../../contexts/Localization";
import {NftConfig} from "../../../config/constants/types";
import RemoveButton from "../Modals/RemoveButton";
import CardLeft from "../../components/topCard/CardLeft";
import CardRight from "../../components/topCard/CardRight";

interface Props {
  curNft: NftConfig,
}
const TopCardOnSale:React.FunctionComponent<Props> = ({curNft,}) => {
  const { t } = useTranslation()
  return (
    <StyledBox>
      <CardLeft curNft={curNft} />
      <CardRight curNft={curNft} canChooseNumber={false}>
        <RemoveButton details={curNft}/>
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


export default TopCardOnSale

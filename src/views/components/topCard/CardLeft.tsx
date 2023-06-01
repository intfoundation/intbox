import React from "react";
import styled from "styled-components";
import {NftConfig} from "../../../config/constants/types";
import {useTranslation} from "../../../contexts/Localization";
import example1 from "../../../asset/images/card/example1.png";

interface props {
  curNft: NftConfig
}
const CardLeft: React.FC<props> =
  ({
     curNft,
   })=>{
    const { t } = useTranslation()
    return (
      <StyledCard>
        <img src={curNft.img} alt=''/>
      </StyledCard>
    )
  }
export default CardLeft


const StyledCard = styled.div`
    position: relative;
    width: 100%;
    box-sizing: border-box;
    border-radius: ${({theme})=>theme.expandColor.radius.radius1};
    
    overflow: hidden;
    max-height: 500px;
    
    padding: 40px 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({theme})=>theme.expandColor.bg.bg1};
    ${({ theme }) => theme.mediaQueries.sm} {
       min-height: 500px;
       width: 35%;
    }
    
    & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
   
`

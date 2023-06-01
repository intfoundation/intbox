import React from "react";
import styled from "styled-components";
import hotIcon from "asset/images/tag/hot.png"
import tagBgImg from "asset/images/tag/tagBg.png"
import tagBg2Img from "asset/images/tag/tagBg2.png"
import {useTranslation} from "../../../contexts/Localization";

const StyledTag = styled.div`
    position: absolute;
    top: 0;
    left: -5px;
    width: 85px;
    height: 34px;
    z-index: 3;
    
`
const StyledTagBg = styled.div`
    position: absolute;
    top: 0;
    left:0;
    z-index: -1;
    
    & img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`
const StyledTagLabel = styled.div`
    display: flex;
    justify-content: center;
    align-items: center; 
    height: 24px;
    width: 100%;
    z-index: 2;
`
const StyledIcon = styled.img`
    width: 18px;
    height: 18px;
`
const StyledStr = styled.div`
    font-size: 12px;
    line-height: 1;
    color: ${({theme})=>theme.expandColor.text.text3};
    margin-left: 5px;
`


export const HotTag = function () {
    const { t } = useTranslation()
    return (
        <StyledTag>
            <StyledTagBg>
                <img src={tagBgImg} alt=''/>
            </StyledTagBg>
            <StyledTagLabel>
                <StyledIcon src={hotIcon} alt='' />
                <StyledStr>{t('hot')}</StyledStr>
            </StyledTagLabel>
        </StyledTag>
    )
}

export const SoldOutTag = function () {
    const { t } = useTranslation()
    return (
        <StyledTag>
            <StyledTagBg>
                <img src={tagBg2Img} alt=''/>
            </StyledTagBg>
            <StyledTagLabel>
                <StyledStr>{t('Sold out')}</StyledStr>
            </StyledTagLabel>
        </StyledTag>
    )
}

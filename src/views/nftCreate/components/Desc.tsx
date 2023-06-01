import React, {useState} from "react";
import styled from "styled-components";
import Container from "../../../components/layout/Container";
import {useTranslation} from "../../../contexts/Localization";
import Img from "../../../asset/images/a-3.png"

interface Props {
    getDescription?: (event) => void,
    getBrandDesc?: (event) => void,
    getSocialMedia?: (event) => void
}
const Desc: React.FC<Props> = ({getDescription, getBrandDesc, getSocialMedia})=> {
    const { t } = useTranslation()
    return(
        <StyledTab>
            <StyledDesc>
                <StyledTitle className="icon" >{t('Description')}</StyledTitle>
                <textarea placeholder={t('Enter the brief description')} onChange={getDescription}></textarea>
            </StyledDesc>
            <StyledDesc>
                <StyledTitle className="icon" >{t('Brand Description')}</StyledTitle>
                <textarea placeholder={t('Enter a brief description of the Brand')} onChange={getBrandDesc}></textarea>
            </StyledDesc>
            {/* <StyledDesc> */}
            {/*    <StyledTitle>{t('Socoal Media/Portfolio link')}</StyledTitle> */}
            {/*    <StyledInput> */}
            {/*        <img src={Img}></img> */}
            {/*        <input type="text" placeholder={t('Personal website,Instagram,Twitter,etc')} onChange={getSocialMedia}/> */}
            {/*    </StyledInput>  */}
            {/* </StyledDesc> */}
        </StyledTab>
    )

  
}

const StyledTab = styled(Container)`
    padding: 0;
`

const StyledDesc = styled.div`
    margin-top: 50px;

    & textarea{
        width: 100%;
        height: 174px; 
        line-height: 1.5; 
        background-color:#f5fafe; 
        border: none;
        margin-top: 15px;
        border-radius: 10px;
        color: #4a58bd7f;
        padding: 20px 30px;
        font-size: 16px;
        outline:none;

        ::-webkit-input-placeholder{
            color: #4a58bd7f;
        }

        :-moz-placeholder{
            color: #4a58bd7f;
        }

        :-ms-input-placeholder{
            color: #4a58bd7f;
        }
    }

    & .icon{
        :after{
            display: inline-block;
            margin-left: 4px;
            color: #ff4d4f;
            font-size: 18px;
            font-family: SimSun,sans-serif;
            line-height: 1;
            content: "*";
            font-weight: bolder;
        }

    }


`

const StyledInput = styled.div`
    width: 100%;
    background-color:#f5fafe; 
    padding: 0 30px;
    margin-top: 15px;
    height: 74px;
    display: flex;
    border-radius: 10px;

    & img{
        width: 32px;
        height: 32px;
        margin: 22px 6px 0 0 ;

    }
    

    & input{
        width: 100%;
        height: 74px;
        background-color:#f5fafe; 
        border: none;
        border-radius: 10px;
        color: #4a58bd7f;
        font-size: 16px;
        outline:none;
        padding: 0;
        ::-webkit-input-placeholder{
            color: #4a58bd7f;
        }

        :-moz-placeholder{
            color: #4a58bd7f;
        }

        :-ms-input-placeholder{
            color: #4a58bd7f;
        }

    }

`
const StyledTitle = styled.p`
    font-size: 20px;
`


export default Desc
import React, {useState} from "react";
import axios from "axios";
import { message} from 'antd';
import styled from "styled-components";
import Container from "../../../components/layout/Container";
import {useTranslation} from "../../../contexts/Localization";
import Img1 from "../../../asset/images/a-1.png";
import Img2 from "../../../asset/images/a-2.png";
import Icon from "../../../asset/images/a-4.png";
import Img5 from "../../../asset/images/a-5.png";

interface Props {
    artworkType: string,
    getArtworkType?: (event) => void,
    getTitle?: (event) => void,
    getName?: (event) => void,
    getRoyalties?: (event) => void,
    setImage?: (event) => void
}
const FormCard: React.FC<Props> = ({artworkType, getArtworkType, getTitle, getName, getRoyalties, setImage})=> {
  const { t } = useTranslation();
  const [accept, setAccept] = useState('.png,.jpg,.jpeg');
  const [img, setImg] = useState<any>(Img2);
  const [active , setActive] = useState(true)
  const selectType = (event): void => {
      event.stopPropagation();
      // console.log(event.target.value);
      if (event.target.value === 'GIF') {
          setAccept('.gif');
      } else {
          setAccept('.png,.jpg,.jpeg');
      }
      setImg(Img2);
      getArtworkType(event.target.value);
      setImage('');
      setActive(true);
  }
  const upload = (event): void => {
      event.stopPropagation();
      document.getElementById("btn_file").click();
  }
  const displayImg = (event): void => {
      // console.log(event.target.files);
      const filePath = event.target.files[0];
      if (filePath) {
          setImage(filePath);
          const reader = new FileReader();
          reader.readAsDataURL(filePath);
          reader.onload = function (e) {
              // console.log(reader);
              const image = new Image();
              image.onload = function () {
                  // console.log('宽高');
                  const width = image.width;
                  const height = image.height;
                  // console.log(width);
                  // console.log(height)
                  if (width === 440 && height === 540) {
                      setImg(reader.result);
                      setActive(false);
                  } else {
                       message.warning(t('440*540 recommended'));
                  }
              }
              image.src = reader.result as string;
          }
      } else {
          setImg(Img2);
          setImage('');
          setActive(true);
      }
  }
  return (
      <StyledForm>
        <StyledTitle>{t('Create new item')}</StyledTitle>
        <StyleTop>
            <StyledLeft>
                <StyledSpan>{t('Upload artwork image')} </StyledSpan>
                <input type="file" id="btn_file" accept={accept} onChange={displayImg}/>
                <StyledImg onClick={upload}>
                    < img className = {active?'active':'isActive'} src={img} alt="" />
                </StyledImg>
                <StyledInfo>{t('440*540 recommended')}</StyledInfo>
            </StyledLeft>
            <StyledRight>               
                <StyledInputs>
                    <StyledSpan>{t('Artwork Type')}</StyledSpan>
                    <StyledDrop>
                        <StyledBtn className='btn'> <img src={(artworkType === 'GIF' ? Img5 : Img1)} alt="" /> {t(artworkType)} <img src={Icon} alt="" />
                        </StyledBtn>
                        <StyledDown className='down'>
                            <button value="Picture" onClick={selectType}> <img src={Img1} alt="" /> {t('Picture')}</button>
                            <button value="GIF" onClick={selectType}> <img src={Img5} alt="" /> {t('GIF')}</button>
                        </StyledDown>
                    </StyledDrop>

                </StyledInputs>
                <StyledInputs>
                    <StyledSpan>{t('Title')}</StyledSpan>
                    <input type="text"  placeholder={t('Enter the title')} onChange={getTitle}/>
                </StyledInputs>
                <StyledInputs>
                    <StyledSpan>{t('Artist Name')}</StyledSpan>
                    <input type="text" placeholder={t('Enter the artist name')} onChange={getName}/>
                </StyledInputs>
                {/* <StyledInputs> */}
                {/*    <StyledSpan>{t('Royalties')}</StyledSpan> */}
                {/*    <input type="text" placeholder="0" onChange={getRoyalties}/> */}
                {/* </StyledInputs> */}
                {/* <StyledDesc>{t('Suggested: 0%,10%,20%,30%')}</StyledDesc> */}
            </StyledRight>
          </StyleTop>
      </StyledForm>   
  )
}


const StyledForm = styled(Container)`
    position: relative;
    box-sizing: border-box;
    padding: 0;
`

const StyledTitle = styled.p`
    font-size: 30px;
    color: #4a58bd;
`
const StyleTop = styled.div`
    width: 100%;
    padding-top: 38px;
    box-sizing: border-box;

    ${({ theme }) => theme.expandColor.media.max} {
      display: flex;
      justify-content: space-between;
    }
`
const StyledSpan = styled.p`
    margin-bottom: 20px;
    font-size: 20px;
    line-height: 22px;

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


`
const StyledImg = styled.div`

    width: 440px;
    height: 540px;
    background-color: #ccebf2;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center; 
    margin: 0 auto;

    ${({ theme }) => theme.mediaQueries.lg} {
        height: 540px;
        margin: 0;

        ${({ theme }) => theme.expandColor.media.max}{
            width: 440px;
            height: 540px;
            margin: 0;
        }  
    }

    & .active{
      width: 58px;

      ${({ theme }) => theme.mediaQueries.md} {
        width: 120px;
      }

    }

    & .isActive{
        width: 440px;
        height: 540px;
    }
`

const StyledInfo =styled.p`
    font-size: 14px;
    text-align: center;
    margin-top: 15px;
    color: #4a58bd;
    opacity: .5;
`

const StyledRight = styled.div`
    margin-top: 50px;
    flex:1;

    ${({ theme }) => theme.expandColor.media.max} { 
      margin-top: 0px;
    }
`

const StyledLeft = styled.div`
    flex: 1;
    position: relative;

    input{
      display: none;
    }
 

`

const StyledInputs = styled.div`
    //margin-bottom: 40px;
    margin-bottom: 90px;
    position: relative;
    input{
        width: 100%;
        height: 64px;
        font-size: 16px;
        padding: 10px 30px;
        border-radius: 10px; 
        background-color: #f5fafe;     
        border: none;
        color: #4a58bd7f;
        outline:none;

        ${({ theme }) => theme.mediaQueries.md} {
            height: 74px;
            padding: 26px 30px;

            ${({ theme }) => theme.expandColor.media.max}{
                width: 522px;
                height: 76px;
                padding: 26px 30px;
            }

        }


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

    :nth-child(4){ 
        margin-bottom: 16px;
        input{
            color: #4a58bd;

            ::-webkit-input-placeholder{
                color: #4a58bd;
            }

            :-moz-placeholder{
                color: #4a58bd;
            }

            :-ms-input-placeholder{
                color: #4a58bd;
            }

        }
    }
`

const StyledDesc = styled.p`
    font-size: 14px;
    text-align: center;
    color: #4a58bd;
    opacity: .5;
`

const StyledDrop = styled.div`
    position: relative;

    :hover .down{
        display: block;
    }
`

const StyledBtn = styled.button`
    width: 100%;
    height: 64px;
    font-size: 16px;
    padding: 10px 30px;
    border-radius: 10px; 
    background-color: #f5fafe;   
    border: none;
    color: #4a58bd;
    text-align: left;
    cursor: pointer;

    ${({ theme }) => theme.mediaQueries.md} {
        width: 100%;

        ${({ theme }) => theme.expandColor.media.max}{
            width: 522px;
        }
    }

    img{
        vertical-align: middle;
        width: 28px;
        margin-right: 4px;

        :nth-child(2){
            width: 22px;
            float: right;
        }
    }

`

 
const StyledDown = styled.div`
    display: none;
    /* width: 520px; */
    width: 100%;
    height: 148px;
    background-color: #fff; 
    position: absolute;
    z-index: 99;
    border-radius: 10px;
    box-shadow: 0px 0px 8px rgba(0,0,0, .5);
    margin-top: 2px;

    & button{
        display: block;
        /* width: 520px; */
        width: 100%;
        height: 74px;
        line-height: 74px;
        padding: 0 30px;  
        background-color: #fff;
        border: none;
        color: #4a58bd;
        text-align: left;
        cursor: pointer;

        :nth-child(1){
            border-radius: 10px 10px 0 0;
        }
        :nth-child(2){
            border-radius: 0px 0px 10px 10px;
        }

        & img{
            vertical-align: middle;
            width: 28px;
            margin-right: 4px;
        }
    }

    button:hover{
        background-color: #f1f1f1;
    }

`



export default FormCard

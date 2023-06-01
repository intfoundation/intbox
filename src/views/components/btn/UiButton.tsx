import React from "react";
import styled from "styled-components";
import SVG from "react-inlinesvg";
import toRightSvg from "asset/icons/toRight.svg";
import toRight from "asset/images/toRight.png";
import {useTranslation} from "../../../contexts/Localization";

interface PrimaryBtnProps {
  text?: string
}
export const PrimaryBtn:React.FunctionComponent<PrimaryBtnProps>
  = ({
       text
  }) =>  {
  const { t } = useTranslation()
  return (
    <StyledMoreBtn>
      <div>{t(text)}</div>
      <StyledIcon>
        <SVG src={toRightSvg} width={20} height={20} />
      </StyledIcon>
    </StyledMoreBtn>
  )
}
export const PrimaryBtnWidthAuto:React.FunctionComponent<PrimaryBtnProps>
  = ({
       text
  }) =>  {
  const { t } = useTranslation()
  return (
    <StyledMoreBtnAuto>
      <div>{t(text)}</div>
      <StyledIcon>
        <SVG src={toRightSvg} width={20} height={20} />
      </StyledIcon>
    </StyledMoreBtnAuto>
  )
}
const StyledIcon = styled.div`
  position: relative;
  & svg {
    fill: ${({theme})=>theme.expandColor.text.text2};
  }
`
const StyledMoreBtn = styled.div`
  width: 100%;
  height: 40px;
  padding: 15px 30px;
  max-width: 370px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid ${({theme})=>theme.expandColor.text.text2};
  color: ${({theme})=>theme.expandColor.text.text2};
  border-radius:  ${({theme})=>theme.expandColor.radius.radius1};
  cursor: pointer;
  font-size: 18px;
  margin-top: 30px;
  
  ${({ theme }) => theme.mediaQueries.sm} {
     height: 50px;
     min-width: 370px;
  }
  
  &:hover {
    background-color: ${({theme})=>theme.expandColor.text.text2};
    color: ${({theme})=>theme.expandColor.text.text3};
    ${StyledIcon} {
      & svg {
        fill: ${({theme})=>theme.expandColor.text.text3};
      }
    }
  }
`
const StyledMoreBtnAuto = styled(StyledMoreBtn)`
  max-width: 100%;
`

export default null

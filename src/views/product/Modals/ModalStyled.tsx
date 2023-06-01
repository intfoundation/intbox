import styled from "styled-components";

export const InfoBtn = styled.div`
    border-radius: ${({theme})=>theme.expandColor.radius.radius1};
    background-color: ${({theme})=>theme.expandColor.bg.bg4};
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({theme})=>theme.expandColor.text.text3};
    height: 60px;
    cursor: pointer;
    margin-top: 15px;
    &:hover {
      background-color: ${({theme})=>theme.expandColor.bg.bg5};
    }
`
export const InfoBtnDisable = styled(InfoBtn)`
  background-color: ${({theme})=>theme.expandColor.bg.bg8};
  &:hover {
    background-color: ${({theme})=>theme.expandColor.bg.bg6};
  }
`
export const InfoBtnText = styled.div`
    font-size: 16px;
    font-weight: 600;
`
export const InfoBtnIcon = styled.img`
    width: 16px;
    height: 16px;
    object-fit: contain;
`

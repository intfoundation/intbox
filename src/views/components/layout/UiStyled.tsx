import React from "react";
import styled from "styled-components";

export const UiItemRow = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0 -15px;
`

export const UiItemBox = styled.div`
    position: relative;
    width: 100%;
    box-sizing: border-box;
    ${({ theme }) => theme.mediaQueries.md} {
        width: 50%;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
        width: 25%;
    }
    display: flex;
`
export const UiItemBoxOld = styled.div`
    position: relative;
    width: 100%;
    box-sizing: border-box;
    ${({ theme }) => theme.mediaQueries.md} {
        width: 50%;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
        width: 33.333%;
    }
    display: flex;
`
export const UiItemBoxContainer = styled.div`
    position: relative;
    margin: 15px;
    box-sizing: border-box;
    border-radius: ${({theme})=>theme.expandColor.radius.radius1};
    flex: 1;
    display: flex;
    flex-direction: column;
`

export const UiLinkA = styled.a`
    color: ${({theme})=>theme.expandColor.text.text2};
    text-decoration: none;
    cursor: pointer;
    &:hover {
      text-decoration: none;
    }
    &:focus {
      outline: none;
    }
`

export const UiTableTdContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 10px;
  font-size: 14px;
`
export const UiSessionTitle = styled.div`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 15px;
    ${({ theme }) => theme.mediaQueries.sm} {
        font-size: 26px;
        margin-bottom: 30px;
    }
`
export const UiSessionEmpty = styled.div`
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 15px;
    text-align: left;
    ${({ theme }) => theme.mediaQueries.sm} {
        font-size: 18px;
        margin-bottom: 30px;
    }
`

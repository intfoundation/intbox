import React from "react";
import styled from "styled-components";
import {Flex} from "@vipswap/uikit";
import Container from "./Container";
import {useTranslation} from "../../contexts/Localization";

const Session = styled.div`
  width: 100%;
  position: relative;
  padding: 20px 0;
  background-color: ${({theme})=>theme.expandColor.bg.bg2};
  border-bottom: 1px solid #ccc;
`
const Left = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: url('/images/contact/bg.png') no-repeat top left;
  background-size: contain;
  
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 242px;
    width: 600px;
  }
`
const Label1 = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
  line-height: 1.4;
  width: 100%;
  padding: 0 15px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 36px;
    padding: 0 30px;
  }
`
const Label2 = styled.div`
  font-size: 14px;
  line-height: 1.4;
  width: 100%;
  padding: 0 15px;
  color: ${({theme})=>theme.expandColor.color.color10};
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 18px;
    padding: 0 30px;
  }
  
`
const Contact = styled.div`
  display: flex;
  align-items: center;
  flex: 2;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 30px;
`
const StyledIcon = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
  // position: absolute;
  // left: -30px;
  // filter: drop-shadow(30px 0px #8f9094);
`
const StyledIconBox = styled.div`
  width: 30px;
  height: 30px;
  margin: 15px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    ${StyledIcon} {
      position: absolute;
      left: -30px;
      filter: drop-shadow(30px 0px ${({theme})=>theme.expandColor.text.text2});
    }
  }
`

// const contactArr = [
//   {id: 1, icon: '/images/contact/7-1.png', url: '', alt: 'email'},
//   {id: 2, icon: '/images/contact/7-2.png', url: '', alt: 'telegram'},
//   {id: 3, icon: '/images/contact/7-3.png', url: '', alt: 'facebook'},
//   {id: 4, icon: '/images/contact/7-4.png', url: '', alt: 'twitter'},
//   {id: 5, icon: '/images/contact/7-5.png', url: '', alt: 'linkedin'},
//   {id: 6, icon: '/images/contact/7-6.png', url: '', alt: 'q'},
//   {id: 7, icon: '/images/contact/7-7.png', url: '', alt: 'reddit'},
//   {id: 8, icon: '/images/contact/7-8.png', url: '', alt: 'medium'},
//   {id: 9, icon: '/images/contact/7-9.png', url: '', alt: 'github'},
// ]

const contactArr = [
  {id: 1, icon: '/images/footer/1.png', url: 'https://discord.gg/T88VYsKU6S', alt: 'discord'},
  {id: 3, icon: '/images/footer/3.png', url: 'https://t.me/INTchain_officialtelegram', alt: 'telegram'},
  {id: 4, icon: '/images/footer/4.png', url: 'https://www.facebook.com/INTchainINT', alt: 'facebook'},
  {id: 5, icon: '/images/footer/5.png', url: 'https://twitter.com/INTCHAIN', alt: 'twitter'},
  {id: 6, icon: '/images/footer/6.png', url: 'https://www.reddit.com/r/INT_Chain/', alt: 'reddit'},
  {id: 8, icon: '/images/footer/8.png', url: 'https://medium.com/int-chain', alt: 'medium'},
  {id: 14, icon: '/images/footer/14.png', url: 'mailto:int@intchain.io', alt: 'email'},
]

const Footer = ()=>{
  const { t } = useTranslation()
  return (
    <Session>
      <Container>
        <Flex flexWrap="wrap" alignItems="center">
          <Left>
            <Label1>{t('footer-label1')}</Label1>
            <Label2>{t('footer-label2')}</Label2>
          </Left>
          <Contact>
            { contactArr.map((item)=>{
              return (
                <a href={item.url} rel="noreferrer" target="_blank"  key={`cicon${item.id}`}>
                  <StyledIconBox>
                    <StyledIcon src={item.icon} alt={item.alt}/>
                  </StyledIconBox>
                </a>
              )
            })}
          </Contact>
        </Flex>
      </Container>
    </Session>
  )
}

export default Footer

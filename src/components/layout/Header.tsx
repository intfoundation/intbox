import React, {useState} from 'react'
import {useWeb3React} from "@web3-react/core";
import styled from 'styled-components'
import { useMatchBreakpoints } from '@vipswap/uikit'
import SVG from "react-inlinesvg";
import {Link,useLocation} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import DehazeIcon from '@material-ui/icons/Dehaze';

import { useTranslation } from '../../contexts/Localization'
import Wallet from '../Wallet'
import LangSelector from "./LangSelector";
import {languageList} from "../../config/localization/languages";

const useStyles = makeStyles({
  list: {
    width: 250,

  },
  fullList: {
    "& .MuiPaper-root.MuiDrawer-paperAnchorLeft": {
      'background-color': '#203043',
      'color': '#fff',
      'padding': '15px 0',
    }
  },
});

const Header = () => {
  const classes = useStyles();
  const { isXl } = useMatchBreakpoints();
  const isMobile = isXl === false;
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const location = useLocation();
  const [showDrawer,setShowDrawer] = useState(false)
  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setShowDrawer(open);
  };
  const { currentLanguage, setLanguage } = useTranslation()
  return (
    <FixBox>
      <FixContainer>
        <ContactsRow>
          <a href="/" target="_self" rel="noreferrer">
            <ContactItem>
              <img src="/logo-v3-2.png" alt=""/>
            </ContactItem>
          </a>
        </ContactsRow>
        <ContactsRowM>
          <MenuBtn onClick={()=>setShowDrawer(true)}>
            <DehazeIcon/>
          </MenuBtn>
          <a href="/" target="_self" rel="noreferrer">
            <ContactItem>
              <img src="/logo-v3-1.png" alt=""/>
            </ContactItem>
          </a>
        </ContactsRowM>

        <SwipeableDrawer
          anchor="left"
          open={showDrawer}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          className={classes.fullList}
        >
          <MenuMobile
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <ContactItem>
              <img src="/logo-v3-2.png" alt=""/>
            </ContactItem>
            <Link to="/">
              <ContactItem
                className={location.pathname==='/'?'active':''}
              >
                {t('Home')}
              </ContactItem>
            </Link>
            <Link to="/nfts">
              <ContactItem
                className={location.pathname==='/nfts'?'active':''}
              >
                {t('Market')}
              </ContactItem>
            </Link>
            <Link to="/user/my">
              <ContactItem
                className={location.pathname==='/user/my'?'active':''}
              >
                {t('My')}
              </ContactItem>
            </Link>
          </MenuMobile>
        </SwipeableDrawer>

        <BtnRow>
          <Link to="/">
            <ContactItem
              className={location.pathname==='/'?'active':''}
            >
              {t('Home')}
            </ContactItem>
          </Link>
          <Link to="/nfts">
            <ContactItem
              className={location.pathname==='/nfts'?'active':''}
            >
              {t('Market')}
            </ContactItem>
          </Link>
          <Link to="/user/my">
            <ContactItem
              className={location.pathname==='/user/my'?'active':''}
            >
              {t('My')}
            </ContactItem>
          </Link>
          <Wallet />
          <LangBox>
            <LangSelector currentLang={currentLanguage.code} langs={languageList} setLang={setLanguage} isMobile={isMobile}/>
          </LangBox>
        </BtnRow>
        <BtnRowM>
          <Wallet />
        </BtnRowM>
      </FixContainer>
    </FixBox>
  )
}

const FixBox = styled.div`
  
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: ${({theme})=> theme.expandColor.color.white};
  ${({ theme }) => theme.mediaQueries.sm} {
      height: 80px;
  }
`
const FixContainer = styled.div`
  margin: auto;
  max-width: 1200px;
  width: 100%;
  box-sizing:  border-box;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ContactsRow = styled.div`
  display: none;
  ${({ theme }) => theme.mediaQueries.sm} {
      display: flex;
  }
`
const ContactItem = styled.div`
  color: ${({theme})=>theme.expandColor.color.black};
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
  & svg {
    fill: ${({theme})=>theme.expandColor.color.color2};
  }
  &:hover {
    svg {
      fill: ${({theme})=>theme.expandColor.color.active};
    }
    color: ${({theme})=>theme.expandColor.color.active};
  }
  ${({ theme }) => theme.mediaQueries.sm} {
      padding: 10px;
      height: 80px;
      min-width: 80px;
      & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
  }
  &.active {
    color: ${({theme})=>theme.expandColor.color.active};
  }
`
const BtnRow = styled.div`
  justify-content: flex-end;
  align-items: center;
  display: none;
  ${({ theme }) => theme.mediaQueries.sm} {
      display: flex;
  }
`
const BtnRowM = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.sm} {
      display: none;
  }
`
const MenuMobile = styled.div`
  display: flex;
  flex-direction: column;
`
const ContactsRowM = styled.div`
  display: flex;
  ${({ theme }) => theme.mediaQueries.sm} {
      display: none;
  }
`
const MenuBtn = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  & svg {
    fill: ${({theme})=>theme.expandColor.color.color2};
  }
`

const LangBox = styled.div`
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`
export default Header

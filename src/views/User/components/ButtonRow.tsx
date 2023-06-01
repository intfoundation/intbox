import React from 'react'
import styled from 'styled-components'
import {Link, useParams,useRouteMatch} from "react-router-dom";
import { useTranslation } from 'contexts/Localization'
import Container from "components/layout/Container";

interface props {
  address: string,
  type?: string,
}
const ButtonRow: React.FC<props> = (props) => {
  const { t } = useTranslation()
  const { address,type='COLLECT' } = props
  const { url } = useRouteMatch()

  return (
    <Container>
      <StyledRow>
        <TabBar>
          <Link to={`${url}?type=COLLECT`}>
            <TabBtn className={type==='COLLECT'?'active':''}>collect</TabBtn>
          </Link>
          <Link to={`${url}?type=ONSALE`}>
            <TabBtn className={type==='ONSALE'?'active':''}>on sale</TabBtn>
          </Link>
          <Link to={`${url}?type=BULKSALE`}>
            <TabBtn className={type==='BULKSALE'?'active':''}>bulk sale</TabBtn>
          </Link>
        </TabBar>

      </StyledRow>
    </Container>
  )
}

const StyledRow = styled.div`
  display: flex;
  justify-content: between-space;
  margin-bottom: 15px;
`
const TabBar = styled.div`
  position: relative;
  display: flex;
`
const TabBtn = styled.div`
  padding: 10px 0;
  margin-right: 20px;
  color: ${({theme})=>theme.expandColor.text.black};
  &.active {
    border-bottom: 1px solid ${({theme})=>theme.expandColor.text.text2};
    color: ${({theme})=>theme.expandColor.text.text2};
  }
`

export default ButtonRow

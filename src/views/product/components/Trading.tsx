import React from "react";
import styled from "styled-components";
import {RowType} from "@vipswap/uikit";

import {useTranslation} from "../../../contexts/Localization";
import useGetNftTrading from "../hooks/useGetNftTrading";
import {TradingRowProps} from "./trading/TradingRow";
import {DesktopColumnSchema} from "./trading/types";
import TradingTable from "./trading/TradingTable";
import {NftConfig} from "../../../config/constants/types";
import {UiSessionEmpty, UiSessionTitle} from "../../components/layout/UiStyled";
import Circular from "../../components/layout/Circular";

interface props {
  curNft: NftConfig
}
const Trading:React.FunctionComponent<props> = ({curNft}) => {
  const { t } = useTranslation()
  const tradingData = useGetNftTrading(curNft)

  const rowData = tradingData && tradingData.map((item,i)=>{
    const row:TradingRowProps = {
      tokenid: {nft: curNft},
      event: {event: item.event},
      price: {price: item.price, quoteToken: item.quoteToken},
      from: {address: item.from},
      to: {address: item.to},
      date: {date: item.date},
      detail: {tx: item.tx},
    }
    return row
  })
  const renderContent = (): JSX.Element => {
    if(rowData.length){
      const columns = DesktopColumnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a: RowType<TradingRowProps>, b: RowType<TradingRowProps>) => {
          switch (column.name) {
            case 'tokenid':
              return b.original.tokenid.nft.tokenId - a.original.tokenid.nft.tokenId
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))
      return <TradingTable data={rowData} columns={columns} dataReady={false} />
    }
    return (<UiSessionEmpty>{t('No Data')}</UiSessionEmpty>)
  }
  return  curNft && rowData ?(
    <Container>
      <UiSessionTitle>{t('Trading')}</UiSessionTitle>
      {renderContent()}
    </Container>
  ): (
    <Container>
      <UiSessionTitle>{t('Trading')}</UiSessionTitle>
      <Circular/>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 30px 15px;
  max-width: 1200px;
  margin: 30px auto;
`

export default Trading

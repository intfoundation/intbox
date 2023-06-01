import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useMatchBreakpoints } from '@vipswap/uikit'
import { useTranslation } from 'contexts/Localization'

import NftNo, { NftNoProps } from 'views/components/table/NftNo'
import Event , { EventProps } from 'views/components/table/Event'
import Price, { PriceProps } from 'views/components/table/Price'
import Address, { AddressProps } from 'views/components/table/Address'
import Date, { DateProps } from 'views/components/table/Date'
import TradingDetail, { TradingDetailProps } from 'views/components/table/TradingDetail'
import {DesktopColumnSchema} from "./types";

export interface TradingRowProps {
  tokenid: NftNoProps
  event: EventProps
  price: PriceProps
  from: AddressProps
  to: AddressProps
  date: DateProps
  detail: TradingDetailProps
}

interface RowPropsWithLoading extends TradingRowProps {
  nftDataReady: boolean
}

const cells = {
  tokenid: NftNo,
  event: Event,
  price: Price,
  from: Address,
  to: Address,
  date: Date,
  detail: TradingDetail,
}

const CellInner = styled.div`
  padding: 24px 0px;
  display: flex;
  width: 100%;
  align-items: center;
`

const StyledTr = styled.tr`
  // cursor: pointer;
  border-bottom: 2px solid ${({ theme }) => theme.colors.cardBorder};
`

const MobileCell = styled.td`
  padding: 15px 0;
`

const TradingRow: React.FunctionComponent<RowPropsWithLoading> = (props) => {
  const { t } = useTranslation()

  const { isXl, isXs } = useMatchBreakpoints()
  const isMobile = !isXl

  const tableSchema = DesktopColumnSchema
  const columnNames = tableSchema.map((column) => column.name)

  const handleRenderRow = () => {
    return (
      <StyledTr>
        {Object.keys(props).map((key) => {
          const columnIndex = columnNames.indexOf(key)
          if (columnIndex === -1) {
            return null
          }
          return (
            <td key={key}>
              <CellInner>
                {React.createElement(cells[key], { ...props[key] })}
              </CellInner>
            </td>
          )
        })}
      </StyledTr>
    )
  }

  return (
    <>
      {handleRenderRow()}
    </>
  )
}

export default TradingRow

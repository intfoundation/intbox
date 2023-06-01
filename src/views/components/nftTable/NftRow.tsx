import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useMatchBreakpoints } from '@vipswap/uikit'
import { useTranslation } from 'contexts/Localization'

import No, { NoProps } from './No'
import Name, { NameProps } from './Name'
import Id, { IdProps } from './Id'
import Owner, { OwnerProps } from './Owner'
import Status, { StatusProps } from './Status'
import Price, { PriceProps } from './Price'
import DetailBtn, { DetailBtnProps } from './DetailBtn'
import {DesktopColumnSchema} from "./types";

export interface RowProps {
  no: NoProps
  name: NameProps
  id: IdProps
  owner: OwnerProps
  status: StatusProps
  price: PriceProps
  detailBtn: DetailBtnProps
}

interface RowPropsWithLoading extends RowProps {
  nftDataReady: boolean
}

const cells = {
  no: No,
  name: Name,
  id: Id,
  owner: Owner,
  status: Status,
  price: Price,
  detailBtn: DetailBtn,
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

const NftRow: React.FunctionComponent<RowPropsWithLoading> = (props) => {
  const { t } = useTranslation()

  const { isXl, isXs } = useMatchBreakpoints()

  const isMobile = !isXl

  // const tableSchema = isMobile ? MobileColumnSchema : DesktopColumnSchema
  const tableSchema = DesktopColumnSchema
  const columnNames = tableSchema.map((column) => column.name)

  const handleRenderRow = () => {
    if (!isXs) {
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
      <StyledTr>
        <td>
          <MobileCell>
            <No {...props.no} />
          </MobileCell>
        </td>
        <td>
          <MobileCell>
            <Name {...props.name}/>
          </MobileCell>
        </td>
        <td>
          <MobileCell>
            <DetailBtn {...props.detailBtn}/>
          </MobileCell>
        </td>
      </StyledTr>
    )
  }

  return (
    <>
      {handleRenderRow()}
    </>
  )
}

export default NftRow

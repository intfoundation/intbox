import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {ColumnType, useMatchBreakpoints} from '@vipswap/uikit'
import { useTranslation } from 'contexts/Localization'

import {DesktopColumnSchema} from "./types";

const CellInner = styled.div`
  padding: 24px 10px;
  display: flex;
  width: 100%;
  align-items: center;
`

const StyledTr = styled.tr`
  // cursor: pointer;
  border-bottom: 2px solid ${({ theme }) => theme.colors.cardBorder};
`

const MobileCell = styled.td`
  padding: 15px 10px;
`

const NftHeader: React.FunctionComponent = () => {
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
          {tableSchema.map((column) => {
            return (
              <td key={`nftTHKey-${column.name}`}>
                <CellInner>
                  {column.name}
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
            {t('no')}
          </MobileCell>
        </td>
        <td>
          <MobileCell>
            {t('name')}
          </MobileCell>
        </td>
        <td>
          <MobileCell>
            {t('detailBtn')}
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

export default NftHeader

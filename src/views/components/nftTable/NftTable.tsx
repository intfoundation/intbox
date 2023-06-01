import React, { useRef } from 'react'
import styled from 'styled-components'
import { useTable, Button, ChevronUpIcon, ColumnType } from '@vipswap/uikit'
import { useTranslation } from 'contexts/Localization'

import NftRow, { RowProps } from './NftRow'
import NftHeader from "./NftHeader";

export interface NftTableProps {
  data: RowProps[]
  columns: ColumnType<RowProps>[]
  nftDataReady: boolean
  sortColumn?: string
}

const Container = styled.div`
  filter: ${({ theme }) => theme.card.dropShadow};
  width: 100%;
  background: ${({ theme }) => theme.card.background};
  border-radius: 16px;
  margin: 16px 0px;
`

const TableWrapper = styled.div`
  overflow: visible;

  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledTable = styled.table`
  border-collapse: collapse;
  font-size: 14px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`

const TableBody = styled.tbody`
  & tr {
    td {
      font-size: 16px;
      vertical-align: middle;
    }
  }
`

const TableContainer = styled.div`
  position: relative;
  padding: 15px 30px;
`

const ScrollButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
`

const NftTable: React.FC<NftTableProps> = (props) => {
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()
  const { data, columns, nftDataReady } = props

  const { rows } = useTable(columns, data, { sortable: true, sortColumn: 'no' })

  const scrollToTop = (): void => {
    tableWrapperEl.current.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <Container>
      <TableContainer>
        <TableWrapper ref={tableWrapperEl}>
          <StyledTable>
            <NftHeader />
            <TableBody>
              {rows.map((row) => {
                return <NftRow {...row.original} nftDataReady={nftDataReady} key={`table-row-${row.id}`} />
              })}
            </TableBody>
          </StyledTable>
        </TableWrapper>
        <ScrollButtonContainer>
          <Button variant="text" onClick={scrollToTop}>
            {t('To Top')}
            <ChevronUpIcon color="primary" />
          </Button>
        </ScrollButtonContainer>
      </TableContainer>
    </Container>
  )
}

export default NftTable

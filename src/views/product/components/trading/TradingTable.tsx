import React, { useRef } from 'react'
import styled from 'styled-components'
import { useTable, Button, ChevronUpIcon, ColumnType } from '@vipswap/uikit'
import { useTranslation } from 'contexts/Localization'

import TradingRow, { TradingRowProps } from './TradingRow'
import TradingTableHeader from "./TradingTableHeader";

export interface TradingTableProps {
  data: TradingRowProps[]
  columns: ColumnType<TradingRowProps>[]
  dataReady: boolean
  sortColumn?: string
}

const Container = styled.div`
  filter: ${({ theme }) => theme.card.dropShadow};
  width: 100%;
  background: ${({ theme }) => theme.expandColor.color.white};
  border-radius: 6px;
  margin-bottom: 20px;
  zoom: 1;

  ${({ theme }) => theme.mediaQueries.xs} {
    zoom: .5    
  }

  ${({ theme }) => theme.mediaQueries.sm}{
    zoom: .8;
  }  

  ${({ theme }) => theme.mediaQueries.md}{
    zoom: 1;
  } 
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

const TradingTable: React.FC<TradingTableProps> = (props) => {
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()
  const { data, columns, dataReady } = props

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
            <TradingTableHeader />
            <TableBody>
              {rows.map((row) => {
                return <TradingRow {...row.original} nftDataReady={dataReady} key={`table-row-${row.id}`} />
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

export default TradingTable

import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { ArrowLeft, ArrowRight} from '@material-ui/icons'
import { Link, MemoryRouter, Route } from 'react-router-dom'
import PaginationUi from '@material-ui/lab/Pagination'
import PaginationItem from '@material-ui/lab/PaginationItem'
import { makeStyles } from '@material-ui/core'

interface props {
  curPage: number,
  // per 每页显示数量
  per: number,
  // 总数量
  total: number,
  baseUrl: string
  onClickFun?: ()=>void
  urlKey?:string
}
const useStyles = makeStyles({
  ul: {
    '&  > li > .MuiPaginationItem-root': {
      // 'background-color': '#203043',
      // 'border-radius': '0px',
      // 'color': '#fff',
    },
    '&  > li > .MuiPaginationItem-root.MuiPaginationItem-ellipsis': {
      // 'background-color': 'transparent',
      // 'border-radius': '0px',
      // 'color': '#fff',
    },
    '&  > li > .MuiPaginationItem-root.Mui-selected': {
      'background-color': '#4a58bd',
      'color': '#fff',
    },
    '&  > li > .MuiPaginationItem-root svg.MuiPaginationItem-icon ': {
      // 'fill': '#fff',
    },
    '&  > li > .MuiPaginationItem-root.Mui-disabled svg.MuiPaginationItem-icon ': {
      // 'fill': 'rgba(255, 255, 255, 0.87)',
    },
    '& > li:first-child > .MuiPaginationItem-root': {
      // 'background-color': '#203043',
    },
    '& > li:last-child > .MuiPaginationItem-root': {
      // 'background-color': '#203043',
    },
  },
}, { name: 'MuiPagination' });
const Pagination: React.FC<props> = (props) => {
  const { t } = useTranslation()
  const {curPage,total,per,baseUrl,urlKey='?'} = props
  const totalPage = Math.ceil(total/per)
  const classes = useStyles();

  return (
    <StyledRow>

      <PaginationUi
        page={curPage}
        count={totalPage}
        shape="rounded"
        className={classes.ul}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`${baseUrl}${item.page === 1 ? '' : `${urlKey}page=${item.page}`}`}
            {...item}
          />
        )}
      />
    </StyledRow>
  )
}



const StyledRow = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 15px;
  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-end;
  } 
`

const StyledPageItem = styled.div`
  font-size: 14px;
  min-width: 30px;
  padding: 0 5px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  background: ${({theme})=>theme.expandColor.color.color6};
  margin-right: 10px;
  border-radius: 4px;
  &.active {
    background: ${({theme})=>theme.expandColor.color.active};
  }
`
const StyledNext = styled.div`

  & svg {
    width: 30px;
    height: 30px;
    cursor: pointer;
    fill: ${({theme})=>theme.expandColor.color.color5};
  }
  & svg.active{
    fill: ${({theme})=>theme.expandColor.color.active};
  }
`
const StyledPre = styled(StyledNext)`
  margin-right: 10px;
`
export default Pagination

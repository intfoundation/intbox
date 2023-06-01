import {ColumnType} from "@vipswap/uikit";

export type ColumnsDefTypes = {
  id: number
  label: string
  name: string
  translationId: number
  sortable: boolean
}

export const DesktopColumnSchema: ColumnsDefTypes[] = [
  {
    id: 1,
    name: 'tokenid',
    translationId: 999,
    sortable: true,
    label: 'Token ID',
  },
  {
    id: 2,
    name: 'event',
    translationId: 1072,
    sortable: true,
    label: 'Event',
  },
  {
    id: 3,
    name: 'price',
    translationId: 736,
    sortable: true,
    label: 'Price',
  },
  {
    id: 4,
    name: 'from',
    translationId: 999,
    sortable: true,
    label: 'From',
  },
  {
    id: 5,
    name: 'to',
    translationId: 999,
    sortable: true,
    label: 'To',
  },
  {
    id: 6,
    name: 'date',
    translationId: 999,
    sortable: true,
    label: 'Date',
  },
  {
    id: 7,
    name: 'detail',
    translationId: 999,
    sortable: true,
    label: 'Detail',
  },
]


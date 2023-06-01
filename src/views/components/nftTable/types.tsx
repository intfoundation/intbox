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
    name: 'no',
    translationId: 999,
    sortable: true,
    label: 'No',
  },
  {
    id: 2,
    name: 'name',
    translationId: 1072,
    sortable: true,
    label: 'Name',
  },
  {
    id: 3,
    name: 'id',
    translationId: 736,
    sortable: true,
    label: 'Id',
  },
  {
    id: 4,
    name: 'owner',
    translationId: 999,
    sortable: true,
    label: 'Owner',
  },
  {
    id: 5,
    name: 'status',
    translationId: 999,
    sortable: true,
    label: 'Status',
  },
  {
    id: 6,
    name: 'price',
    translationId: 999,
    sortable: true,
    label: 'Price',
  },
  {
    id: 7,
    name: 'detailBtn',
    translationId: 999,
    sortable: true,
    label: 'DetailBtn',
  },
]

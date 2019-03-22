export interface TableBaseFieldInterface {
  code: string;
  type: string;
  headerName: string;
  hiddenInColumnFilter?: boolean;
  sortable?: boolean;
  hideValue?: boolean;
  hideHeader?: boolean;
  width?: string;
  additionalCode?: string;
  groupName?: string;
  style?: {[key: string]: string};
  // valueTransformForCsvCb?: (item: any) => any;
}


export interface PaginationData extends PaginationDataOutput {
  pageSizeOptions: number[];
}

export interface PaginationDataOutput {
  length?: number;
  pageIndex: number;
  pageSize: number;
}

export interface SortValue {
  active: string;
  direction: string;
}

export interface SelectedCellInterface {
  code: string;
  rowIndex: number;
}

export interface TableStateInterface {
  filter?: {[key: string]: string};
  sort?: TableSortInterface;
  pagination?: PaginationDataOutput;
  selectedRow?: SelectedRowInterface;
}

export interface TableSortInterface {
  active: string;
  direction: 'asc' | 'desc';
}

export interface SelectedRowInterface {
  key: string;
  value: string;
}
import {PaginationData, TableBaseFieldInterface} from './base.interface';

export interface TableComponentInterfaces<T> {
  dataSource: T;
  selectedRecords: T;
  itemModel: TableBaseFieldInterface[];
  isLoadDataSuccess: boolean;
  paginationData: PaginationData;

  fetchDataSources(criteria?: any): void;
  reloadDataSources(criteria?: any): void;
}

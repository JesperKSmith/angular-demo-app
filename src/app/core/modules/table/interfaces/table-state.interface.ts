import { TableSortInterface, PaginationDataOutput, SelectedRowInterface } from './base.interface';

export interface TableStateInterface {
  filter?: {[key: string]: string};
  sort?: TableSortInterface;
  pagination?: PaginationDataOutput;
  selectedRow?: SelectedRowInterface;
}
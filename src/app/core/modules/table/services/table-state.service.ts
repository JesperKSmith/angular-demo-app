import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { PaginationDataOutput, SelectedRowInterface, TableStateInterface, TableSortInterface } from '../interfaces/base.interface';


@Injectable()
export class TableStateService {

  private readonly PREFIX_DIVIDER = '__';
  private readonly SORT_COLUMN = 'sort-column';
  private readonly SORT_DIRECTION = 'sort-direction';
  private readonly FILTER = 'filter';
  private readonly PAGE_INDEX = 'page-index';
  private readonly PAGE_SIZE = 'page-size';
  private readonly SELECTED_ROW_KEY = 'selected-row-key';
  private readonly SELECTED_ROW_VALUE = 'selected-row-value';


  constructor(
    private router: Router
  ) { }

  public setSortQueryParams(sort: TableSortInterface, tableCode: string): void {
    const url = this.router.parseUrl(this.router.url);
    const queryParams = {
      [`${tableCode}${this.PREFIX_DIVIDER}${this.SORT_COLUMN}`]: sort.active,
      [`${tableCode}${this.PREFIX_DIVIDER}${this.SORT_DIRECTION}`]: sort.direction
    };

    url.queryParams = {...url.queryParams, ...queryParams};

    this.router.navigateByUrl(url);
  }

  public setFilterQueryParams(filter: {[key: string]: string}, tableCode: string): void {
    const url = this.router.parseUrl(this.router.url);
    const filterObj = {};
    delete url.queryParams[`${tableCode}${this.PREFIX_DIVIDER}${this.FILTER}`];

    Object.keys(filter)
      .filter(item => {
        return filter[item];
      })
      .forEach(item => {
        filterObj[item] = filter[item];
      });

    if (Object.keys(filterObj).length > 0) {

      const queryParams = {
        [`${tableCode}${this.PREFIX_DIVIDER}${this.FILTER}`]: JSON.stringify(filterObj)
      };

      url.queryParams = {...url.queryParams, ...queryParams};
    }

    this.router.navigateByUrl(url);
  }


  public setPaginationQueryParams(paginationData: PaginationDataOutput, tableCode: string): void {
    const url = this.router.parseUrl(this.router.url);
    const queryParams = {
      [`${tableCode}${this.PREFIX_DIVIDER}${this.PAGE_INDEX}`]: paginationData.pageIndex.toString(),
      [`${tableCode}${this.PREFIX_DIVIDER}${this.PAGE_SIZE}`]: paginationData.pageSize.toString()
    };

    url.queryParams = {...url.queryParams, ...queryParams};

    this.router.navigateByUrl(url);
  }

  public setSelectedRowQueryParams(selectedRow: SelectedRowInterface, tableCode: string): void {
    const url = this.router.parseUrl(this.router.url);

    const queryParams = {
      [`${tableCode}${this.PREFIX_DIVIDER}${this.SELECTED_ROW_KEY}`]: selectedRow.key,
      [`${tableCode}${this.PREFIX_DIVIDER}${this.SELECTED_ROW_VALUE}`]: selectedRow.value
    };

    url.queryParams = {...url.queryParams, ...queryParams};

    this.router.navigateByUrl(url);
  }

  public getState(tableCode: string): TableStateInterface {
    const tableState = {} as TableStateInterface;
    const queryParams = this.router.parseUrl(this.router.url).queryParams;
    const currentTableQueryParams = {};

    Object.keys(queryParams)
      .filter(key => {
        return key.includes(tableCode);
      })
      .forEach(key => {
        const currentKey = key.split(this.PREFIX_DIVIDER)[1];
        currentTableQueryParams[currentKey] = queryParams[key];
      });

    if (currentTableQueryParams[this.SORT_COLUMN]) {
      tableState.sort = {
        active: currentTableQueryParams[this.SORT_COLUMN],
        direction: currentTableQueryParams[this.SORT_DIRECTION]
      };
    }

    if (currentTableQueryParams[this.PAGE_INDEX]) {
      tableState.pagination = {
        pageIndex: parseInt(currentTableQueryParams[this.PAGE_INDEX], 10),
        pageSize: parseInt(currentTableQueryParams[this.PAGE_SIZE], 10)
      };
    }

    if (currentTableQueryParams[this.FILTER]) {
      tableState.filter = JSON.parse(currentTableQueryParams[this.FILTER]);
    }

    if (currentTableQueryParams[this.SELECTED_ROW_KEY]) {
      tableState.selectedRow = {
        key: currentTableQueryParams[this.SELECTED_ROW_KEY],
        value: currentTableQueryParams[this.SELECTED_ROW_VALUE]
      };
    }

    return tableState;
  }

  public resetQueryParams(tableCode: string): void {
    const url = this.router.parseUrl(this.router.url);

    delete url.queryParams[`${tableCode}${this.PREFIX_DIVIDER}${this.FILTER}`];
    delete url.queryParams[`${tableCode}${this.PREFIX_DIVIDER}${this.SELECTED_ROW_VALUE}`];
    delete url.queryParams[`${tableCode}${this.PREFIX_DIVIDER}${this.SELECTED_ROW_KEY}`];
    delete url.queryParams[`${tableCode}${this.PREFIX_DIVIDER}${this.SORT_DIRECTION}`];
    delete url.queryParams[`${tableCode}${this.PREFIX_DIVIDER}${this.SORT_COLUMN}`];
    delete url.queryParams[`${tableCode}${this.PREFIX_DIVIDER}${this.PAGE_SIZE}`];
    delete url.queryParams[`${tableCode}${this.PREFIX_DIVIDER}${this.PAGE_INDEX}`];

    this.router.navigateByUrl(url);
  }
}

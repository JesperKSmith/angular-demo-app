import { Component, OnInit } from '@angular/core';
import { TableProductInterface } from 'src/app/core/interfaces/table-product.interface';
import { TableBaseFieldInterface } from 'src/app/modules/material-table/base.interface';
import { TableStateService } from 'src/app/modules/material-table/services/table-state.service';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss']
})
export class TablePageComponent implements OnInit {

  public itemModel: TableBaseFieldInterface[];
  public itemData: TableProductInterface[];
  private snapshotTableArray: TableProductInterface[];

  constructor(private stateService: TableStateService) { }

  ngOnInit() {
    this.itemModel = this.getTableItemModel();
    this.itemData = this.getTableData();
    this.snapshotTableArray = [...this.itemData];
  }

  /**
   * @name removeFromTable
   * @description Calls the "removeItemFromArray()"" method on the @TableStateService
   * @param {TableProductInterface} item - The item we want to remove from the table
   * @return @type {T} - Table after item has been removed
   */
  public removeFromTable(item: TableProductInterface): void {
    this.itemData = this.stateService.removeItemFromArray(item, this.itemData);
  }

  /**
   * @name restoreTable
   * @description restores table to it's original state
   */
  public restoreTable(): void {
    this.itemData = this.snapshotTableArray;
  }
  
  // WORKAROUND
  // Data methods - should be exposed from a service and collected through observable
  private getTableData(): TableProductInterface[] {
    return [
      { name: 'Apple', price: 5 },
      { name: 'Banana', price: 6 },
      { name: 'Grape', price: 7 },
      { name: 'Orange', price: 8 },
    ]
  }

  private getTableItemModel(): TableBaseFieldInterface[] {
    return [
      {
        code: 'name',
        type: 'string',
        headerName: 'product name',
        sortable: true
      },
      {
        code: 'price',
        type: 'money',
        headerName: 'price',
        sortable: true
      },
      {
        code: 'delete',
        type: 'string',
        headerName: 'delete',
        sortable: false,
        style: {
          'justify-content': 'flex-end'
        }
      },
    ]
  } 

}

import { Component, OnInit } from '@angular/core';
import { TableProductInterface } from 'src/app/core/interfaces/table-product.interface';
import { TableBaseFieldInterface } from 'src/app/modules/material-table/base.interface';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss']
})
export class TablePageComponent implements OnInit {

  public itemModel: TableBaseFieldInterface[];
  public itemData: TableProductInterface[];
  private snapshotTableArray: TableProductInterface[];

  constructor() { }

  ngOnInit() {
    this.itemModel = this.getTableItemModel();
    this.itemData = this.getTableData();
    this.snapshotTableArray = [...this.itemData];
  }

  public removeFromTable(item: TableProductInterface): void {
    this.itemData = this.itemData.filter(entry => entry !== item);
    console.log('this.tableArray is now', this.itemData);
  }

  public restoreTable(): void {
    this.itemData = this.snapshotTableArray;
  }
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

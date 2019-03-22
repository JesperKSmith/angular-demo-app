import { Component, OnInit } from '@angular/core';
import { TableBaseFieldInterface } from 'src/app/core/modules/table/interfaces/base.interface';
import { TableProductInterface } from 'src/app/core/interfaces/table-product.interface';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.sass']
})
export class TablePageComponent implements OnInit {

  public itemModel: TableBaseFieldInterface[];
  public tableArray: TableProductInterface[];

  constructor() { }

  ngOnInit() {
    this.itemModel = this.getTableItemModel();
    this.tableArray = this.getTableData();
  }

  public removeFromTable(item: TableProductInterface): void {
    console.log('should remove', item);
    this.tableArray = this.tableArray.filter(entry => entry !== item);
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
        type: 'string',
        headerName: 'price',
        sortable: true
      },
      {
        code: 'delete',
        type: 'string',
        headerName: 'delete',
        style: {
          'justify-content': 'flex-end'
        }
      },
    ]
  } 

}

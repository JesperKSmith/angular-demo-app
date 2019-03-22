import { Component, OnInit, ViewChild, Input, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {FormControl} from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { TableStateService } from './services/table-state.service';
import { TableBaseFieldInterface } from 'src/app/core/modules/table/interfaces/base.interface';
import { TableProductInterface } from 'src/app/core/interfaces/table-product.interface';

@Component({
  selector: 'material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [
    trigger('detailExpand', [
      state('void', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('*', style({height: '*', visibility: 'visible'})),
      transition('void <=> *', animate('300ms ease-in-out')),
    ]),
  ],
})
export class MaterialTableComponent implements OnInit {

  @Input() tableModel: TableBaseFieldInterface[];
  @Input() tableData: TableProductInterface[];
  @Input() itemsPerPageOptions: number[];
  @Input() filtering: boolean = false;
  @Input() pagination: number;
  @Input() allowExpansion: boolean = false;

  // Public variables
  public displayedColumns: string[];
  public dataSource = new MatTableDataSource();

  

  // ViewChildren
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private stateService: TableStateService) { }

  ngOnInit() {
    console.log('mat table receives', [this.tableModel, this.tableData])
    // this.dataSource = this.stateService.generateUsers();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.dataSource.data = this.tableData;
    this.displayedColumns = this.stateService.extractDisplayedColumns(this.tableModel, this.allowExpansion);
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator) { this.dataSource.paginator.firstPage(); }
  }

  public getStyle(cell: TableBaseFieldInterface): {[k: string]: string} {
    let style = {};
    if(cell.width) { style['flex-basis'] = cell.width; }
    if(cell.style) { style = {...style, ...cell.style} }
    return style;
  }

  private extractTableModel(): any {}
  private extractTableData(): any {}

}

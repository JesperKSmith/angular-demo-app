import { Component, OnInit, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TableStateService } from './services/table-state.service';
import { TableProductInterface } from 'src/app/core/interfaces/table-product.interface';
import { TableBaseFieldInterface } from './base.interface';

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
  @Input() componentRefs: object = {};
  @Input() componentHeaderRefs: object = {};

  // Public variables
  public displayedColumns: string[];
  public dataSource = new MatTableDataSource();  

  // ViewChildren
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private stateService: TableStateService) { }

  ngOnInit() {
    this.setupDataSource(this.tableData, this.paginator, this.sort);    
    this.displayedColumns = this.stateService.extractDisplayedColumns(this.tableModel, this.allowExpansion);
  }

  ngOnChanges() {
    this.setupDataSource(this.tableData, this.paginator, this.sort);
  }

 /**
   * @name applyFilter
   * @description Sets the @filter property on the @MatTableDataSource object to the string value of the @param filterValue  
   * @param {string} filterValue - the string value desired to be applied to the @dataSource filter property
*/
  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator) { this.dataSource.paginator.firstPage(); }
  }

  /**
   * @name getStyle
   * @description collects styling properties based on the given @param columnModel
   * @param {TableBaseFieldInterface} columnModel - The column model that holds styling definitions
   * @returns @WIP
   * @WIP - Needs interface for return type
  */
  public getStyle(columnModel: TableBaseFieldInterface): {[k: string]: string} {
    let style = {};
    if(columnModel.width) { style['flex-basis'] = columnModel.width; }
    if(columnModel.style) { style = {...style, ...columnModel.style} }
    return style;
  }

  /**
   * @name setupDataSource
   * @description Initializes the needed properties on the @MatTableDataSource object
   * @param {TableProductInterface[]} tableData - data to be populated in the table
   * @param {MatPaginator} paginator - The paginator @ViewChild 
   * @param {MatSort} sort - The sort @ViewChild
  */
  private setupDataSource(tableData: TableProductInterface[], paginator: MatPaginator, sort: MatSort): void {
    this.dataSource.data = this.tableData;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

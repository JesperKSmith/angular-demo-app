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
    this.setupDataSource();    
    this.displayedColumns = this.stateService.extractDisplayedColumns(this.tableModel, this.allowExpansion);
  }

  ngOnChanges() {
    this.setupDataSource();
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

  private setupDataSource(): void {
    this.dataSource.data = this.tableData;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

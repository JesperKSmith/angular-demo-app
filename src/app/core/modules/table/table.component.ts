import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { SimpleChanges } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, Sort} from '@angular/material';
import {FormControl} from '@angular/forms';
import { isEqual } from 'lodash';
import { Observable, Subscription, Subject } from 'rxjs';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

// import { combineLatest } from 'rxjs';
// import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';

import { CdkExpansionDirective } from './directives/cdk-expansion.directive';
// import { FilterService } from './services/filter.service';
// import { ViewService } from './services/view.service';
import {
  PaginationData,
  PaginationDataOutput,
  SelectedRowInterface,
  TableBaseFieldInterface, 
  TableSortInterface,
  SelectedCellInterface, 
  SortValue,
  TableStateInterface
} from './interfaces/base.interface';
import { MomentService } from '../../services/moment.service';
import { TableStateService } from './services/table-state.service';
import { ViewService } from './services/view.service';
import { FilterService } from './services/filter.service';
// import {Subject} from 'rxjs/Subject';

// import {UserService} from '@core/services/user/user.service';
// import {TableStateService} from '@shared/modules/table-component/src/services/table-state.service';
// import {ExportCsv} from '@shared/modules/table-component/src/services/csv-export-file';
// import {TranslateService} from '@ngx-translate/core';
// import {WtMomentService} from '@core/services/wt-moment.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [
    trigger('detailExpand', [
      state('void', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('*', style({height: '*', visibility: 'visible'})),
      transition('void <=> *', animate('300ms ease-in-out')),
    ]),
  ],
  // providers: [WtMomentService]
})
export class TableComponent implements AfterViewInit, OnInit, OnChanges, OnDestroy {
  @Input() public itemModel: TableBaseFieldInterface[];
  @Input() public tableCode: string;
  @Input() public itemsCollection: any[];
  @Input() public paginationData: PaginationData;
  @Input() public allowMultiSelect: boolean;
  @Input() public componentsRefs: object = {};
  @Input() public componentsHeaderRefs: object = {};
  @Input() public serverSorting: boolean;
  @Input() public serverFiltering: boolean;
  @Input() public rightDirection: boolean;
  @Input() public clientPagination: boolean;
  @Input() public allowExpansion: boolean;
  @Input() public maxHeight?: number;
  @Input() public minHeight?: number;
  @Input() public disabled?: boolean;
  @Input() public cursorPointer?: boolean = false;
  @Input() public isSelectable?: boolean = true;
  @Input() public allowKeyboardNavigation?: boolean;
  @Input() public rowColorMarker: (item: any) => 'act' | 'ina' | 'exp';
  @Input() public rowColorMarkerProp: any;
  @Input() public allowMultiFilter: boolean = false;
  @Input() public rowLinkConstructor: (item: any) => string;
  @Input() public preSelectedState?: TableStateInterface;
  @Input() public preSelectedRowKey?: string;
  @Input() public allowDownload: boolean = false;
  @Input() public doNotShowSettingsWheel: boolean = false;

  @Output() public sortChangeEvent: EventEmitter<SortValue> = new EventEmitter<SortValue>();
  @Output() public filterChangeEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() public paginationChangeEvent: EventEmitter<PaginationDataOutput> = new EventEmitter<PaginationDataOutput>();
  @Output() public rowClickEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() public rowDoubleClickEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() public rowSelectEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() public rowExpandEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() public afterViewInitEvent: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild('columnSelect') public columnSelect;


  public initialSelection = [];
  public selection;
  public itemViewModel;
  public realDataColumns: string[];
  public displayedColumns: string[];
  public dataSource = new MatTableDataSource();
  public columnsControls: object = {};
  public columnsFilterDd: object = {};
  public columnsSubscribtions: Array<Observable<any>> = [];
  public selectedCell: SelectedCellInterface;
  public isCellFocused: boolean;
  public isColumnHidden: boolean = true;
  public pressKey: string;
  public groupColumns: Array<{key: string, value: TableBaseFieldInterface[]}>;
  public toppingList: TableBaseFieldInterface[];
  public toppings = new FormControl();

  private openedRow: CdkExpansionDirective;
  private filterSubscription: Subscription;
  private destroyStream$ = new Subject();
  private maxColIndex: number;
  private maxRowIndex: number;
  private selectedFilter: {[key: string]: string} = {};
  private columnsStateSufix = 'columns.sufix-31-12-2018.';

  private readonly DEFAULT_SELECTED_ROW_KEY = 'id';

  constructor(
    private filterService: FilterService,
    private viewService: ViewService,
    // private userService: UserService,
    private tableStateService: TableStateService,
    private wtMomentService: MomentService
  ) {
  }

  public ngOnInit(): void {
    // this.preSelectedRowKey = this.preSelectedRowKey || this.DEFAULT_SELECTED_ROW_KEY;
    // this.refreshItemModelView();
    // this.initErrors();
    this.behaivorInit(true);
    this.dataInit();
    console.log('table receives model', this.itemModel);
    console.log('table receives collection', this.itemsCollection);
    // if (this.allowKeyboardNavigation) {
    //   this.initKeyboardListener();
    //   this.initSelectedCell();
    // }

    // if (this.preSelectedState) {
    //   this.setPreSelectedState();
    // }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const needInit = Object.keys(changes).some(
      key => (changes[key].firstChange && changes[key].previousValue !== undefined)
        || (!changes[key].firstChange));

    if (needInit) {
      // if (changes.itemModel && changes.itemModel.currentValue) {
      //   this.refreshItemModelView();
      // }
      this.selectionColumnChange({value: this.toppings.value});
    }
    if (this.allowKeyboardNavigation) {
      this.maxColIndex = this.itemModel.length - 1;
      this.maxRowIndex = this.itemsCollection.length - 1;
    }

    // if (changes && (changes.preSelectedState || changes.preSelectedRowKey || changes.itemsCollection)
    //   && this.preSelectedState && this.preSelectedState.selectedRow) {
    //   this.preSelectTableRow(this.preSelectedState.selectedRow);
    // }
  }

  public ngOnDestroy(): void {
    this.destroyStream$.next();
    this.destroyStream$.complete();
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }

  // public refreshItemModelView(): void {
  //   const tableValue = this.userService.getTables(this.tableCode);

  //   const localStorageItemModel = tableValue && tableValue['columns'] && JSON.parse(tableValue['columns']);
  //   this.toppings.setValue([...this.itemModel]
  //     .filter(e => localStorageItemModel ? localStorageItemModel.some(ee => isEqual(ee, e)) : true)
  //     .filter(e => !e.hiddenInColumnFilter));
  //   this.toppingList = [...this.itemModel];
  // }

  public selectionColumnChange(e: any): void {
    this.itemModel = e.value;
    // this.behaivorInit();
    this.dataInit();
  }

  public behaivorInit(firstInit?: boolean): void {
    const itemModel = firstInit
      ? (this.toppings.value || this.itemModel.filter(e => !e.hiddenInColumnFilter))
      : this.itemModel;

    this.groupColumns = this.getGroupColumns(itemModel, 'groupName');
    this.realDataColumns = itemModel && itemModel.map(field => field.code);
    this.columnsFilterDd = this.viewService.defineColumnsFilterDd(itemModel);
    this.initColumnsControls();
    this.displayedColumns = this.viewService.getDisplayedColumns(this.realDataColumns, this.allowMultiSelect, this.allowExpansion);
    this.dataSource.filterPredicate = this.filterService.filterPredicate(this.realDataColumns);
  }

  public initColumnsControls(): void {
    this.columnsControls = Object.keys(this.columnsControls).length > 0
      ? this.columnsControls
      : this.filterService.defineColumnsControls(this.itemModel, this.columnsSubscribtions);
  }

  public dataInit(): void {
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
      return (typeof data[sortHeaderId] === 'string')
        ? data[sortHeaderId].toLocaleLowerCase()
        : data[sortHeaderId];
    };

    this.dataSource.data = this.itemsCollection;
    this.selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);

    // cleanup old subscription
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }

    // this.filterSubscription = this.filterService.subscribeFieldsInputsFiltering(
    //   filter => {

    //     Object.keys(filter).forEach(key => {
    //       if (this.allowMultiFilter) {
    //         return (!filter[key] && filter[key] !== '') && delete filter[key];
    //       } else {
    //         filter[key] = filter[key] || '';
    //       }
    //     });

    //     this.selectedFilter = this.allowMultiFilter ? {...this.selectedFilter, ...filter} : filter;

    //     this.filterChangeEvent.emit(this.selectedFilter);
    //     if (this.preSelectedState) {
    //       this.tableStateService.setFilterQueryParams(this.selectedFilter, this.tableCode);
    //     }


    //     if (!this.serverFiltering) {
    //       this.dataSource.filter = filter;
    //     }

    //     if (this.paginator && this.paginator.pageIndex !== 0) {
    //       this.paginationData = {...this.paginationData, pageIndex: 0};
    //       this.paginator.firstPage();
    //     }

    //   },
    //   this.itemModel,
    //   this.columnsSubscribtions
    // );
  }

  public columnsClick(): void {
    this.columnSelect.open();
  }

  public ngAfterViewInit(): void {
    this.afterViewInitEvent.emit();
    this.dataSource.sort = this.sort;

    if (this.clientPagination) {
      this.dataSource.paginator = this.paginator;
    }
  }

  // public emitPageEventFromPaginator(e): void {
  //   this.paginationChangeEvent.emit(e);
  //   if (this.preSelectedState) {
  //     this.tableStateService.setPaginationQueryParams(e, this.tableCode);
  //   }
  // }

  // public sortData(sort: TableSortInterface): void {
  //   if (this.preSelectedState) {
  //     this.tableStateService.setSortQueryParams(sort, this.tableCode);
  //   }
  //   this.sortChangeEvent.emit(sort);
  //   if (this.serverSorting) {
  //     this.dataSource = new MatTableDataSource(this.itemsCollection.slice());
  //     return;
  //   }
  // }

  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  public selectAllToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    this.triggerSelect();
  }

  public selectOneToggle(row): void {
    this.selection.select(row);
    this.triggerSelect();
  }

  public onClickRow(item): void {
    if (this.disabled) {
      return;
    }
    if (!this.allowExpansion) {
      this.rowClickEvent.emit(item);
      this.selectOneToggle(item);
    }
    // this.viewService.doubleClick(item, () => {
    //   this.rowDoubleClickEvent.emit(item);
    // });

    // if (this.preSelectedState) {
    //   const selectedRow = {
    //     key: this.preSelectedRowKey,
    //     value: item[this.preSelectedRowKey]
    //   } as SelectedRowInterface;

    //   this.tableStateService.setSelectedRowQueryParams(selectedRow, this.tableCode);
    // }
  }

  public onToggleChange(item: CdkExpansionDirective, row: any): void {
    if (this.allowExpansion) {
      if (this.openedRow && this.openedRow.expanded) {
        this.openedRow.toggle();
      }
      if (item.expanded) {
        this.rowExpandEvent.emit(row);
      }
      this.openedRow = item.expanded ? item : undefined;
    }
  }

  public onTableClick(without?): void {
    console.log('clicked element', without);
    this.closeAllFilterDd();
  }

  public onCellClick(code: string, rowIndex: number): void {
    if (this.allowKeyboardNavigation) {
      this.selectedCell = {
        code,
        rowIndex
      };
      this.isCellFocused = true;
      this.pressKey = '';
    }
  }

  public closeAllFilterDd(without?): void {
    this.viewService.closeAllFilterDd(without, this.columnsFilterDd);
  }

  public getStyle(cell: TableBaseFieldInterface): {[k: string]: string} {
    let style = {};
    if (cell.width) {
      style['flex-basis'] = cell.width;
    }
    if (cell.style) {
      style = {...style, ...cell.style};
    }
    return style;
  }

  // public selectionOpenedChange(e: boolean): void {
  //   if (!e) {
  //     this.userService.setTable({[this.tableCode]: {columns: JSON.stringify(this.toppings.value)}}).subscribe();
  //   }
  //  }

  // public exportCSV(): void {
  //   const options = {
  //     showLabels: true,
  //     headers: this.itemModel.map((item: BaseFieldInterface) => this.translate.instant(item.headerName || 'noname').toUpperCase())
  //   };

  //   let collection = [];
  //   this.itemModel.forEach((model: BaseFieldInterface) => {

  //     collection = this.dataSource.filteredData.map((item: object, i) => {
  //       return {
  //         ...(collection[i] || {}),
  //         ...{[model.code]: model.valueTransformForCsvCb ? model.valueTransformForCsvCb(item) : this.transformValueForCsv(item, model)}
  //       };
  //     });
  //   });

  //   const file = new ExportCsv(collection, `table_${this.tableCode}`, options);
  // }

  // private transformValueForCsv(item: any, model: BaseFieldInterface): any {
  //   if (item[model.code] === undefined) {
  //     return '';
  //   }

  //   switch (model.type) {
  //     case 'number':
  //       return `${Number(item[model.code].toString()).toFixed(2)}`;
  //     case 'string':
  //       return item[model.code];
  //     case 'date':
  //       return this.wtMomentService.getMoment()(item[model.code]).format('DD MMM YYYY');
  //     case 'money':
  //       return `${Number(item[model.code].toString()).toFixed(2)} ${item[model.additionalCode] || ''}`;
  //     default:
  //       return item[model.code];
  //   }
  // }

  private triggerSelect(): void {
    this.rowSelectEvent.emit(this.selection.selected);
  }

  // private getColIndexByCode(code: string): number {
  //   return this.itemModel.findIndex(item => item.code === code);
  // }

  // private getCodeByColIndex(index: number): string {
  //   return this.itemModel[index].code;
  // }

  // private initSelectedCell(): void {
  //   this.selectedCell = {
  //     code: this.itemModel[0].code,
  //     rowIndex: 0
  //   };
  //   this.isCellFocused = true;
  // }

  // private initErrors(): void {
  //   if (!this.tableCode) {
  //     console.error('Specify table code');
  //   }
  // }

  // private initKeyboardListener(): void {
  //   Observable.fromEvent(document, 'keyup')
  //     .takeUntil(this.destroyStream$)
  //     .subscribe(event => {
  //       switch (event['code']) {
  //         case 'ArrowLeft':
  //           if (!this.isCellFocused) {
  //             this.navigateLeft();
  //           }
  //           break;

  //         case 'ArrowRight':
  //           if (!this.isCellFocused) {
  //             this.navigateRight();
  //           }
  //           break;

  //         case 'ArrowDown':
  //           if (!this.isCellFocused) {
  //             this.navigateDown();
  //           }
  //           break;

  //         case 'ArrowUp':
  //           if (!this.isCellFocused) {
  //             this.navigateUp();
  //           }
  //           break;

  //         case 'Enter':
  //           this.pressKey = '';
  //           this.isCellFocused = !this.isCellFocused;
  //           break;

  //         case 'Escape':
  //           this.pressKey = '';
  //           this.isCellFocused = false;
  //           break;

  //         default:
  //           break;
  //       }
  //     });

  //   Observable.fromEvent(document, 'keypress')
  //     .takeUntil(this.destroyStream$)
  //     .subscribe(event => {
  //       if (event['key'] !== 'Enter' && !this.pressKey && !this.isCellFocused) {
  //         this.isCellFocused = true;
  //         this.pressKey = event['key'];
  //       }
  //     });
  // }

  // private navigateLeft(): void {
  //   const newColIndex = this.getColIndexByCode(this.selectedCell.code) - 1;
  //   if (newColIndex >= 0) {
  //     this.selectedCell.code = this.getCodeByColIndex(newColIndex);
  //   }
  // }

  // private navigateRight(): void {
  //   const newColIndex = this.getColIndexByCode(this.selectedCell.code) + 1;
  //   if (newColIndex <= this.maxColIndex) {
  //     this.selectedCell.code = this.getCodeByColIndex(newColIndex);
  //   } else {
  //     this.selectedCell.code = this.getCodeByColIndex(0);
  //     this.navigateDown();
  //   }
  // }

  // private navigateUp(): void {
  //   const newRowIndex = this.selectedCell.rowIndex - 1;
  //   if (newRowIndex >= 0) {
  //     this.selectedCell.rowIndex = newRowIndex;
  //   }
  // }

  // private navigateDown(): void {
  //   const newRowIndex = this.selectedCell.rowIndex + 1;
  //   if (newRowIndex <= this.maxRowIndex) {
  //     this.selectedCell.rowIndex = newRowIndex;
  //   } else {
  //     this.selectedCell.rowIndex = 0;
  //   }
  // }

  private getGroupColumns(itemModel: TableBaseFieldInterface[], property: string): Array<{ key: string, value: TableBaseFieldInterface[] }> {
    const groupedCollection = itemModel.reduce((previous, current) => {
      if (!previous[current[property]]) {
        previous[current[property]] = [current];
      } else {
        previous[current[property]].push(current);
      }

      return previous;
    },                                         {});

    return Object.keys(groupedCollection).map(key => ({key, value: groupedCollection[key]}));

  }

  // private setPreSelectedState(): void {

  //   if (this.preSelectedState.sort) {
  //     this.preSortTable(this.preSelectedState.sort);
  //   }

  //   if (this.preSelectedState.filter) {
  //     this.preFilterTable(this.preSelectedState.filter);
  //   }

  //   if (this.preSelectedState.pagination) {
  //     this.preSetTablePagination(this.preSelectedState.pagination);
  //   }

  //   if (this.preSelectedState.selectedRow) {
  //     this.preSelectTableRow(this.preSelectedState.selectedRow);
  //   }
  // }

  // private preSortTable(sort: TableSortInterface): void {
  //   const sortable = {
  //     id: sort.active,
  //     start: sort.direction,
  //     disableClear: false
  //   };
  //   this.sort.sort(sortable);
  // }

  // private preFilterTable(filter: {[key: string]: string}): void {
  //   Object.keys(filter).forEach(item => {
  //     this.columnsControls[item].setValue(filter[item]);
  //   });

  //   this.selectedFilter = this.allowMultiFilter ? {...this.selectedFilter, ...filter} : filter;
  // }

  // private preSetTablePagination(paginationData: PaginationDataOutput): void {
  //   this.paginationData = {...this.paginationData, ...paginationData};
  // }

  // private preSelectTableRow(row: SelectedRowInterface): void {
  //   const selectedRowObject = this.itemsCollection.find(item => {
  //     return item[row.key].toString() === row.value;
  //   });

  //   this.selection = new SelectionModel<any>(this.allowMultiSelect, [selectedRowObject]);
  // }
}

import { Injectable } from '@angular/core';
import { TableBaseFieldInterface } from 'src/app/core/modules/table/interfaces/base.interface';

@Injectable()
export class TableStateService {

  constructor() { }

  public extractDisplayedColumns(model: TableBaseFieldInterface[], allowExpansion: boolean): string[] {
    let displayedColumns: string[];
    displayedColumns = model.map(field => field.code);
    if (allowExpansion) { displayedColumns.push('expandTableBtn') }
    return displayedColumns;
  }

  
}

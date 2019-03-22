import { Injectable } from '@angular/core';

@Injectable()
export class ViewService {
  public recentlyClickedItem;
  public recentlyClickedTimer;

  public getDisplayedColumns(realDataColumns, allowMultiSelect, allowExpansion) {
    let displayedColumns;
    if (realDataColumns) {
      displayedColumns = realDataColumns.slice();
      if (allowMultiSelect) {
        displayedColumns.reverse().push('select');
        displayedColumns.reverse();
      }
    }
    if (allowExpansion) { displayedColumns.push('expandTableBtn'); }
    return displayedColumns;
  }

  public defineColumnsFilterDd(itemModel) {
    const columnsFilterDd = {};
    itemModel && itemModel.forEach(field => {
      columnsFilterDd[field.code] = false;
    });

    return columnsFilterDd;
  }

  public closeAllFilterDd(without, columnsFilterDd) {
    Object.keys(columnsFilterDd).forEach(key => {
      (key !== without) && (columnsFilterDd[key] = false);
    });
  }

  public doubleClick(item, cb) {
    if (this.recentlyClickedItem === item) {
      cb();
      this.recentlyClickedItem = {};
    } else {
      this.recentlyClickedItem = item;
    }

    this.recentlyClickedTimer = setTimeout(() => {
      clearTimeout(this.recentlyClickedTimer);
      delete this.recentlyClickedItem;
    },                                     300);
  }
}

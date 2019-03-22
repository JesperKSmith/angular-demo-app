import 'rxjs/add/operator/filter';

import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class FilterService {

  public filterPredicate(columns): any {
    return (data, filter: object) =>
      columns.filter(column => filter[column] !== '').every(key => {
        if (data[key] !== undefined && typeof data[key] === 'string') {
          const dataVal = data[key].toString().toUpperCase();
          const filterVal = filter[key].toString().toUpperCase();
          return dataVal.includes(filterVal);
        }
        return false;
      });
  }

  public defineColumnsControls(itemModel, columnsSubscribtions) {
    const columnsControls = {};
    itemModel && itemModel.forEach(field => {
      const control = new FormControl();
      columnsControls[field.code] = control;
      this.defineColumnsSubscription(field.code, control, columnsSubscribtions);
    });

    return columnsControls;
  }

  public subscribeFieldsInputsFiltering(changeCb, itemModel, columnsSubscribtions): Subscription {
    let skipIndex = 0;
    return Observable.combineLatest(columnsSubscribtions)
      .map(val => {
        skipIndex++;
        return val;
      })
      .filter(() => skipIndex !== 1)
      .map(filters => Object.assign({}, ...filters))
      .subscribe(filter => {
        this.overrideValuesHook(filter, itemModel);
        changeCb(filter);
      });
  }

  private overrideValuesHook(filter, itemModel) {
    Object.keys(filter).forEach(code => {
      const field = itemModel.filter(f => f.code === code)[0];
      const type = field && field.type;
      switch (type) {
        case 'date':
          this.prepareDateHook(filter, code);
      }
    });
  }

  private prepareDateHook(filter, code) {
    if (!!filter[code]) {
      filter[code] = this.dateToIso(filter[code]);
    }
  }

  public dateToIso(date) {
    const dateStr = date.toString().replace('00:00:00', '14:00:00');
    return (new Date(dateStr)).toISOString().slice(0, 10);
  }

  private defineColumnsSubscription(columnCode: string,
                                    control: FormControl,
                                    columnsSubscribtions: Array<Observable<any>>): void {
    const defaultDelayTime = 500;
    columnsSubscribtions.push(
      control.valueChanges
        .debounceTime(defaultDelayTime)
        .distinctUntilChanged()
        .startWith(null)
        .map(value => ({ [columnCode]: value }))
    );
  }
}

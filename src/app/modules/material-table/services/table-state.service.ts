import { Injectable } from '@angular/core';
import { TableBaseFieldInterface } from '../base.interface';
import { ItemWithIdInterface } from '../interfaces/item-with-id.interface';

@Injectable()
export class TableStateService {

  constructor() { }


  /**
   * @name removeItemFromTable
   *
   * @param {T} itemToRemove - The item we want to remove from the table
   * @param {T[]} tableArrayTarget  - The table we want to remove {itemToRemove} from
   *
   * @return @type {T} - Table after item has been removed
   */
  public removeItemFromArray<T>(itemToRemove: T, tableArrayTarget: T[]): T[] {
    return tableArrayTarget.filter(entry => entry !== itemToRemove);
  }

  /**
   * @name addItemToArray
   * @description - Adds item given in params, to table given in params
   *
   * @param {T} itemToAdd- The item we want to add to the array
   * @param {T[]} targetArray - The array we want to add item to
   *
   * @return {T[]} arrayWithItemAdded - Array after item has been added
   */
  public addItemToArray<T>(itemToAdd: T, targetArray: T[]): T[] {
    const arrayWithItemAdded = [...targetArray];
    arrayWithItemAdded.push(itemToAdd);
    return arrayWithItemAdded;
  }


  /**
   * @description - Checks if an array contains a certain item
   * @param {T} item - The item we're checking for
   * @param {T} array - The array in which we check for item
   * @return {boolean} - if exist: true, if not: false
   */
  public checkArrayForItem<T>(item: T, array: T[]): boolean {
    return array.some(entry => entry === item);
  }

  /**
   * @description - Generates an array of objects with id on each object
   * @param {T[]} targetArray - The array of objects with no id
   * @return {R[]} An array of the objects of targetArray, where each object has an assigned id
   */
  public generateIds<T, R extends ItemWithIdInterface>(targetArray: T[]): R[] {
    const result: R[] = [];
    targetArray.forEach(entry => {
      const item = {
        id: Math.random()
      };
      Object.assign(item, entry);
      result.push(item as R);
    });
    return result;
  }

  /**
   * @description - Extracts codes of columns desired to be displayed from the model
   * @param {TableBaseFieldInterface[]} model - Consists of an array of TableBaseField objects
   * @param {boolean} allowExpansion - Determines whether the displayed columns should allow expansion panel
   * @return {string[]} The codes used for determining what columns should be displayed as a string array
   */
  public extractDisplayedColumns(model: TableBaseFieldInterface[], allowExpansion: boolean): string[] {
    let displayedColumns: string[];
    displayedColumns = model.map(field => field.code);
    if (allowExpansion) { displayedColumns.push('expandTableBtn') }
    return displayedColumns;
  }




}

import { Injectable } from '@angular/core';
import { flatten } from '@angular/core/src/render3/util';
import { MenuItemInterface } from '../interfaces/menu-item.interface';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() { }


  public getNavigationMenu(): MenuItemInterface[] {
    return [
      {
        name: 'Introduction',
        type: 'flat',
        route: 'intro'
      },
      {
        name: 'Components',
        type: 'expandable',
        route: 'components',
        pages: [
          {
            name: 'Table',
            icon: 'table_chart',
            route: 'table'
          }
        ]
      },
      {
        name: 'Pipes',
        type: 'flat',
        route: 'pipes'
      }
    ];
  }
}

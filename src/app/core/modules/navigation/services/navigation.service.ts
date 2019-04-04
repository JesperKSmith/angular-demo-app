import { Injectable } from '@angular/core';
import { MenuItemInterface } from '../interfaces/menu-item.interface';
import { NAVIGATION_MODEL } from '../navigation.model';

@Injectable()
export class NavigationService {

/**
  * @name getNavigationMenu
  * @description collects the navigation menu structure from imported NAVIGATION_MODEL
  * @returns {MenuItemInterface[]} The model exposed in NAVIGATION_MODEL
  */
  public getNavigationMenu(): MenuItemInterface[] {
    return NAVIGATION_MODEL;
  }
}

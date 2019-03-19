import { SubMenuItemInterface } from './sub-menu-item.interface';

export interface MenuItemInterface {
  name: string;
  route: string;
  pages?: SubMenuItemInterface[];
  isActive?: boolean;
  icon?: string;
}
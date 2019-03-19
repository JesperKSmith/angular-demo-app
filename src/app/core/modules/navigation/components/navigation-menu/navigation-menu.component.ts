import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { MenuItemInterface } from '../../interfaces/menu-item.interface';

@Component({
  selector: 'navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {

  public menuItems: MenuItemInterface[];
  constructor(private navigationService: NavigationService) { }


  ngOnInit() {
    this.menuItems = this.navigationService.getNavigationMenu();
  }

}

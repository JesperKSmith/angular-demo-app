import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table-row-link',
  templateUrl: './table-row-link.component.html',
  styleUrls: ['./table-row-link.component.scss']
})
export class TableRowLinkComponent implements OnInit {
  @Input() public linkConstructor: (item: any) => string;
  @Input() public row: any;

  constructor() { }

  public ngOnInit(): void {
  }

}

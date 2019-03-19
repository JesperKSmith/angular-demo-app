import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filter-dd-icon',
  template: `
    <span [ngClass]="{'open': filterActive}" class="arrow-down-icon" (click)="toggle();">
      <mat-icon [ngClass]="{'not-empty': inputValue}" *ngIf="!filterActive">filter_list</mat-icon>
      <mat-icon *ngIf="filterActive">filter_list</mat-icon>
    </span>
  `,
  styles: [`
    :host {
      display: inline-block;
      cursor: pointer;
    }

    mat-icon.not-empty {
      color: #55be8c;
    }

    .arrow-down-icon.open {
      color: #55be8c;
    }

    @media print {
      :host {
        display: none;
      }
    }
  `]
})
export class FilterDdIconComponent implements OnInit, OnChanges {
  @Input() public filterActive: boolean;
  @Input() public inputValue;
  @Output() public change: EventEmitter<boolean> = new EventEmitter<boolean>();

  public isEmpty = true;

  public toggle(): any {
    this.filterActive = !this.filterActive;
    this.change.emit(this.filterActive);
  }

  public ngOnChanges(): void {
    if (this.inputValue) {
      this.isEmpty = false;
    }
  }

  constructor() { }

  public ngOnInit(): void {
  }

}

import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {MatDatepicker, MatInput} from '@angular/material';
import {IMyDateModel} from 'ngx-mydatepicker';

@Component({
  selector: 'app-column-filter',
  templateUrl: './column-filter.component.html',
  styleUrls: ['./column-filter.component.scss']
})
export class ColumnFilterComponent implements OnInit {
  @Input() public columnControl;
  @Input() public field;
  @Input() public name;
  private _isVisible: boolean;

  @Output() public closeMeEvent: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(MatDatepicker) public picker: MatDatepicker<any>;
  @ViewChildren(MatInput) public inputFields: QueryList<MatInput>;

  public dateValue;

  get isVisible(): boolean {
    return this._isVisible;
  }

  @Input()
  set isVisible(value: boolean) {
    this._isVisible = value;
    if (this.inputFields && this.inputFields.first) {
      setTimeout(() => this.inputFields.first.focus());
    }
  }

  public ngOnInit(): void {
    this.dateValue = this.columnControl.value ? {jsdate: this.columnControl.value} : null;
  }

  public clearInput(fieldType): void {
    (fieldType === 'date') && (this.dateValue = '');
    this.columnControl.setValue('');
    this.closeMeEvent.emit();
  }

  public changeDate(event: IMyDateModel): void {
    if (event) {
      this.columnControl.setValue(event.jsdate);
      this.closeMeEvent.emit();
    }
  }

  @HostListener('document:click')
  public clickOutside(): void {
    if (!this.isVisible) {
      return;
    }
    this.closeMeEvent.emit();
  }

}

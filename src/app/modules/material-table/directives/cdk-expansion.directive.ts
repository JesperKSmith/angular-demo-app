import {Directive, EventEmitter, HostBinding, HostListener, Input, Output, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[cdkExpansion]'
})
export class CdkExpansionDirective {
  private row: any;
  private templateRef: TemplateRef<any>;
  private opened: boolean;

  constructor(public viewContainerRef: ViewContainerRef) { }

  @Output() public toggleChange = new EventEmitter<CdkExpansionDirective>();

  @Input()
  set cdkExpansion(value: any) {
    if (value !== this.row) {
      this.row = value;
    }
  }

  @Input('cdkExpansionTemplate')
  set template(value: TemplateRef<any>) {
    if (value !== this.templateRef) {
      this.templateRef = value;
    }
  }

  @HostBinding('class.expanded')
  get expanded(): boolean {
    return this.opened;
  }

  @HostListener('click')
  public onClick(): void {
    this.toggle();
  }

  public toggle(): void {
    this.viewContainerRef.clear();
    if (!this.opened) {
      this.render();
    }
    this.opened = this.viewContainerRef.length > 0;
    this.toggleChange.emit(this);
  }

  private render(): void {
    if (this.templateRef && this.row) {
      this.viewContainerRef.createEmbeddedView(this.templateRef, { $implicit: this.row });
    }
  }

}
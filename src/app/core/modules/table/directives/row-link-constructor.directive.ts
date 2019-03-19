import {Directive, ElementRef, HostListener, Input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[rowLinkConstructor]'
})
export class RowLinkConstructorDirective implements OnChanges {
  @Input() public rowLinkConstructor: (item: any) => string;
  @Input() public row: any;

  constructor(private hostElement: ElementRef, private renderer: Renderer2) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (typeof this.rowLinkConstructor === 'function') {
      const url = this.rowLinkConstructor(this.row);
      this.renderer.setAttribute(this.hostElement.nativeElement, 'href', `${window.location.origin}${window.location.pathname}#/${url}`);
    }
  }

  @HostListener('click', ['$event'])
  @HostListener('dblclick', ['$event'])
  public onClick(event: any): void {
    event.preventDefault();
  }
}

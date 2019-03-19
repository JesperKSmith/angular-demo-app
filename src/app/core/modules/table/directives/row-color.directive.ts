import {Directive, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';

const cssClassMap = {
  act: 'color-active',
  ina: 'color-inactive',
  exp: 'color-expired'
};

@Directive({
  selector: '[rowColor]'
})
export class RowColorDirective  implements OnChanges {
  @Input() public rowColorMarker: (arg: any) => 'act' | 'ina' | 'exp';
  @Input() public rowColorMarkerProp: any;
  @Input() public row: any;

  constructor(private hostElement: ElementRef, private renderer: Renderer2) { }

  public ngOnChanges(): void {
    if (typeof this.rowColorMarker === 'function') {
      const status = this.rowColorMarker(this.row);
      Object.keys(cssClassMap).forEach(key => this.renderer.removeClass(this.hostElement.nativeElement, cssClassMap[key]));
      this.renderer.addClass(this.hostElement.nativeElement, cssClassMap[status]);
    }
  }
}

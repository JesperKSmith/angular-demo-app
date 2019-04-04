import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfacesPageComponent } from './interfaces-page.component';

describe('InterfacesPageComponent', () => {
  let component: InterfacesPageComponent;
  let fixture: ComponentFixture<InterfacesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterfacesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfacesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

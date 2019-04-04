import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationPageComponent } from './communication-page.component';

describe('CommunicationPageComponent', () => {
  let component: CommunicationPageComponent;
  let fixture: ComponentFixture<CommunicationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunicationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

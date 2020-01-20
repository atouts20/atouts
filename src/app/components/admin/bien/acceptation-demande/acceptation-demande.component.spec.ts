import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptationDemandeComponent } from './acceptation-demande.component';

describe('AcceptationDemandeComponent', () => {
  let component: AcceptationDemandeComponent;
  let fixture: ComponentFixture<AcceptationDemandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptationDemandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptationDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

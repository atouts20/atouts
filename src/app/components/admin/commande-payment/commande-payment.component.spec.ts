import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandePaymentComponent } from './commande-payment.component';

describe('CommandePaymentComponent', () => {
  let component: CommandePaymentComponent;
  let fixture: ComponentFixture<CommandePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

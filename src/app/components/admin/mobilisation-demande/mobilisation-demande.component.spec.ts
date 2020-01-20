import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilisationDemandeComponent } from './mobilisation-demande.component';

describe('MobilisationDemandeComponent', () => {
  let component: MobilisationDemandeComponent;
  let fixture: ComponentFixture<MobilisationDemandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobilisationDemandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilisationDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

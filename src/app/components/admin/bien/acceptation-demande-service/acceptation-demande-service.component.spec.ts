import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptationDemandeServiceComponent } from './acceptation-demande-service.component';

describe('AcceptationDemandeServiceComponent', () => {
  let component: AcceptationDemandeServiceComponent;
  let fixture: ComponentFixture<AcceptationDemandeServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptationDemandeServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptationDemandeServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommandeServiceComponent } from './admin-commande-service.component';

describe('AdminCommandeServiceComponent', () => {
  let component: AdminCommandeServiceComponent;
  let fixture: ComponentFixture<AdminCommandeServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCommandeServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommandeServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

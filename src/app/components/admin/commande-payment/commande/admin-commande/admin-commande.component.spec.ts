import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommandeComponent } from './admin-commande.component';

describe('AdminCommandeComponent', () => {
  let component: AdminCommandeComponent;
  let fixture: ComponentFixture<AdminCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

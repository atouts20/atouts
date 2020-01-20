import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCommandeComponent } from './user-commande.component';

describe('UserCommandeComponent', () => {
  let component: UserCommandeComponent;
  let fixture: ComponentFixture<UserCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

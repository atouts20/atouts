import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCommandeServiceComponent } from './user-commande-service.component';

describe('UserCommandeServiceComponent', () => {
  let component: UserCommandeServiceComponent;
  let fixture: ComponentFixture<UserCommandeServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCommandeServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCommandeServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

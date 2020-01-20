import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchangeAdminComponent } from './echange-admin.component';

describe('EchangeAdminComponent', () => {
  let component: EchangeAdminComponent;
  let fixture: ComponentFixture<EchangeAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchangeAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchangeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudCompteComponent } from './crud-compte.component';

describe('CrudCompteComponent', () => {
  let component: CrudCompteComponent;
  let fixture: ComponentFixture<CrudCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

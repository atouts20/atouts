import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeBienUserComponent } from './demande-bien-user.component';

describe('DemandeBienUserComponent', () => {
  let component: DemandeBienUserComponent;
  let fixture: ComponentFixture<DemandeBienUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeBienUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeBienUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

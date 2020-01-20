import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorisationOperationComponent } from './autorisation-operation.component';

describe('AutorisationOperationComponent', () => {
  let component: AutorisationOperationComponent;
  let fixture: ComponentFixture<AutorisationOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorisationOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorisationOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

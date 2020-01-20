import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidationBonComponent } from './liquidation-bon.component';

describe('LiquidationBonComponent', () => {
  let component: LiquidationBonComponent;
  let fixture: ComponentFixture<LiquidationBonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiquidationBonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidationBonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

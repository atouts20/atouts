import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketAllComponent } from './market-all.component';

describe('MarketAllComponent', () => {
  let component: MarketAllComponent;
  let fixture: ComponentFixture<MarketAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

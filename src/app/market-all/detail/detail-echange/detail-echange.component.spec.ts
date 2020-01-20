import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEchangeComponent } from './detail-echange.component';

describe('DetailEchangeComponent', () => {
  let component: DetailEchangeComponent;
  let fixture: ComponentFixture<DetailEchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

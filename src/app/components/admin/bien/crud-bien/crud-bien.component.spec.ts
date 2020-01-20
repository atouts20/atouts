import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudBienComponent } from './crud-bien.component';

describe('CrudBienComponent', () => {
  let component: CrudBienComponent;
  let fixture: ComponentFixture<CrudBienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudBienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

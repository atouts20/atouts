import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesComptesFavorisComponent } from './mes-comptes-favoris.component';

describe('MesComptesFavorisComponent', () => {
  let component: MesComptesFavorisComponent;
  let fixture: ComponentFixture<MesComptesFavorisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesComptesFavorisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesComptesFavorisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudUtilisateurFinalComponent } from './crud-utilisateur-final.component';

describe('CrudUtilisateurFinalComponent', () => {
  let component: CrudUtilisateurFinalComponent;
  let fixture: ComponentFixture<CrudUtilisateurFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudUtilisateurFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudUtilisateurFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

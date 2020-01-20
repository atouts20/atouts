import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudUtilisateurComponent } from './crud-utilisateur.component';

describe('CrudUtilisateurComponent', () => {
  let component: CrudUtilisateurComponent;
  let fixture: ComponentFixture<CrudUtilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudUtilisateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

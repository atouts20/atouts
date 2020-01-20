import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeDepotComponent } from './commande-depot.component';

describe('CommandeDepotComponent', () => {
  let component: CommandeDepotComponent;
  let fixture: ComponentFixture<CommandeDepotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandeDepotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

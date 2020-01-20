import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeRetraitComponent } from './commande-retrait.component';

describe('CommandeRetraitComponent', () => {
  let component: CommandeRetraitComponent;
  let fixture: ComponentFixture<CommandeRetraitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandeRetraitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeRetraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

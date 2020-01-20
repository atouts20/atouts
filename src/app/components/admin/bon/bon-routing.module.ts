import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BonComponent } from './bon.component';
import { CrudBonComponent } from './crud-bon/crud-bon.component';
import { EncaisseBonComponent } from './encaisse-bon/encaisse-bon.component';
import { LiquidationBonComponent } from './liquidation-bon/liquidation-bon.component';

const routes: Routes = [
  {
    path: '',
    component: BonComponent,
    children: [
      {
        path: 'crud-bon',
        component: CrudBonComponent
      },
      {
        path: 'encaisse-bon',
        component: EncaisseBonComponent
      },
      {
        path: 'liquidation-bon',
        component: LiquidationBonComponent
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class BonRoutingModule { }

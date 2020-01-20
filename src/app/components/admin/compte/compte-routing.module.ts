import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudCompteComponent } from './crud-compte/crud-compte.component';
import { SousComptesComponent } from './sous-comptes/sous-comptes.component';
import { CompteComponent } from './compte.component';


const routes: Routes = [
  {
    path: '',
    component: CompteComponent,
    children: [
      {
        path: 'crud-compte',
        component: CrudCompteComponent,
        data: {
          breadcrumb: 'Crud-compte'
        }
      },
      {
        path: 'crud-sous-comptes',
        component: SousComptesComponent,
        data: {
          breadcrumb: 'Crud-sous-comptes'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class CompteRoutingModule { }

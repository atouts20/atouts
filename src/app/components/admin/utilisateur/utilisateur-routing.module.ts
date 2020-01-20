import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UtilisateurComponent } from './utilisateur.component';
import { CrudUtilisateurComponent } from './crud-utilisateur/crud-utilisateur.component';
import { GroupeComponent } from './groupe/groupe.component';
import { CrudUtilisateurFinalComponent } from './crud-utilisateur-final/crud-utilisateur-final.component';


const routes: Routes = [
  {
    path: '',
    component: UtilisateurComponent,
    children: [
      {
        path: 'crud-utilisateur',
        component: CrudUtilisateurComponent,
        data: {
          breadcrumb: 'Crud-utilisateur'
        }
      },
      {
        path: 'crud-utilisateur-final',
        component: CrudUtilisateurFinalComponent,
        data: {
          breadcrumb: 'Crud-utilisateur'
        }
      },
      {
        path: 'crud-goupe',
        component: GroupeComponent,
        data: {
          breadcrumb: 'Crud-groupe'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilisateurRoutingModule { }

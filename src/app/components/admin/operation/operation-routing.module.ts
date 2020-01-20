import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperationDepotRetraitVirementComponent } from './operation-depot-retrait-virement/operation-depot-retrait-virement.component';
import { OperationComponent } from './operation.component';
import { AutorisationOperationComponent } from './autorisation-operation/autorisation-operation.component';
import { OperationUserComponent } from './operation-user/operation-user.component';
import { MesComptesFavorisComponent } from './mes-comptes-favoris/mes-comptes-favoris.component';
import { TresorOuEdComponent } from './vod/tresor-ou-ed/tresor-ou-ed.component';
import { EtEpargneTermeComponent } from './vod/et-epargne-terme/et-epargne-terme.component';


const routes: Routes = [
  {
    path: '',
    component: OperationComponent,
    children: [
      {
        path: 'operations-depot-retrait-virement',
        component: OperationDepotRetraitVirementComponent
      },
      {
        path: 'operation-en',
        component: AutorisationOperationComponent
      },
      {
        path: 'operation-virement-user',
        component: OperationUserComponent
      },
      {
        path: 'operation-virement-user/compte-favori',
        component: MesComptesFavorisComponent
      },
      {
        path: 'tresor',
        component: TresorOuEdComponent
      },
      {
        path: 'et',
        component: EtEpargneTermeComponent
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class OperationRoutingModule { }

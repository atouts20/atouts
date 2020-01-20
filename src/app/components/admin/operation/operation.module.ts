import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationRoutingModule } from './operation-routing.module';
import { OperationComponent } from './operation.component';
import { OperationDepotRetraitVirementComponent } from './operation-depot-retrait-virement/operation-depot-retrait-virement.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IconsProviderModule } from './../../../icons-provider.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AutorisationOperationComponent } from './autorisation-operation/autorisation-operation.component';
import { OperationUserComponent } from './operation-user/operation-user.component';
import { MesComptesFavorisComponent } from './mes-comptes-favoris/mes-comptes-favoris.component';
import { TresorOuEdComponent } from './vod/tresor-ou-ed/tresor-ou-ed.component';
import { EtEpargneTermeComponent } from './vod/et-epargne-terme/et-epargne-terme.component';


@NgModule({
  declarations: [
    OperationComponent,
    OperationDepotRetraitVirementComponent,
    AutorisationOperationComponent,
    OperationUserComponent,
    MesComptesFavorisComponent,
    TresorOuEdComponent,
    EtEpargneTermeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IconsProviderModule,
    NgZorroAntdModule,
    OperationRoutingModule
  ]
})
export class OperationModule { }

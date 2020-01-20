import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilisateurRoutingModule } from './utilisateur-routing.module';
import { UtilisateurComponent } from './utilisateur.component';
import { CrudUtilisateurComponent } from './crud-utilisateur/crud-utilisateur.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { IconsProviderModule } from '../../../icons-provider.module';
import { GroupeComponent } from './groupe/groupe.component';
import { CrudUtilisateurFinalComponent } from './crud-utilisateur-final/crud-utilisateur-final.component';


@NgModule({
  declarations: [
    UtilisateurComponent,
    CrudUtilisateurComponent,
    GroupeComponent,
    CrudUtilisateurFinalComponent
  ],
  imports: [
    CommonModule,
    UtilisateurRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    IconsProviderModule,
    NgZorroAntdModule,
  ]
})
export class UtilisateurModule { }

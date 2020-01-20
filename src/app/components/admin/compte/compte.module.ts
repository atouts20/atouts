import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsProviderModule } from '../../../icons-provider.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CompteRoutingModule } from './compte-routing.module';
import { CompteComponent } from './compte.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CrudCompteComponent } from './crud-compte/crud-compte.component';
import { SousComptesComponent } from './sous-comptes/sous-comptes.component';


@NgModule({
  declarations: [
    CompteComponent,
    CrudCompteComponent,
    SousComptesComponent
  ],
  imports: [
    CommonModule,
    CompteRoutingModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    FormsModule,
    IconsProviderModule,
    NgZorroAntdModule,
  ]
})
export class CompteModule { }

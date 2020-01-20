import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienRoutingModule } from './bien-routing.module';
import { BienComponent } from './bien.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CrudBienComponent } from './crud-bien/crud-bien.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { IconsProviderModule } from '../../../icons-provider.module';
import { EchangeComponent } from './echange/echange.component';
import { DemandeBienUserComponent } from './demande-bien-user/demande-bien-user.component';
import { EchangeAdminComponent } from './echange-admin/echange-admin.component';
import { AcceptationDemandeComponent } from './acceptation-demande/acceptation-demande.component';
import { AcceptationDemandeServiceComponent } from './acceptation-demande-service/acceptation-demande-service.component';

@NgModule({
  declarations: [
    BienComponent,
    CrudBienComponent,
    EchangeComponent,
    DemandeBienUserComponent,
    EchangeAdminComponent,
    AcceptationDemandeComponent,
    AcceptationDemandeServiceComponent
  ],
  imports: [
    CommonModule,
    BienRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule,
    IconsProviderModule
  ]
})
export class BienModule { }

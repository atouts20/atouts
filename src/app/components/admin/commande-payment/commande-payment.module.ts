import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandePaymentRoutingModule } from './commande-payment-routing.module';
import { AdminCommandeComponent } from './commande/admin-commande/admin-commande.component';
import { UserCommandeComponent } from './commande/user-commande/user-commande.component';
import { UserPaymentComponent } from './payment/user-payment/user-payment.component';
import { AdminPaymentComponent } from './payment/admin-payment/admin-payment.component';
import { CommandePaymentComponent } from './commande-payment.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IconsProviderModule } from '../../../icons-provider.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommandeRetraitComponent } from './operations/commande-retrait/commande-retrait.component';
import { CommandeDepotComponent } from './operations/commande-depot/commande-depot.component';
import { AdminCommandeServiceComponent } from './commande/admin-commande-service/admin-commande-service.component';
import { UserCommandeServiceComponent } from './commande/user-commande-service/user-commande-service.component';


@NgModule({
  declarations: [CommandePaymentComponent, AdminCommandeComponent, UserCommandeComponent, UserPaymentComponent, AdminPaymentComponent, CommandeRetraitComponent, CommandeDepotComponent, AdminCommandeServiceComponent, UserCommandeServiceComponent],
  imports: [
    CommonModule,
    CommandePaymentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    IconsProviderModule,
    NgZorroAntdModule,
  ]
})
export class CommandePaymentModule { }

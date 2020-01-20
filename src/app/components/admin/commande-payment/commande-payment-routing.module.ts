import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommandePaymentComponent } from './commande-payment.component';
import { AdminCommandeComponent } from './commande/admin-commande/admin-commande.component';
import { UserCommandeComponent } from './commande/user-commande/user-commande.component';
import { AdminPaymentComponent } from './payment/admin-payment/admin-payment.component';
import { UserPaymentComponent } from './payment/user-payment/user-payment.component';
import { CommandeDepotComponent } from './operations/commande-depot/commande-depot.component';
import { CommandeRetraitComponent } from './operations/commande-retrait/commande-retrait.component';
import { AdminCommandeServiceComponent } from './commande/admin-commande-service/admin-commande-service.component';
import { UserCommandeServiceComponent } from './commande/user-commande-service/user-commande-service.component';


const routes: Routes = [
  {
    path: '',
    component: CommandePaymentComponent,
    children: [
      {
        path: 'admin-commande',
        component: AdminCommandeComponent
      },
      {
        path: 'admin-commande-service',
        component: AdminCommandeServiceComponent
      },
      {
        path: 'user-commande',
        component: UserCommandeComponent
      },
      {
        path: 'user-commande-service',
        component: UserCommandeServiceComponent
      },
      {
        path: 'admin-payment',
        component: AdminPaymentComponent
      },
      {
        path: 'user-payment',
        component: UserPaymentComponent
      },
      {
        path: 'commande-retrait',
        component: CommandeRetraitComponent
      },
      {
        path: 'commande-depot',
        component: CommandeDepotComponent
      },
    ]
  }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandePaymentRoutingModule { }

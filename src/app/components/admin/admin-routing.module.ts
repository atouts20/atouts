import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../../utils/auth.guard';
import { MobilisationComponent } from './mobilisation/mobilisation.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'utilisateur',
        loadChildren: './utilisateur/utilisateur.module#UtilisateurModule', canActivate: [AuthGuard],
        data: {
          breadcrumb: 'Utilisateur'
        }
      },
      {
        path: 'compte',
        loadChildren: './compte/compte.module#CompteModule', canActivate: [AuthGuard],
        data: {
          breadcrumb: 'Compte'
        }
      },
      {
        path: 'bien',
        loadChildren: './bien/bien.module#BienModule', canActivate: [AuthGuard],
        data: {
          breadcrumb: 'Bien'
        }
      },
      {
        path: 'bon',
        loadChildren: './bon/bon.module#BonModule', canActivate: [AuthGuard],
        data: {
          breadcrumb: 'Bon'
        }
      },
      {
        path: 'operation',
        loadChildren: './operation/operation.module#OperationModule', canActivate: [AuthGuard],
        data: {
          breadcrumb: 'Operation'
        }
      },
      {
        path: 'commande-payment',
        loadChildren: './commande-payment/commande-payment.module#CommandePaymentModule', canActivate: [AuthGuard],
        data: {
          breadcrumb: 'CommandePayment'
        }
      },
      {
        path: 'mobilisation',
        component: MobilisationComponent, canActivate: [AuthGuard],
      },
      {
        path: 'demande-mobilisation',
        component: MobilisationComponent, canActivate: [AuthGuard],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

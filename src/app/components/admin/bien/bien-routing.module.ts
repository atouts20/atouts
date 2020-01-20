import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BienComponent } from './bien.component';
import { CrudBienComponent } from './crud-bien/crud-bien.component';
import { EchangeComponent } from './echange/echange.component';
import { DemandeBienUserComponent } from './demande-bien-user/demande-bien-user.component';
import { EchangeAdminComponent } from './echange-admin/echange-admin.component';
import { AcceptationDemandeComponent } from './acceptation-demande/acceptation-demande.component';
import { AcceptationDemandeServiceComponent } from './acceptation-demande-service/acceptation-demande-service.component';



const routes: Routes = [
  {
    path: '',
    component: BienComponent,
    children: [
      {
        path: 'crud-bien',
        component: CrudBienComponent
      },
      {
        path: 'echange',
        component: EchangeComponent
      },
      {
        path: 'demande-bien-user',
        component: DemandeBienUserComponent
      },
      {
        path: 'accepte-echange',
        component: EchangeAdminComponent
      },
      {
        path: 'acception-produit',
        component: AcceptationDemandeComponent
      },
      {
        path: 'acception-service',
        component: AcceptationDemandeServiceComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class BienRoutingModule { }

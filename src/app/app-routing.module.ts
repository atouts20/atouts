import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { EnregistrementComponent } from './components/enregistrement/enregistrement.component';
import { AuthGuard } from './utils/auth.guard';
import { MarketAllComponent } from './market-all/market-all.component';
import { DetailProduitComponent } from './market-all/detail/detail-produit/detail-produit.component';
import { DetailServiceComponent } from './market-all/detail/detail-service/detail-service.component';
import { ClientComponent } from './market-all/detail/client/client.component';
import { ClientServiceComponent } from './market-all/detail/client-service/client-service.component';
import { PasswordForgotComponent } from './components/password-forgot/password-forgot.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { DetailEchangeComponent } from './market-all/detail/detail-echange/detail-echange.component';
import { PanierComponent } from './market-all/detail/panier/panier.component';
import { AproposComponent } from './apropos/apropos.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  //{ path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },

  {
    path: 'admin',
    loadChildren: './components/admin/admin.module#AdminModule',
    data: {
      breadcrumb: 'Administrateur'
    }
    //canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'connexion',
    component: LoginComponent
  },
  {
    path: 'apropos',
    component: AproposComponent
  },
  {
    path: 'register',
    component: EnregistrementComponent
  },
  {
    path: 'forgot-password',
    component: PasswordForgotComponent
  },
  {
    path: 'reset-password',
    component: PasswordResetComponent
  },
  {
    path: 'market-all',
    component: MarketAllComponent, //canActivate: [AuthGuard],

  },
  {
    path: 'market-all/:paramKey',
    component: MarketAllComponent,
  },
  {
    path: 'panier',
    component: PanierComponent, //canActivate: [AuthGuard], 

  },
  {
    path: 'client',
    component: ClientComponent, //canActivate: [AuthGuard],

  },
  {
    path: 'client-service',
    component: ClientServiceComponent, //canActivate: [AuthGuard],

  },
  {
    path: 'detail-produit/:paramKey',
    component: DetailProduitComponent,
  },
  {
    path: 'detail-service/:paramKey',
    component: DetailServiceComponent,
  },
  {
    path: 'detail-echange/:paramKey',
    component: DetailEchangeComponent,
  },
  {
    path: '**',
    component: FourOhFourComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

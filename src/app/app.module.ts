import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, fr_FR } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData, CommonModule } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { WINDOW_PROVIDERS } from './utils/window';
import { JwtInterceptor } from './utils/JwtInterceptor';
import { ErrorInterceptor } from './utils/ErrorInterceptor';
import { TokenStorage } from './utils/token.storage';
import { AuthenticationService } from './service/authentication.service';
import { UtilisateurService } from './service/UtilisateurService';
import { EnregistrementComponent } from './components/enregistrement/enregistrement.component';
import { MarketAllComponent } from './market-all/market-all.component';
import { DetailProduitComponent } from './market-all/detail/detail-produit/detail-produit.component';
import { CartCalculatorComponent } from './market-all/detail/cart-calculator/cart-calculator.component';
import { DetailServiceComponent } from './market-all/detail/detail-service/detail-service.component';
import { MobilisationService } from './service/mobilisation.service';
import { ReponseService } from './service/reponse.service';
import { RelanceService } from './service/relance.service';
import { ClientComponent } from './market-all/detail/client/client.component';
import { CommandePaymentModule } from './components/admin/commande-payment/commande-payment.module';
import { ClientServiceComponent } from './market-all/detail/client-service/client-service.component';
import { DetailEchangeComponent } from './market-all/detail/detail-echange/detail-echange.component';
import { PasswordForgotComponent } from './components/password-forgot/password-forgot.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PanierComponent } from './market-all/detail/panier/panier.component';
import { AproposComponent } from './apropos/apropos.component';


registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    FourOhFourComponent,
    LoginComponent,
    HomeComponent,
    EnregistrementComponent,
    MarketAllComponent,
    DetailProduitComponent,
    CartCalculatorComponent,
    DetailServiceComponent,
    PanierComponent,
    ClientComponent,
    ClientServiceComponent,
    DetailEchangeComponent,
    PasswordForgotComponent,
    PasswordResetComponent,
    AproposComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: fr_FR },
    WINDOW_PROVIDERS,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    TokenStorage,
    AuthenticationService,
    UtilisateurService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { IconsProviderModule } from '../../icons-provider.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MobilisationComponent } from './mobilisation/mobilisation.component';
import { MobilisationDemandeComponent } from './mobilisation-demande/mobilisation-demande.component';


@NgModule({
  declarations: [
    AdminComponent,
    MobilisationComponent,
    MobilisationDemandeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }

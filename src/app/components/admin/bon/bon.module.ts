import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonComponent } from './bon.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IconsProviderModule } from '../../../icons-provider.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BonRoutingModule } from './bon-routing.module';
import { CrudBonComponent } from './crud-bon/crud-bon.component';
import { EncaisseBonComponent } from './encaisse-bon/encaisse-bon.component';
import { LiquidationBonComponent } from './liquidation-bon/liquidation-bon.component';

@NgModule({
  declarations: [
    BonComponent,
    CrudBonComponent,
    EncaisseBonComponent,
    LiquidationBonComponent
  ],
  imports: [
    CommonModule,
    BonRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    IconsProviderModule,
    NgZorroAntdModule,
  ]
})
export class BonModule { }

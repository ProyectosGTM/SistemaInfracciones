import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferenciaPagoRoutingModule } from './referencia-pago-routing.module';
import { AltaReferenciaPagoComponent } from './alta-referencia-pago/alta-referencia-pago.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDateBoxModule, DxLoadIndicatorModule } from 'devextreme-angular';


@NgModule({
  declarations: [AltaReferenciaPagoComponent],
  imports: [
    CommonModule,
    ReferenciaPagoRoutingModule,
    ReactiveFormsModule,
    DxDateBoxModule,
    DxLoadIndicatorModule,
    FormsModule
  ]
})
export class ReferenciaPagoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferenciaPagoRoutingModule } from './referencia-pago-routing.module';
import { AltaReferenciaPagoComponent } from './alta-referencia-pago/alta-referencia-pago.component';


@NgModule({
  declarations: [AltaReferenciaPagoComponent],
  imports: [
    CommonModule,
    ReferenciaPagoRoutingModule
  ]
})
export class ReferenciaPagoModule { }

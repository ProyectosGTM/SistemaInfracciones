import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstatusPagoRoutingModule } from './estatus-pago-routing.module';
import { ConsultaEstatusPagoComponent } from './consulta-estatus-pago/consulta-estatus-pago.component';


@NgModule({
  declarations: [ConsultaEstatusPagoComponent],
  imports: [
    CommonModule,
    EstatusPagoRoutingModule
  ]
})
export class EstatusPagoModule { }

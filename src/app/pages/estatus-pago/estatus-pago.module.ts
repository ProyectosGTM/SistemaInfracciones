import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstatusPagoRoutingModule } from './estatus-pago-routing.module';
import { ConsultaEstatusPagoComponent } from './consulta-estatus-pago/consulta-estatus-pago.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DxDateBoxModule, DxLoadIndicatorModule } from 'devextreme-angular';


@NgModule({
  declarations: [ConsultaEstatusPagoComponent],
  imports: [
    CommonModule,
    EstatusPagoRoutingModule,
    ReactiveFormsModule,
    DxDateBoxModule,
    DxLoadIndicatorModule
  ]
})
export class EstatusPagoModule { }

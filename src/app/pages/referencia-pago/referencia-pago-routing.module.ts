import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaReferenciaPagoComponent } from './alta-referencia-pago/alta-referencia-pago.component';

const routes: Routes = 
[
  { 
    path: 'generar-referencia',
    component:AltaReferenciaPagoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferenciaPagoRoutingModule { }

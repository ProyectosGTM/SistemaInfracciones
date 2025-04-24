import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaEstatusPagoComponent } from './consulta-estatus-pago/consulta-estatus-pago.component';

const routes: Routes = 
[
  { 
    path: 'consulta-estatus',
    component:ConsultaEstatusPagoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstatusPagoRoutingModule { }

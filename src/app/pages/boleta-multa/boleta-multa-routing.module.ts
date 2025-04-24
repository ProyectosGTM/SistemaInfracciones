import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaBoletaMultaComponent } from './alta-boleta-multa/alta-boleta-multa.component';

const routes: Routes = 
[
  { 
    path: 'generar-boleta',
    component:AltaBoletaMultaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoletaMultaRoutingModule { }

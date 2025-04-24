import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoletaMultaRoutingModule } from './boleta-multa-routing.module';
import { AltaBoletaMultaComponent } from './alta-boleta-multa/alta-boleta-multa.component';


@NgModule({
  declarations: [AltaBoletaMultaComponent],
  imports: [
    CommonModule,
    BoletaMultaRoutingModule
  ]
})
export class BoletaMultaModule { }

import { Component, OnInit } from '@angular/core';
import { fadeInUpAnimation } from 'src/app/core/animations/fade-in-up.animation';

@Component({
  selector: 'app-consulta-estatus-pago',
  templateUrl: './consulta-estatus-pago.component.html',
  styleUrl: './consulta-estatus-pago.component.scss',
  animations: [fadeInUpAnimation]
})
export class ConsultaEstatusPagoComponent implements OnInit {

  public showForm: boolean = true;
  public showAlertSuccess: boolean = false;

  constructor(){

  }

  ngOnInit(): void {
      
  }

  mostrarAlerta(){
    this.showAlertSuccess = true;
    this.showForm = false;
  }

  mostrarForm(){
    this.showForm = true;
    this.showAlertSuccess = false;
  }

  sanitizeInput(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    const sanitizedValue = inputElement.value.replace(/[^A-Za-z0-9]/g, '');
    inputElement.value = sanitizedValue.slice(0, 13);
    // this.clientesForm.get('rfc')?.setValue(inputElement.value, { emitEvent: false });
  }

}

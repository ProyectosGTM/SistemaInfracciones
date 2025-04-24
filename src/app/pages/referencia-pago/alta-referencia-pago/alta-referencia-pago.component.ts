import { Component, OnInit } from '@angular/core';
import { fadeInUpAnimation } from 'src/app/core/animations/fade-in-up.animation';

@Component({
  selector: 'app-alta-referencia-pago',
  templateUrl: './alta-referencia-pago.component.html',
  styleUrl: './alta-referencia-pago.component.scss',
  animations: [fadeInUpAnimation]
})
export class AltaReferenciaPagoComponent implements OnInit {
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

  sanitizeInputRFC(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    const sanitizedValue = inputElement.value.replace(/[^A-Za-z0-9]/g, '');
    inputElement.value = sanitizedValue.slice(0, 13);
    // this.clientesForm.get('rfc')?.setValue(inputElement.value, { emitEvent: false });
  }

  sanitizeInputCURP(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    const sanitizedValue = inputElement.value.replace(/[^A-Za-z0-9]/g, '');
    inputElement.value = sanitizedValue.slice(0, 18);
    // this.clientesForm.get('rfc')?.setValue(inputElement.value, { emitEvent: false });
  }
}
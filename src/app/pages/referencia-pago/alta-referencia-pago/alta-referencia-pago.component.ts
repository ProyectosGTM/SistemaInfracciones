import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public referenciaForm: FormGroup;
    public title = 'Alta Modulo';
    public idModulo: number;
    public loading: boolean = false;
    public submitButton: string = 'Guardar';

  constructor(private fb: FormBuilder,){

  }

  ngOnInit(): void {
      this.initForm()
  }

  initForm() {
    
    const hoy = new Date();
  const fechaIni = `${hoy.getFullYear()}-${(hoy.getMonth() + 1).toString().padStart(2, '0')}-${hoy.getDate().toString().padStart(2, '0')}`;

  const fechaFinDate = new Date(hoy);
  fechaFinDate.setDate(hoy.getDate() + 30);
  const fechaFin = `${fechaFinDate.getFullYear()}-${(fechaFinDate.getMonth() + 1).toString().padStart(2, '0')}-${fechaFinDate.getDate().toString().padStart(2, '0')}`;

    this.referenciaForm = this.fb.group({
      usuario: ['WSSP'],
      contrasena: ['sAH1c451'],
      vNombreOpd: ['NombreDep'],
      vConceptosCobrados: ['1'],
      vImporteCobrado: [null, Validators.required],
      vFechaIni: [fechaIni],
      vFechaFin: [fechaFin],
      vNombreRazon: ['Empresa SA'],
      vRfc: [null],
      vDomicilio: [null],
      vCurp: [null],
      vNombreLegal: [null],
      vRfcLegal: [null],
      vCurpLegal: [null],
      vMatricula: [null],
      conceptos: this.fb.array([
        this.fb.group({
          id: [1],
          vEjercicioFiscal: [2025],
          vImporteCobrado: [null],
          vDescConcepto: [null],
          vIdConcepto: ['13'],
          vMateria: ['Mat'],
          vSemestre: [1]
        })
      ])
    });
  }
  
  nombre: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  actualizarNombreLegal(event: any, tipo: string) {
    const valor = event.target.value;

    if (tipo === 'nombre') {
      this.nombre = valor;
    } else if (tipo === 'apellidoPaterno') {
      this.apellidoPaterno = valor;
    } else if (tipo === 'apellidoMaterno') {
      this.apellidoMaterno = valor;
    }

    const nombreCompleto = `${this.nombre} ${this.apellidoPaterno} ${this.apellidoMaterno}`.trim();

    this.referenciaForm.get('vNombreLegal')?.setValue(nombreCompleto);
  }

  actualizarImportes(event: any) {
    const valor = event.target.value;
  
    // Actualiza vImporteCobrado del formulario principal
    this.referenciaForm.get('vImporteCobrado')?.setValue(valor);
  
    // Actualiza vImporteCobrado del primer concepto en el FormArray
    const conceptosArray = this.referenciaForm.get('conceptos') as FormArray;
    if (conceptosArray && conceptosArray.length > 0) {
      conceptosArray.at(0).get('vImporteCobrado')?.setValue(valor);
    }
  }
  

  calle: string = '';
exterior: string = '';
interior: string = '';
colonia: string = '';
cp: string = '';
municipio: string = '';
entidad: string = '';

actualizarDomicilio(event: any, tipo: string) {
  const valor = event.target.value;

  if (tipo === 'calle') {
    this.calle = valor;
  } else if (tipo === 'exterior') {
    this.exterior = valor;
  } else if (tipo === 'interior') {
    this.interior = valor;
  } else if (tipo === 'colonia') {
    this.colonia = valor;
  } else if (tipo === 'cp') {
    this.cp = valor;
  } else if (tipo === 'municipio') {
    this.municipio = valor;
  } else if (tipo === 'entidad') {
    this.entidad = valor;
  }

  const domicilioCompleto = `${this.calle} #${this.exterior}${this.interior ? ' Int. ' + this.interior : ''}, Col. ${this.colonia}, CP ${this.cp}, ${this.municipio}, ${this.entidad}`.trim();

  this.referenciaForm.get('vDomicilio')?.setValue(domicilioCompleto);
}



  verDatos(){
    console.log('Datos:', this.referenciaForm.value)
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

  actualizarRFCs(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const sanitizedValue = inputElement.value.replace(/[^A-Za-z0-9]/g, '');
    inputElement.value = sanitizedValue.slice(0, 13);
    let valor = event.target.value;
  
    // Opcional: Si quieres limpiar espacios, quitar minúsculas, etc.
    valor = valor.toUpperCase().trim();
  
    // Actualiza vRfc
    this.referenciaForm.get('vRfc')?.setValue(valor);
  
    // Actualiza vRfcLegal
    this.referenciaForm.get('vRfcLegal')?.setValue(valor);
  }
  

  sanitizeInputCURP(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    const sanitizedValue = inputElement.value.replace(/[^A-Za-z0-9]/g, '');
    inputElement.value = sanitizedValue.slice(0, 18);
    // this.clientesForm.get('rfc')?.setValue(inputElement.value, { emitEvent: false });
  }
}
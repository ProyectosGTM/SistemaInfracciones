import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeInUpAnimation } from 'src/app/core/animations/fade-in-up.animation';
import { EstatusPagoService } from 'src/app/shared/services/estatus-pago.service';
import Swal from 'sweetalert2';

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
  public submitButton: string = 'Enviar Datos';
  multasFiltradas: any[] = [];

  calle: string = '';
  exterior: string = '';
  interior: string = '';
  colonia: string = '';
  cp: string = '';
  municipio: string = '';
  entidad: string = '';
  public estatusService: string;
  public referenciaService: string;
  public fechaVencService: string;
  public respuestaLineaCaptura: any = null;
  public foliosService: any;

  todasLasMultas = [
    { categoria: 'Placas', descripcion: 'LA01 - Colocación incorrecta de placas. - Art. 26' },
    { categoria: 'Placas', descripcion: 'LA02 - Colocar dispositivos u objetos que se asemejen. - Art. 27' },
    { categoria: 'Placas', descripcion: 'LA03 - Prohibido colocar objetos reflejantes. - Art. 29' },
    { categoria: 'Calcomanías', descripcion: 'LB01 - No colocar el engomado. - Art. 26' },
    { categoria: 'Calcomanías', descripcion: 'LB02 - Colocación incorrecta. - Art. 26' },
    { categoria: 'Luces', descripcion: 'LC01 - Falta de fanales delanteros de luz blanca y fija. - Art. 32 fracc. VI' },
    { categoria: 'Luces', descripcion: 'LC02 - Usar los faros de niebla como luz principal. - Art. 32 VII' },
    { categoria: 'Luces', descripcion: 'LC03 - No usar luces direccionales para cambios de dirección. - Art. 69' },
    { categoria: 'Carece de dispositivos', descripcion: 'LD01 - Mal estado de funcionamiento. - Art. 32 fracc. I' },
    { categoria: 'Carece de dispositivos', descripcion: 'LD02 - Claxon o Bocina. - Art. 32 fracc. II' },
    { categoria: 'Carece de dispositivos', descripcion: 'LD03 - Velocímetro. - Art. 32 fracc. V' },
    { categoria: 'Carece de dispositivos', descripcion: 'LD04 - Silenciador. - Art. 32 fracc. XI' },
    { categoria: 'Carece de dispositivos', descripcion: 'LD05 - Espejos retrovisores. - Art. 32 fracc. IX' },
    { categoria: 'Carece de dispositivos', descripcion: 'LD06 - Cinturones de seguridad. - Art. 32 fracc. XV' },
    { categoria: 'Carece de dispositivos', descripcion: 'LD07 - Limpiadores de parabrisas. - Art. 32 fracc. XII' }
  ];

  constructor(
    private fb: FormBuilder,
    private estatusPago: EstatusPagoService,
  ) { }

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
      vRfc: [null, Validators.required],
      vDomicilio: [null, Validators.required],
      vCurp: [null, Validators.required],
      vNombreLegal: [null, Validators.required],
      vRfcLegal: [null, Validators.required],
      vCurpLegal: [null, Validators.required],
      vMatricula: [null, Validators.required],
      conceptos: this.fb.array([
        this.fb.group({
          id: [1],
          vEjercicioFiscal: [2025],
          vImporteCobrado: [null, Validators.required],
          vDescConcepto: [null, Validators.required],
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
    const domicilioCompleto = `${this.calle}, ${this.exterior}, ${this.interior ? + this.interior : ''}, ${this.colonia}, ${this.cp}, ${this.municipio}, ${this.entidad}`.trim();
    this.referenciaForm.get('vDomicilio')?.setValue(domicilioCompleto);
  }

  
  verDatos() {
    if (this.referenciaForm.invalid) {
      this.referenciaForm.markAllAsTouched();

      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor llena todos los campos obligatorios antes de continuar.',
        confirmButtonText: 'Aceptar'
      });

      return;
    }

    console.log('Datos:', this.referenciaForm.value);
    this.loading = true;
    this.submitButton = 'Guardando...';

    this.estatusPago.generarReferencia(this.referenciaForm.value).subscribe(
      (response) => {
        this.submitButton = 'Enviar Datos';
        this.loading = false;
        this.showAlertSuccess = true;
        this.showForm = false;

        this.estatusService = response.estatus;
        this.fechaVencService = response.fechaVencimiento;
        this.referenciaService = response.referencia;
        this.foliosService = response.folio

        const hoy = new Date();
        const dia = hoy.getDate().toString().padStart(2, '0');
        const mes = (hoy.getMonth() + 1).toString().padStart(2, '0');
        const anio = hoy.getFullYear();
        const fechaGeneracion = `${dia}/${mes}/${anio}`;
        response.fechaGeneracion = fechaGeneracion;

        this.respuestaLineaCaptura = response;
      },
      (error) => {
        this.showForm = true;
        this.showAlertSuccess = false;
        this.submitButton = 'Enviar Datos';
        this.loading = false;
      }
    );
  }

  filtrarMultas(event: any) {
    const categoria = event.target.value;
    this.multasFiltradas = this.todasLasMultas.filter(
      m => m.categoria.toLowerCase() === categoria.toLowerCase()
    );
  }

  asignarDescripcionMulta(event: any) {
    const descripcionSeleccionada = event.target.value;

    const conceptos = this.referenciaForm.get('conceptos') as FormArray;
    if (conceptos && conceptos.length > 0) {
      conceptos.at(0).get('vDescConcepto')?.setValue(descripcionSeleccionada);
    }
  }

  mostrarAlerta() {
    this.showAlertSuccess = true;
    this.showForm = false;
  }

  mostrarForm() {
    this.showForm = true;
    this.showAlertSuccess = false;
  }

  actualizarRFCs(event: any) {
    // const inputElement = event.target as HTMLInputElement;
    // const sanitizedValue = inputElement.value.replace(/[^A-Za-z0-9]/g, '');
    // inputElement.value = sanitizedValue.slice(0, 13);
    let valor = event.target.value;

    valor = valor.toUpperCase().trim();
    this.referenciaForm.get('vRfc')?.setValue(valor);
    this.referenciaForm.get('vRfcLegal')?.setValue(valor);
  }

  actualizarCURPs() {
    // const inputElement = event.target as HTMLInputElement;
    // const sanitizedValue = inputElement.value.replace(/[^A-Za-z0-9]/g, '');
    // inputElement.value = sanitizedValue.slice(0, 18);
    const valor = this.referenciaForm.get('vCurp')?.value;

    if (valor !== null && valor !== undefined) {
      const limpio = valor.toUpperCase().trim();
      this.referenciaForm.get('vCurp')?.setValue(limpio, { emitEvent: false });
      this.referenciaForm.get('vCurpLegal')?.setValue(limpio);
    }
  }

  actualizarImportes() {
    const valor = this.referenciaForm.get('vImporteCobrado')?.value;
    if (valor !== null && valor !== undefined) {
      const limpio = valor.toString().trim();
      this.referenciaForm.get('vImporteCobrado')?.setValue(limpio, { emitEvent: false });
      const conceptosArray = this.referenciaForm.get('conceptos') as FormArray;
      if (conceptosArray && conceptosArray.length > 0) {
        conceptosArray.at(0).get('vImporteCobrado')?.setValue(limpio);
      }
    }
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
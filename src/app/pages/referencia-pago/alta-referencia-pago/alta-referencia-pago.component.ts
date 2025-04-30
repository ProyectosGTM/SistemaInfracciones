import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeInUpAnimation } from 'src/app/core/animations/fade-in-up.animation';
import { EstatusPagoService } from 'src/app/shared/services/estatus-pago.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


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
    { categoria: 'Placas', descripcion: 'LA01 - Colocación incorrecta de placas. - Art. 26', monto: 1131.4 },
    { categoria: 'Placas', descripcion: 'LA02 - Colocar dispositivos u objetos que se asemejen. - Art. 27', monto: 565.7 },
    { categoria: 'Placas', descripcion: 'LA03 - Prohibido colocar objetos reflejantes. - Art. 29', monto: 1131.4 },
    { categoria: 'Calcomanías', descripcion: 'LB01 - No colocar el engomado. - Art. 26', monto: 565.7 },
    { categoria: 'Calcomanías', descripcion: 'LB02 - Colocación incorrecta. - Art. 26', monto: 1131.4 },
    { categoria: 'Luces', descripcion: 'LC01 - Falta de fanales delanteros... - Art. 32 fracc. VI', monto: 565.7 },
    { categoria: 'Luces', descripcion: 'LC02 - Usar los faros de niebla como luz principal. - Art. 32 VII', monto: 1131.4 },
    { categoria: 'Luces', descripcion: 'LC03 - No usar luces direccionales... - Art. 69', monto: 565.7 },
    { categoria: 'Carece de dispositivos', descripcion: 'LD01 - Mal estado de funcionamiento. - Art. 32 fracc. I', monto: 1131.4 },
    { categoria: 'Carece de dispositivos', descripcion: 'LD02 - Claxon o Bocina. - Art. 32 fracc. II', monto: 565.7 },
    { categoria: 'Carece de dispositivos', descripcion: 'LD03 - Velocímetro. - Art. 32 fracc. V', monto: 1131.4 },
    { categoria: 'Carece de dispositivos', descripcion: 'LD04 - Silenciador. - Art. 32 fracc. XI', monto: 565.7 },
    { categoria: 'Carece de dispositivos', descripcion: 'LD05 - Espejos retrovisores. - Art. 32 fracc. IX', monto: 1131.4 },
    { categoria: 'Carece de dispositivos', descripcion: 'LD06 - Cinturones de seguridad. - Art. 32 fracc. XV', monto: 1131.4 },
    { categoria: 'Carece de dispositivos', descripcion: 'LD07 - Limpiadores de parabrisas. - Art. 32 fracc. XII', monto: 565.7 }
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
    const domicilioCompleto = `${this.calle}, ${this.exterior}, ${this.interior}, ${this.colonia}, ${this.cp}, ${this.municipio}, ${this.entidad}`.trim();
    this.referenciaForm.get('vDomicilio')?.setValue(domicilioCompleto);
  }

  asignarDescripcionMulta(event: any) {
    const descripcionSeleccionada = event.target.value;
    const multaSeleccionada = this.todasLasMultas.find(m => m.descripcion === descripcionSeleccionada);

    const conceptos = this.referenciaForm.get('conceptos') as FormArray;

    if (conceptos && conceptos.length > 0) {
      conceptos.at(0).get('vDescConcepto')?.setValue(descripcionSeleccionada);

      if (multaSeleccionada) {
        const montoStr = multaSeleccionada.monto.toString();

        conceptos.at(0).get('vImporteCobrado')?.setValue(montoStr);
        this.referenciaForm.get('vImporteCobrado')?.setValue(montoStr);
      }
    }
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


    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [80, 300] 
    });

    let y = 5;
    const lineHeight = 4;

    const fechaHoy = new Date();
    const fecha = `${fechaHoy.getDate().toString().padStart(2, '0')}/${(fechaHoy.getMonth() + 1).toString().padStart(2, '0')}/${fechaHoy.getFullYear()}`;
    const hora = `${fechaHoy.getHours().toString().padStart(2, '0')}:${fechaHoy.getMinutes().toString().padStart(2, '0')}:${fechaHoy.getSeconds().toString().padStart(2, '0')}`;

    const drawText = (text: string, options: { bold?: boolean, red?: boolean, align?: 'center' | 'left' } = {}) => {
      doc.setFont('helvetica', options.bold ? 'bold' : 'normal');
      doc.setFontSize(8); 
      doc.setTextColor(options.red ? 200 : 0, 0, 0);
      const lines = doc.splitTextToSize(text, 70);
      doc.text(lines, 5, y, { align: options.align || 'left' });
      y += lines.length * lineHeight;
    };

    
    doc.addImage('../../../../assets/images/logoGobierno.jpeg', 'JPEG', 5, y, 25, 10);
    doc.addImage('../../../../assets/images/logoCompleto.jpeg', 'JPEG', 40, y, 30, 10);
    y += 18;


    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('NUEVA INFRACCIÓN DE TRÁNSITO', 38, y, { align: 'center' });
    y += lineHeight;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(200, 0, 0);
    doc.text('FOLIO MULTA: ID-REGISTRO-MULTA', 38, y, { align: 'center' });
    y += lineHeight;

    doc.text(`FECHA: ${fecha}   HORA: ${hora}`, 38, y, { align: 'center' });
    y += 6;



    y += 3;

    drawText(
      `EXPEDICIÓN ELECTRÓNICA DE INFRACCIÓN A VEHÍCULOS Y/O CONDUCTORES QUE CONTRAVENGAN LAS DISPOSICIONES DEL REGLAMENTO DE TRÁNSITO DEL ESTADO DE TAMAULIPAS, LAS CUALES SON DE ORDEN PÚBLICO E INTERÉS SOCIAL Y DE APLICACIÓN OBLIGATORIA EN EL ESTADO DE TAMAULIPAS, REGLAMENTARIAS DE LA LEY DE TRÁNSITO, LAS CUALES TIENEN POR OBJETO REGULAR LA CIRCULACIÓN DE PERSONAS PEATONES Y VEHÍCULOS EN LA VÍA PÚBLICA Y LA SEGURIDAD VIAL DEL ESTADO Y SUS MUNICIPIOS, EN VÍAS DE JURISDICCIÓN ESTATAL Y EN AQUELLAS DE CARÁCTER FEDERAL, CUYA VIGILANCIA Y CONTROL CONVENGAN CON LA FEDERACIÓN.`,
      { align: 'left' } 
    );


    y -= 5; 

    

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('DATOS DEL CONDUCTOR', 5, y);
    y += lineHeight;

    doc.setFont('helvetica', 'normal');

    doc.setTextColor(0, 0, 0);
    doc.text('NOMBRE:', 5, y);
    doc.setTextColor(200, 0, 0);
    doc.text(this.referenciaForm.get('vNombreLegal')?.value || '', 5 + doc.getTextWidth('NOMBRE:') + 2, y);
    y += lineHeight;

    doc.setTextColor(0, 0, 0);
    doc.text('CURP:', 5, y);
    doc.setTextColor(200, 0, 0);
    doc.text(String(this.referenciaForm.get('vCurp')?.value || ''), 5 + doc.getTextWidth('CURP:') + 1, y);
    y += lineHeight;

    doc.setTextColor(0, 0, 0);
    doc.text('CORREO ELECTRÓNICO:', 5, y);
    doc.setTextColor(200, 0, 0);
    doc.text('JCGOVEA@HOTMAIL.COM', 5 + doc.getTextWidth('CORREO ELECTRÓNICO:') + 1, y);
    y += lineHeight;

    doc.setTextColor(0, 0, 0);
    doc.text('DOMICILIO:', 5, y);
    y += lineHeight;

    doc.setTextColor(200, 0, 0);
    const domicilio = String(this.referenciaForm.get('vDomicilio')?.value || '');
    const domicilioLines = doc.splitTextToSize(domicilio, 70); 
    doc.text(domicilioLines, 5, y);
    y += domicilioLines.length * lineHeight;


    doc.setTextColor(0, 0, 0);
    doc.text('NÚMERO DE LICENCIA:', 5, y);
    doc.setTextColor(200, 0, 0);
    doc.text('2343249932432', 5 + doc.getTextWidth('NÚMERO DE LICENCIA:') + 2, y);
    y += lineHeight;

    doc.setTextColor(0, 0, 0);
    doc.text('TIPO DE LICENCIA:', 5, y);
    doc.setTextColor(200, 0, 0);
    doc.text('CHOFER PARTICULAR', 5 + doc.getTextWidth('TIPO DE LICENCIA:') + 2, y);
    y += lineHeight;


    y += 5;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);
    doc.text('DATOS DEL VEHÍCULO MOTORIZADO', 5, y);
    y += lineHeight;

    const printLabelValue = (label: string, value: string) => {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      const labelWidth = doc.getTextWidth(label);
      const availableWidth = 70 - labelWidth - 2;

      if (doc.getTextWidth(value) > availableWidth) {
        
        doc.text(label, 5, y);
        y += lineHeight;
        doc.setTextColor(200, 0, 0);
        const lines = doc.splitTextToSize(value, 70);
        doc.text(lines, 5, y);
        y += lines.length * lineHeight;
      } else {
        
        doc.text(label, 5, y);
        doc.setTextColor(200, 0, 0);
        doc.text(value, 5 + labelWidth + 2, y);
        y += lineHeight;
      }
    };

    
    printLabelValue('PLACAS / NÚMERO DE PERMISO DE CIRCULACIÓN:', 'MML392A');
    printLabelValue('NÚMERO DE SERIE:', 'NUMERO_SERIE_MOTOR');

    
    const label1 = 'MARCA:';
    const value1 = 'TOYOTA';
    const label2 = 'SUBMARCA:';
    const value2 = 'RAV4';

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text(label1, 5, y);
    doc.setTextColor(200, 0, 0);
    doc.text(value1, 5 + doc.getTextWidth(label1) + 1, y);

    doc.setTextColor(0, 0, 0);
    doc.text(label2, 45, y);
    doc.setTextColor(200, 0, 0);
    doc.text(value2, 45 + doc.getTextWidth(label2) + 1, y);
    y += lineHeight;

    
    doc.setTextColor(0, 0, 0);
    doc.text('TIPO:', 5, y);
    doc.setTextColor(200, 0, 0);
    doc.text('MINIVAN', 5 + doc.getTextWidth('TIPO:') + 2, y);

    doc.setTextColor(0, 0, 0);
    doc.text('COLOR:', 45, y);
    doc.setTextColor(200, 0, 0);
    doc.text('NEGRO', 45 + doc.getTextWidth('COLOR:') + 2, y);
    y += lineHeight;

    
    y += 5;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('DATOS DEL PROPIETARIO', 5, y);
    y += lineHeight;

    
    const propietario = 'NOMBRE_COMPLETO_DEL_PROPIETARIO'; 

    doc.setFont('helvetica', 'normal');
    if (doc.getTextWidth(propietario) > 70) {
      
      const lines = doc.splitTextToSize(propietario, 70);
      doc.setTextColor(200, 0, 0);
      doc.text(lines, 5, y);
      y += lines.length * lineHeight;
    } else {
      doc.setTextColor(200, 0, 0);
      doc.text(propietario, 5, y);
      y += lineHeight;
    }


    
    y += 5;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('DATOS DEL HECHO DE LA CONDUCTA INFRACTORA', 5, y);
    y += lineHeight;

    doc.setFont('helvetica', 'normal');

    
    doc.setTextColor(0, 0, 0);
    doc.text('FECHA:', 5, y);
    doc.setTextColor(200, 0, 0);
    doc.text('25/04/2025', 17, y);

    doc.setTextColor(0, 0, 0);
    doc.text('HORA:', 40, y);
    doc.setTextColor(200, 0, 0);
    doc.text('22:23:34', 50, y);
    y += lineHeight;

    
    doc.setTextColor(0, 0, 0);
    doc.text('LATITUD:', 5, y);
    doc.setTextColor(200, 0, 0);
    doc.text('23.715136', 19, y);

    doc.setTextColor(0, 0, 0);
    doc.text('LONGITUD:', 40, y);
    doc.setTextColor(200, 0, 0);
    doc.text('-99.170905', 57, y);
    y += lineHeight;

    
    const etiquetaDireccion = 'DIRECCIÓN:';
    const direccionCompleta = 'CALLE Calzada General Luis Caballero ESQUINA: EMILIANO ZAPATA COLONIA: DEL MAESTRO C.P. 87070';

    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    const etiquetaWidth = doc.getTextWidth(etiquetaDireccion);

    
    doc.text(etiquetaDireccion, 5, y);

    
    doc.setTextColor(200, 0, 0);
    const direccionLines = doc.splitTextToSize(direccionCompleta, 68 - etiquetaWidth - 2);

    
    doc.text(direccionLines[0], 5 + etiquetaWidth + 2, y);

    
    for (let i = 1; i < direccionLines.length; i++) {
      y += lineHeight;
      doc.text(direccionLines[i], 5, y);
    }
    y += lineHeight;


    doc.setTextColor(0, 0, 0);
    doc.text('DESCRIPCIÓN:', 5, y);
    y += lineHeight;

    const descSeleccionada = this.referenciaForm.get('conceptos')?.value?.[0]?.vDescConcepto || '';
    doc.setTextColor(200, 0, 0);
    const descLines = doc.splitTextToSize(descSeleccionada, 70);
    doc.text(descLines, 5, y);
    y += descLines.length * lineHeight;



    y += 15;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Firma del infractor: __________________________', 5, y);
    y += lineHeight;


    y += 15;

    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('FOLIO MULTA:', 5, y);
    doc.setTextColor(200, 0, 0);
    doc.text('ID-REGISTRO-MULTA', 27, y);
    y += lineHeight + 1;

    
    doc.setTextColor(0, 0, 0);
    const textoIntro = 'CONFORME AL ARTÍCULO 150 DEL CITADO REGLAMENTO SE OFRECE LO SIGUIENTE';
    const introLines = doc.splitTextToSize(textoIntro, 70);
    doc.text(introLines, 5, y);
    y += introLines.length * lineHeight;

    
    doc.setFont('helvetica', 'bold');
    const titulo = 'REFERENCIA DE PAGO1 (DESCUENTO ANTES DE 48 HRS):';
    const tituloLines = doc.splitTextToSize(titulo, 70);
    doc.text(tituloLines, 5, y);
    y += tituloLines.length * lineHeight;

    
    const drawCampo = (label: string, value: string) => {
      const labelX = 5;
      const valueX = 33; 
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(label, labelX, y);
      doc.setTextColor(200, 0, 0);
      doc.text(value, valueX, y);
      y += lineHeight;
    };

    
    doc.setTextColor(0, 0, 0);
    doc.text('No:', 5, y);
    doc.setTextColor(200, 0, 0);
    doc.text('13000667295625040421', 11, y);
    y += lineHeight;

    
    doc.setTextColor(0, 0, 0);
    doc.text('MONTO:', 5, y);
    doc.setTextColor(200, 0, 0);
    doc.text('$'+this.referenciaForm.get('vImporteCobrado')?.value, 19, y);
    y += lineHeight;

    
    const hoy = new Date();
    const fechaIni = `${hoy.getFullYear()}-${(hoy.getMonth() + 1).toString().padStart(2, '0')}-${hoy.getDate().toString().padStart(2, '0')}`;

    const fechaFinDate = new Date(hoy);
    fechaFinDate.setDate(hoy.getDate() + 30);
    const fechaFin = `${fechaFinDate.getFullYear()}-${(fechaFinDate.getMonth() + 1).toString().padStart(2, '0')}-${fechaFinDate.getDate().toString().padStart(2, '0')}`;

    
    doc.setTextColor(0, 0, 0);
    doc.text('VIGENCIA:', 5, y);
    doc.setTextColor(200, 0, 0);
    doc.text(fechaFin, 21, y);
    y += lineHeight;


    doc.save('encabezado_ticket.pdf');


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


    this.referenciaForm.get('vImporteCobrado')?.reset();
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
    
    
    
    let valor = event.target.value;

    valor = valor.toUpperCase().trim();
    this.referenciaForm.get('vRfc')?.setValue(valor);
    this.referenciaForm.get('vRfcLegal')?.setValue(valor);
  }

  actualizarCURPs() {
    
    
    
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
    
  }

  sanitizeInputCURP(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    const sanitizedValue = inputElement.value.replace(/[^A-Za-z0-9]/g, '');
    inputElement.value = sanitizedValue.slice(0, 18);
    
  }
}
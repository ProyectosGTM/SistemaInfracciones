import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeInUpAnimation } from 'src/app/core/animations/fade-in-up.animation';
import { EstatusPagoService } from 'src/app/shared/services/estatus-pago.service';

@Component({
  selector: 'app-consulta-estatus-pago',
  templateUrl: './consulta-estatus-pago.component.html',
  styleUrl: './consulta-estatus-pago.component.scss',
  animations: [fadeInUpAnimation]
})
export class ConsultaEstatusPagoComponent implements OnInit {

  public showForm: boolean = true;
  public showAlertSuccess: boolean = false;

  public estatusForm: FormGroup;
	public title = 'Alta Modulo';
	public idModulo: number;
	public loading: boolean = false;
	public submitButton: string = 'Enviar Datos';

  constructor(
    private estatusPago: EstatusPagoService,
    private fb: FormBuilder,
  ){
  }

  ngOnInit(): void {
      this.initForm()
  }

  initForm() {
		this.estatusForm = this.fb.group({
			usuario: [null],
      contrasena: [null],
      folio: ['', Validators.required],
      obligacion: ['', Validators.required],
      curp: ['', Validators.required],
      rfc: ['', Validators.required],
      fechaPago: ['', Validators.required],
		})
	}

  public folioRespuesta: string;
  public estatusRespuesta: string;
  public fechaRespuesta: string;
  public rfcRespuesta: string;
  public importeRespuesta: string; //no manda servicio
  public fechaVencimientoRespuesta: string; //no manda servicio

  public estadoNoPagado: boolean = false; // Nuevo

  obtenerEstatus() {
    this.loading = true;
    this.submitButton = 'Guardando...';
    console.log('datos:', this.estatusForm.value)
		this.estatusPago.obtenerEstatus(this.estatusForm.value).subscribe(
			(response) => {
				this.submitButton = 'Enviar Datos';
				this.loading = false;
        this.showAlertSuccess = true;
        this.showForm = false;


        this.folioRespuesta = response.folio;
        this.estatusRespuesta = response.estado;
        this.fechaVencimientoRespuesta = this.estatusForm.get('fechaPago').value;
        this.rfcRespuesta = this.estatusForm.get('rfc').value;

        this.estadoNoPagado = (response.estado?.toUpperCase() === "NO PAGADO");

			}, (error) => {
        this.showForm = true;
        this.showAlertSuccess = false;
				this.submitButton = 'Enviar Datos';
				this.loading = false;
			}
		);
	}

  mostrarAlerta(){
    this.showAlertSuccess = true;
    this.showForm = false;
  }

  mostrarForm(){
    this.estatusForm.reset()
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
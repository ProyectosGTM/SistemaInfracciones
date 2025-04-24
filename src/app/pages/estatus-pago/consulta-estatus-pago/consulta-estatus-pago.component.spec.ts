import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaEstatusPagoComponent } from './consulta-estatus-pago.component';

describe('ConsultaEstatusPagoComponent', () => {
  let component: ConsultaEstatusPagoComponent;
  let fixture: ComponentFixture<ConsultaEstatusPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaEstatusPagoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaEstatusPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

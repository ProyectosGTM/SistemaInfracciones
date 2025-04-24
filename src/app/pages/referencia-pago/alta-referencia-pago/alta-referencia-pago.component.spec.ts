import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaReferenciaPagoComponent } from './alta-referencia-pago.component';

describe('AltaReferenciaPagoComponent', () => {
  let component: AltaReferenciaPagoComponent;
  let fixture: ComponentFixture<AltaReferenciaPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltaReferenciaPagoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AltaReferenciaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

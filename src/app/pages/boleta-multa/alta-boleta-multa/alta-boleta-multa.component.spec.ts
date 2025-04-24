import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaBoletaMultaComponent } from './alta-boleta-multa.component';

describe('AltaBoletaMultaComponent', () => {
  let component: AltaBoletaMultaComponent;
  let fixture: ComponentFixture<AltaBoletaMultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltaBoletaMultaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AltaBoletaMultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

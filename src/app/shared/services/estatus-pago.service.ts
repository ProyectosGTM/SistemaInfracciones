import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstatusPagoService {

  constructor(private http: HttpClient) { }

  obtenerEstatus(form: any): Observable<any> {
    return this.http.post<any>(`${environment.API_SECURITY}/api/consulta-estatus`, form);
  }

  generarReferencia(form: any): Observable<any> {
    return this.http.post<any>(`${environment.API_SECURITY}/api/linea-captura`, form);
  }
  
}

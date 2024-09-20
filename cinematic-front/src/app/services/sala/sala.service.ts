import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISala } from '../../model/ISala';
import { Observable } from 'rxjs';
import { Environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<ISala[]> {
    return this.http.get<ISala[]>(`${Environment.urlApi}/sala`);
  }

  findById(id: string): Observable<ISala> {
    return this.http.get<ISala>(`${Environment.urlApi}/sala/${id}`);
  }

  create(sala: ISala): Observable<ISala> {
    return this.http.post<ISala>(`${Environment.urlApi}/sala`, sala);
  }

  filter(filter: { [key: string]: string[] }): Observable<ISala[]> {
    return this.http.patch<ISala[]>(`${Environment.urlApi}/sala/filtro`, filter);
  }

  update(sala: ISala): Observable<ISala> {
    return this.http.patch<ISala>(`${Environment.urlApi}/sala`, sala);
  }

  inativarSala(id: string): Observable<Boolean> {
    return this.http.patch<Boolean>(`${Environment.urlApi}/sala/${id}/inativar`, {});
  }

  ativarSala(id: string): Observable<Boolean> {
    return this.http.patch<Boolean>(`${Environment.urlApi}/sala/${id}/ativar`, {});
  }
}

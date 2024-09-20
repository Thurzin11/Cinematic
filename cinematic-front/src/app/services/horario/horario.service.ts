import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHorario } from '../../model/IHorario';
import { Environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor(private http: HttpClient ) { }

  findAll(): Observable<IHorario[]>{
    return this.http.get<IHorario[]>(`${Environment.urlApi}/horario`);
  }

  findById(id: string): Observable<IHorario> {
    return this.http.get<IHorario>(`${Environment.urlApi}/horario/${id}`);
  }

  create(horario: IHorario): Observable<IHorario> {
    return this.http.post<IHorario>(`${Environment.urlApi}/horario`, horario);
  }

  filter(filter:{ [key:  string]: string[] }): Observable<IHorario[]> {
    return this.http.patch<IHorario[]>(`${Environment.urlApi}/horario/filtro`, filter);
  }

  inativar(id:string): Observable<boolean> {
    return this.http.patch<boolean>(`${Environment.urlApi}/horario/${id}/inativar` , {});
  }

  ativar(id:string): Observable<boolean> {
    return this.http.patch<boolean>(`${Environment.urlApi}/horario/${id}/ativar` , {});
  }
}

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

  create(horario: IHorario): Observable<IHorario> {
    return this.http.post<IHorario>(`${Environment.urlApi}/horario`, horario)
  }
}

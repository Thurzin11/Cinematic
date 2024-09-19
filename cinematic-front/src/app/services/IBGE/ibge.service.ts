import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEstados } from '../../model/IEstados';
import { Environment } from '../../environment';
import { ICidades } from '../../model/ICidades';

@Injectable({
  providedIn: 'root'
})
export class IBGEService {

  constructor(private http: HttpClient) { }

  findEstados(): Observable<IEstados[]>{
    return this.http.get<IEstados[]>(`${Environment.urlIBGE}/estados`);
  }

  findEstadoById(id: string): Observable<IEstados> {
    return this.http.get<IEstados>(`${Environment.urlIBGE}/estados/${id}`);
  }

  findCidadesPorEstado(uf: string): Observable<ICidades[]>{
    return this.http.get<ICidades[]>(`${Environment.urlIBGE}/estados/${uf}/municipios`);
  }
}

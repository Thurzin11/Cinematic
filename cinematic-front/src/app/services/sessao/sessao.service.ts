import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISessao } from '../../model/ISessao';
import { Environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<ISessao[]> {
    return this.http.get<ISessao[]>(`${Environment.urlApi}/sessao`);
  }

  findById(id: string): Observable<ISessao> {
    return this.http.get<ISessao>(`${Environment.urlApi}/sessao/${id}`);
  }
  
  filter(filter:{ [key:  string]: string[] }): Observable<ISessao[]> {
    return this.http.patch<ISessao[]>(`${Environment.urlApi}/sessao/filtro`, filter);
  }

  create(sessao: ISessao): Observable<ISessao> {
    return this.http.post<ISessao>(`${Environment.urlApi}/sessao`, sessao);
  }
}

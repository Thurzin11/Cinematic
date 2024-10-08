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

  findByFilme(nomeFilme: string): Observable<ISessao[]> {
    return this.http.get<ISessao[]>(`${Environment.urlApi}/sessao/filme/${nomeFilme}`);
  }
  
  filter(filter:{ [key:  string]: string[] }): Observable<ISessao[]> {
    return this.http.patch<ISessao[]>(`${Environment.urlApi}/sessao/filtro`, filter);
  }

  create(sessao: ISessao): Observable<ISessao> {
    return this.http.post<ISessao>(`${Environment.urlApi}/sessao`, sessao);
  }

  update(sessao: ISessao): Observable<ISessao> {
    return this.http.patch<ISessao>(`${Environment.urlApi}/sessao`, sessao);
  }

  inativar(id: string): Observable<boolean> {
    return this.http.patch<boolean>(`${Environment.urlApi}/sessao/${id}/inativar`, {});
  }

  ativar(id: string): Observable<boolean> {
    return this.http.patch<boolean>(`${Environment.urlApi}/sessao/${id}/ativar`, {});
  }
}

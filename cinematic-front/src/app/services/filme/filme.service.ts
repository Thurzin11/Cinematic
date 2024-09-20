import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilme } from '../../model/IFilme';
import { Environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<IFilme[]> {
    return this.http.get<IFilme[]>(`${Environment.urlApi}/filme`);
  }

  findAllByDisponibilidade(): Observable<IFilme[]> {
    return this.http.get<IFilme[]>(`${Environment.urlApi}/filme/disponivel`);
  }

  findByNomeIlike(nome: string): Observable<IFilme[]> {
    return this.http.patch<IFilme[]>(`${Environment.urlApi}/filme/nome`, nome);
  }

  filter(filters: { [key: string]: string[] }): Observable<IFilme[]> {
    return this.http.patch<IFilme[]>(`${Environment.urlApi}/filme/filtro`, filters);
  }

  findById(id: string): Observable<IFilme> {
    return this.http.get<IFilme>(`${Environment.urlApi}/filme/${id}`);
  }

  create(filme: IFilme): Observable<IFilme> {
    return this.http.post<IFilme>(`${Environment.urlApi}/filme`, filme)
  }

  update(filme: IFilme): Observable<IFilme> {
    return this.http.patch<IFilme>(`${Environment.urlApi}/filme/${filme.id}`, filme);
  }

  inativar(id: string): Observable<boolean> {
    return this.http.patch<boolean>(`${Environment.urlApi}/filme/${id}/inativar`, {});
  }

  ativar(id: string): Observable<boolean> {
    return this.http.patch<boolean>(`${Environment.urlApi}/filme/${id}/ativar`, {});
  }
}

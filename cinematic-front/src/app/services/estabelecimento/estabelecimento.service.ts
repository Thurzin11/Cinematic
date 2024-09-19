import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEstabelecimento } from '../../model/IEstabelecimento';
import { Environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentoService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<IEstabelecimento[]> {
    return this.http.get<IEstabelecimento[]>(`${Environment.urlApi}/estabelecimento`);
  }

  findById(id: string): Observable<IEstabelecimento> {
    return this.http.get<IEstabelecimento>(`${Environment.urlApi}/estabelecimento/${id}`);
  }

  filter(filters: { [key: string]: string[] }): Observable<IEstabelecimento[]> {
    return this.http.patch<IEstabelecimento[]>(`${Environment.urlApi}/estabelecimento/filtro`, filters);
  }

  create(estabelecimento: IEstabelecimento): Observable<IEstabelecimento>{
    return this.http.post<IEstabelecimento>(`${Environment.urlApi}/estabelecimento`,estabelecimento);
  }

  findByNome(nome: string): Observable<IEstabelecimento[]>{
    return this.http.get<IEstabelecimento[]>(`${Environment.urlApi}/estabelecimento/nome/${nome}`);
  }
}

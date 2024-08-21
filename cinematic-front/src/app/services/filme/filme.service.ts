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
    return this.http.post<IFilme>(`${Environment.urlApi}/filme`, {
      nome: filme.nome,
      categoria: filme.categoria,
      classificacao: filme.classificacao,
      descricao: filme.descricao,
      duracao: filme.duracao,
      dataEstreia: filme.dataEstreia,
      banner: filme.banner,
      status: filme.statusFilme,
      trailers: filme.trailers
    })
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoria } from '../../model/ICategoria';
import { Environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<ICategoria[]> {
    return this.http.get<ICategoria[]>(`${Environment.urlApi}/categoria`);
  }

  findById(id: string): Observable<ICategoria> {
    return this.http.get<ICategoria>(`${Environment.urlApi}/categoria/${id}`);
  }

  findByNomeIlike(nome: string): Observable<ICategoria[]> {
    return this.http.patch<ICategoria[]>(`${Environment.urlApi}/categoria/nome`, nome);
  }

  create(categoria: ICategoria): Observable<ICategoria> {
    return this.http.post<ICategoria>(`${Environment.urlApi}/categoria`, categoria);
  }

  delete(id: string): Observable<Boolean> {
    return this.http.delete<Boolean>(`${Environment.urlApi}/categoria/${id}`);
  }
}

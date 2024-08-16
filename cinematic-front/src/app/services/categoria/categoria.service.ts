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
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAssento } from '../../model/IAssento';
import { Observable } from 'rxjs';
import { Environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class AssentoService {
  private http: HttpClient = inject(HttpClient);

  findById(id: string): Observable<IAssento> {
    return this.http.get<IAssento>(`${Environment.urlApi}/assento/${id}`);
  }
}

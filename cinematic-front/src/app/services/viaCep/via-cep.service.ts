import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IViaCep } from '../../model/IViaCep';
import { Environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  constructor() { }

  private http: HttpClient = inject(HttpClient);

  findEnderecoByCep(cep: string): Observable<IViaCep>{
    return this.http.get<IViaCep>(`${Environment.urlViaCep}/${cep}/json/`);
  }
}

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
}

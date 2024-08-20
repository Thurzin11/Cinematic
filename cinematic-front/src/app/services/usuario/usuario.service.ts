import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuario } from '../../model/IUsuario';
import { Environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<IUsuario[]>{
    return this.http.get<IUsuario[]>(`${Environment.urlApi}/usuario`);
  }

  create(usuario:IUsuario): Observable<IUsuario>{
    return this.http.post<IUsuario>(`${Environment.urlApi}/usuario`,{
      nome: usuario.nome,
      email: usuario.email,
      status: usuario.status,
      tipoUsuario: usuario.tipoUsuario
    });
  }
  findById(id: string): Observable<IUsuario>{
    return this.http.get<IUsuario>(`${Environment.urlApi}/usuario/${id}`)
  }

  update(funcionario: IUsuario): Observable<IUsuario>{
    return this.http.patch<IUsuario>(`${Environment.urlApi}/usuario`,funcionario);
  }
}

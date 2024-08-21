import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuario } from '../../model/IUsuario';
import { Environment } from '../../environment';
import { IUsuarioFilterParams } from '../../model/IUsuarioFilterParams';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<IUsuario[]>{
    return this.http.get<IUsuario[]>(`${Environment.urlApi}/usuario/funcionarios`);
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
  findByNome(nome: string): Observable<IUsuario[]>{
    return this.http.get<IUsuario[]>(`${Environment.urlApi}/usuario/nome/${nome}`);
  }

  filter(filter: IUsuarioFilterParams): Observable<IUsuario[]>{
    return this.http.patch<IUsuario[]>(`${Environment.urlApi}/usuario/filtros`,filter);
  }

  inativarUsuario(id: string): Observable<IUsuario>{
    return this.http.patch<IUsuario>(`${Environment.urlApi}/usuario/funcionarios/inativar/${id}`,null);
  }
}

import { ILoginFuncionario } from './../../model/ILoginFuncionario';
import { IUsuarioFilterParams } from './../../model/IUsuarioFilterParams';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuario } from '../../model/IUsuario';
import { Environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {}

  findAll(): Observable<IUsuario[]>{
    return this.http.get<IUsuario[]>(`${Environment.urlApi}/usuario/funcionarios`);
  }

  create(usuario:IUsuario): Observable<IUsuario>{
    return this.http.post<IUsuario>(`${Environment.urlApi}/usuario/funcionario`,{
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

  filter(filter:{ [key:  string]: string[] }): Observable<IUsuario[]>{
    return this.http.patch<IUsuario[]>(`${Environment.urlApi}/usuario/filtros`,filter);
  }

  inativarUsuario(id: string): Observable<IUsuario>{
    return this.http.patch<IUsuario>(`${Environment.urlApi}/usuario/funcionarios/inativar/${id}`,null);
  }
  ativarUsuario(id: string): Observable<IUsuario>{
    return this.http.patch<IUsuario>(`${Environment.urlApi}/usuario/funcionarios/ativar/${id}`,null);
  }

  loginFuncionario(login: ILoginFuncionario){
    return this.http.patch<IUsuario>(`${Environment.urlApi}/usuario/login/funcionario`,login);
  }
}

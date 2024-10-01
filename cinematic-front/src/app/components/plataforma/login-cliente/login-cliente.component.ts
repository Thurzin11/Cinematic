import { Component, Type, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { ILoginClient } from '../../../model/ILoginClient';
import { ElementOptionsByType } from 'chart.js';
import { IUsuario } from '../../../model/IUsuario';

@Component({
  selector: 'app-login-cliente',
  templateUrl: './login-cliente.component.html',
  styleUrl: './login-cliente.component.scss'
})
export class LoginClienteComponent {
  eyePassword: boolean = true;
  userIsValid: boolean = true;
  camposIsValid: boolean = false;

  login: ILoginClient = {
    email: '',
    password: ''
  }
  constructor(private router: Router, private service: UsuarioService){}

  changeCadastro(): void{
    this.router.navigate([`cadastro`])
  }

  logar(): void{
    this.service.loginClient(this.login).subscribe((usuario)=>{
      this.salvarSessao(usuario);
        this.router.navigate([`home`]);
    },
    erro=>{
      if(erro.status==400){
        this.userIsValid = false;
      }
    }
  )
  }
  seePassword(password: any): void{
    if (password.type.value == 'text') {
      password.type.value = 'password'
    }else{
      password.type.value = 'text'
    }
    this.eyePassword = !this.eyePassword;
  }

  validaCampos(): void{
    if (this.login.email == '' || this.login.password == '') {
      this.camposIsValid = false;
    }else{
      this.camposIsValid = true;
    }
  }
  private salvarSessao(usuario: IUsuario): void {
    sessionStorage.setItem('usuarioId', usuario.id);
    sessionStorage.setItem('usuarioNome', usuario.nome);
    sessionStorage.setItem('usuarioTipo', usuario.tipoUsuario);
  }

}

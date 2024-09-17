import { Component, Type, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { ILoginClient } from '../../../model/ILoginClient';
import { ElementOptionsByType } from 'chart.js';

@Component({
  selector: 'app-login-cliente',
  templateUrl: './login-cliente.component.html',
  styleUrl: './login-cliente.component.scss'
})
export class LoginClienteComponent {
  eyePassword: boolean = false;
  userIsValid: boolean = true;

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
      console.log(usuario);
      if (usuario!=null) {
        this.router.navigate([`home`],{queryParams: {id: usuario.id}});
      }
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

}

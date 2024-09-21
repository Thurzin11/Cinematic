import { UsuarioService } from './../../../services/usuario/usuario.service';
import { Component, inject, Inject } from '@angular/core';
import { ILoginFuncionario } from '../../../model/ILoginFuncionario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-funcionario',
  templateUrl: './login-funcionario.component.html',
  styleUrl: './login-funcionario.component.scss'
})
export class LoginFuncionarioComponent {
  login: ILoginFuncionario = {
    login: '',
    password: ''
  }
  userIsValid: boolean = true;
  eyePassword: boolean = true;
  camposIsValid: boolean = false;

  private service: UsuarioService = inject(UsuarioService);
  private router: Router = inject(Router);

  logar(login: ILoginFuncionario): void{
    this.service.loginFuncionario(login).subscribe((usuario)=>{
      this.router.navigate([`/sistema/home/${usuario.id}`]);
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
    if (this.login.login == '' || this.login.password == '') {
      this.camposIsValid = false;
    }else{
      this.camposIsValid = true;
    }
  }
}

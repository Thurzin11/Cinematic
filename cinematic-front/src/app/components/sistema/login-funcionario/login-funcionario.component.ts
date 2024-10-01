import { UsuarioService } from './../../../services/usuario/usuario.service';
import { Component, inject } from '@angular/core';
import { ILoginFuncionario } from '../../../model/ILoginFuncionario';
import { IUsuario } from '../../../model/IUsuario';
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

  logar(): void{
    this.service.loginFuncionario(this.login).subscribe((usuario)=>{
      this.salvarSessao(usuario);
      this.router.navigate(['sistema/home']);
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

  private salvarSessao(usuario: IUsuario): void {
    sessionStorage.setItem('usuarioId', usuario.id);
    sessionStorage.setItem('usuarioNome', usuario.nome);
    sessionStorage.setItem('usuarioTipo', usuario.tipoUsuario);
  }
}

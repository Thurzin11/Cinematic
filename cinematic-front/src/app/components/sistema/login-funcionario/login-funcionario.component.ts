import { Component } from '@angular/core';
import { ILoginFuncionario } from '../../../model/ILoginFuncionario';
import { UsuarioService } from '../../../services/usuario/usuario.service';
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

  constructor(private service: UsuarioService, private router: Router){}

  logar(login: ILoginFuncionario): void{
    this.service.loginFuncionario(login).subscribe((usuario)=>{
      console.log(usuario);
      this.router.navigate(['/sistema/home']);
    },
    erro=>{
      if(erro.status==400){
        this.userIsValid = false;
      }
    }
  )
  }
}

import { Component, inject, Input, OnInit } from '@angular/core';
import { IUsuario } from '../../../model/IUsuario';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { ITipoUsuario } from '../../../model/ITipoUsuario';

@Component({
  selector: 'app-header-sistema',
  templateUrl: './header-sistema.component.html',
  styleUrl: './header-sistema.component.scss'
})
export class HeaderSistemaComponent implements OnInit{
  userLogged: IUsuario = {
    id: '',
    nome: '',
    email: '',
    senha: '',
    status: false,
    tipoUsuario: ''
  };
  openLogout: boolean = false;

  private usuarioService: UsuarioService = inject(UsuarioService);
  private router: Router = inject(Router);

  ngOnInit(): void {
    const id: string | null = sessionStorage.getItem('usuarioId');
    if(id != null) {
      this.usuarioService.findById(id).subscribe(usuario => this.userLogged = usuario);
    }
  }

  toggleLogoutConfirmation(): void {
    this.openLogout = !this.openLogout;
  }

  logout(): void {
    let tipoUser: string | null = sessionStorage.getItem('usuarioTipo');
    console.log(tipoUser);
    if (tipoUser!=null) {
      if (tipoUser==='FUNCIONARIO' || tipoUser==='GERENTE') {
        this.router.navigate(['sistema/login']);
      }
      if (tipoUser==='CLIENTE') {
        this.router.navigate(['login']);
      }
      sessionStorage.clear();
    }
  }
}

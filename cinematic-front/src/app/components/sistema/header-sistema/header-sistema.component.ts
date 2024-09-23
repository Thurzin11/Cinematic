import { Component, inject, Input, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { IUsuario } from '../../../model/IUsuario';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header-sistema',
  templateUrl: './header-sistema.component.html',
  styleUrl: './header-sistema.component.scss'
})
export class HeaderSistemaComponent implements OnInit{
  @Input() userId: string = '';
  userLogged: IUsuario = {
    id: '',
    nome: '',
    email: '',
    senha: '',
    status: false,
    tipoUsuario: ''
  }
  options: boolean = false;
  private usuarioService: UsuarioService = inject(UsuarioService);

  ngOnInit(): void {
    if (this.userId) {
      console.log(this.userId);
      this.usuarioService.findById(this.userId).subscribe(usuario => this.userLogged = usuario);
    }
  }
  activateOptions(){
    this.options =! this.options;
    console.log(this.options);
  }
}

import { Component, inject, Input, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { IUsuario } from '../../../model/IUsuario';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header-sistema',
  templateUrl: './header-sistema.component.html',
  styleUrl: './header-sistema.component.scss'
})
export class HeaderSistemaComponent{
  @Input() userLogged: IUsuario = {
    id: '',
    nome: '',
    email: '',
    senha: '',
    status: false,
    tipoUsuario: ''
  }
  options: boolean = false;

  activateOptions(){
    this.options =! this.options;
    console.log(this.options);

  }
}

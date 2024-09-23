import { Component, Input } from '@angular/core';
import { IUsuario } from '../../../model/IUsuario';

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

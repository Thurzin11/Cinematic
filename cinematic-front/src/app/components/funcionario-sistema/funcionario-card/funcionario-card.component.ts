import { Component, Input, OnInit } from '@angular/core';
import { IUsuario } from '../../../model/IUsuario';
import { ITipoUsuario } from '../../../model/ITipoUsuario';

@Component({
  selector: 'app-funcionario-card',
  templateUrl: './funcionario-card.component.html',
  styleUrl: './funcionario-card.component.scss'
})
export class FuncionarioCardComponent {
  @Input() nome: string = '';
  @Input() email:string = '';
  @Input() status: boolean = false;
  @Input() tipoUsuario: ITipoUsuario | string = '';

  usuarios: IUsuario[] = [];

  usuarioIsAtivo(status: boolean): boolean{
    if(status)
      return true;
    return false;
  }



}

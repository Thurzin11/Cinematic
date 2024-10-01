import { IUsuario } from '../../../../model/IUsuario';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funcionario-detalhe',
  templateUrl: './funcionario-detalhe.component.html',
  styleUrl: './funcionario-detalhe.component.scss'
})
export class FuncionarioDetalheComponent{
  @Output() onClose = new EventEmitter();
  @Output() onEditar = new EventEmitter();
  @Output() onInativarUsuario = new EventEmitter();
  @Output() onAtivarUsuario = new EventEmitter();
  @Input() funcionario: IUsuario = {
    id: '',
    nome: '',
    email: '',
    senha: '',
    status: false,
    tipoUsuario: ''
  };
  confirmacao: boolean = false;
  constructor(private router: Router){}

  close():void{
    this.onClose.emit();
  }
  editar(usuario: IUsuario):void{
    console.log(usuario);
    this.onEditar.emit(usuario);
    this.redirect(usuario);
  }
  inativarUsuario(id:string):void{
    this.onInativarUsuario.emit(id);
  }
  ativarUsuario(id: string): void{
    this.onAtivarUsuario.emit(id);
  }
  confirmar():void{
    this.confirmacao = !this.confirmacao;
  }
  redirect(usuario: IUsuario): void{
    this.router.navigate([`sistema/funcionario/editar/${usuario.id}`])
  }

}

import { IEstabelecimento } from './../../../../model/IEstabelecimento';
import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-estabelecimento-detalhe',
  templateUrl: './estabelecimento-detalhe.component.html',
  styleUrl: './estabelecimento-detalhe.component.scss'
})
export class EstabelecimentoDetalheComponent {
  @Output() onClose = new EventEmitter();
  @Output() onEditar = new EventEmitter();
  @Input() estabelecimentoDetails:IEstabelecimento ={
    id: '',
    nome: '',
    endereco: '',
    cidade: '',
    estado: ''
  }

  close():void{
    this.onClose.emit();
  }

  editar(estabelecimento: IEstabelecimento):void{
    console.log(estabelecimento);
    this.onEditar.emit(estabelecimento);
  }

}

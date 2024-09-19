import { Router } from '@angular/router';
import { IEstabelecimento } from './../../../../model/IEstabelecimento';
import { Component, EventEmitter, Output, Input, inject } from '@angular/core';

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
    rua: '',
    bairro: '',
    numero: 0,
    cidade: '',
    estado: '',
    cep: ''
  }
  
  close():void{
    this.onClose.emit();
  }
}

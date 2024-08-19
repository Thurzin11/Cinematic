import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IClassificacao } from '../../../model/IClassificacao';

@Component({
  selector: 'app-filme-card',
  templateUrl: './filme-card.component.html',
  styleUrl: './filme-card.component.scss'
})
export class FilmeCardComponent implements OnInit {
  @Input() classificacao: string = '';
  @Input() banner: string = '';
  @Input() nome: string = ''

  classificacaoClass: string = '';

  ngOnInit(): void {
    this.setClassificacao()
  }

  setClassificacao(): void {
    switch(this.classificacao.toLowerCase()) {
      case 'live': {
        this.classificacao = 'L';
        this.classificacaoClass = 'livre';
        break; 
      };
      case 'dez': {
        this.classificacao = '10';
        this.classificacaoClass = 'dez';
        break;
      };
      case 'doze': {
        this.classificacao = '12';
        this.classificacaoClass = 'doze';
        break;
      };
      case 'quatorze': {
        this.classificacao = '14';
        this.classificacaoClass = 'quatorze';
        break;
      };
      case 'dezesseis': {
        this.classificacao = '16';
        this.classificacaoClass = 'dezesseis';
        break;
      };
      case 'dezoito': {
        this.classificacao = '18';
        this.classificacaoClass = 'dezoito';
        break;
      };
      default: break;;
    }
  }
}

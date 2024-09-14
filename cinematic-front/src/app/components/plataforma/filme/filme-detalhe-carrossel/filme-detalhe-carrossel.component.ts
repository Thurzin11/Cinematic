import { Component, Input, OnInit } from '@angular/core';
import { IFilme } from '../../../../model/IFilme';

@Component({
  selector: 'app-filme-detalhe-carrossel',
  templateUrl: './filme-detalhe-carrossel.component.html',
  styleUrl: './filme-detalhe-carrossel.component.scss'
})
export class FilmeDetalheCarrosselComponent implements OnInit {
  @Input()filme: IFilme = {
    id: '',
    nome: '',
    categoria: {
      id: '',
      nome: ''
    },
    duracao: 0,
    classificacao: '',
    descricao: '',
    dataEstreia: '',
    disponibilidade: false,
    banner: '',
    direcao: '',
    distribuidora: '',
    statusFilme: '',
    capas: [],
    trailers: []
  };
  classificacao: string = '';
  classificacaoClass: string = '';

  ngOnInit(): void {
    this.setClassificacao();
  }

  setClassificacao(): void {
    switch(this.filme.classificacao.toString().toLowerCase()) {
      case 'livre': {
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

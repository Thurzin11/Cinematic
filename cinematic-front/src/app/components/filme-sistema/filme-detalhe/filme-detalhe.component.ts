import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFilme } from '../../../model/IFilme';

@Component({
  selector: 'app-filme-detalhe',
  templateUrl: './filme-detalhe.component.html',
  styleUrl: './filme-detalhe.component.scss'
})
export class FilmeDetalheComponent {
  @Input() filme: IFilme = {
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
  @Output() onCloseDetails = new EventEmitter();

  classificacaoClass: string = '';

  ngOnInit(): void {
    this.setClassificacao()
    console.log(this.filme);
  }

  setClassificacao(): void {
    switch(this.filme.classificacao.toString().toLowerCase()) {
      case 'live': {
        this.filme.classificacao = 'L';
        this.classificacaoClass = 'livre';
        break; 
      };
      case 'dez': {
        this.filme.classificacao = '10';
        this.classificacaoClass = 'dez';
        break;
      };
      case 'doze': {
        this.filme.classificacao = '12';
        this.classificacaoClass = 'doze';
        break;
      };
      case 'quatorze': {
        this.filme.classificacao = '14';
        this.classificacaoClass = 'quatorze';
        break;
      };
      case 'dezesseis': {
        this.filme.classificacao = '16';
        this.classificacaoClass = 'dezesseis';
        break;
      };
      case 'dezoito': {
        this.filme.classificacao = '18';
        this.classificacaoClass = 'dezoito';
        break;
      };
      default: break;;
    }
  }

  closeDetails(): void {
    this.onCloseDetails.emit();
  }
}

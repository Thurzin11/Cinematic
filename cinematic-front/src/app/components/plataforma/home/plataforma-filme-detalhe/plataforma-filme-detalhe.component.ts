import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IFilme } from '../../../../model/IFilme';

@Component({
  selector: 'app-plataforma-filme-detalhe',
  templateUrl: './plataforma-filme-detalhe.component.html',
  styleUrl: './plataforma-filme-detalhe.component.scss'
})
export class PlataformaFilmeDetalheComponent implements OnInit, OnChanges {
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
    status: '',
    capas: [],
    trailers: []
  }
  @Output() onCloseDetails = new EventEmitter();

  classificacao: string = '';
  classificacaoClass: string = '';
  status: string = '';

  ngOnInit(): void {
    this.setClassificacao();
    this.setStatus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setClassificacao();
    this.setStatus();
  }

  private setClassificacao(): void {
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

  setStatus(): void {
    switch(this.filme.status.toString().toLowerCase()) {
      case 'destaque': {
        this.status = 'Destaque';
        break;
      }
      case 'estreia': {
        this.status = 'Estreia';
        break;
      }
      case 'lancamento': {
        this.status = 'Lancamento';
        break;
      }
      case 'pre_estreia': {
        this.status = 'Pre-Estreia';
        break;
      }
      case 'cartaz': {
        this.status = 'Cartaz';
        break;
      }
    }
  }

  closeDetails(): void {
    this.onCloseDetails.emit();
  }
}

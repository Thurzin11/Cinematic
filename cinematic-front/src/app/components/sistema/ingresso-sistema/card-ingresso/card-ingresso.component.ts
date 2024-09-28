import { Component, inject, Input, OnInit } from '@angular/core';
import { ISessao } from '../../../../model/ISessao';
import { SessaoService } from '../../../../services/sessao/sessao.service';
import { ActivatedRoute } from '@angular/router';
import { IAssento } from '../../../../model/IAssento';

@Component({
  selector: 'app-card-ingresso',
  templateUrl: './card-ingresso.component.html',
  styleUrl: './card-ingresso.component.scss'
})
export class CardIngressoComponent implements OnInit {
  sessao: ISessao = {
    id: '',
    sala: {
      id: '',
      numero: 0,
      fileiras: [],
      quantidadeColunas: 0,
      tipo: '',
      tamanho: '',
      disponibilidade: false
    },
    horario: {
      id: '',
      hora: '',
      status: false,
      periodo: ''
    },
    filme: {
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
    },
    disponibilidade: false,
    assentos: [],
    idioma: '',
    tipo: '',
    data: '',
    estabelecimento: {
      id: '',
      nome: '',
      rua: '',
      bairro: '',
      numero: 0,
      cidade: '',
      estado: '',
      cep: ''
    }
  };
  @Input() assentos: IAssento[] = [
    {
      id: '',
      nome: 'C1',
      tipo: '',
      status: ''
    },
    {
      id: '',
      nome: 'C2',
      tipo: '',
      status: ''
    },
    {
      id: '',
      nome: 'C3',
      tipo: '',
      status: ''
    },
    {
      id: '',
      nome: 'C1',
      tipo: '',
      status: ''
    },
    {
      id: '',
      nome: 'C2',
      tipo: '',
      status: ''
    },
    {
      id: '',
      nome: 'C3',
      tipo: '',
      status: ''
    },
    {
      id: '',
      nome: 'C1',
      tipo: '',
      status: ''
    },
    {
      id: '',
      nome: 'C2',
      tipo: '',
      status: ''
    },
    {
      id: '',
      nome: 'C3',
      tipo: '',
      status: ''
    },
    {
      id: '',
      nome: 'C3',
      tipo: '',
      status: ''
    },
  ];
  classificacao: string = '';
  classificacaoClass: string = '';
  tipo: string = '';

  private sessaoService: SessaoService = inject(SessaoService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('sessaoId');
    if(id !== null) {
      this.sessaoService.findById(id).subscribe(sessao => {
        this.sessao = sessao;
        this.setClassificacao();
        this.setTipo();
      });
    }
  }

  setClassificacao(): void {
    switch(this.sessao.filme.classificacao.toString().toLowerCase()) {
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
      default: {
        break;
      };
    }
  }

  private setTipo(): void{
    switch(this.sessao.tipo.toUpperCase()) {
      case "A": {
        this.tipo = '2D';
        break;
      }
      case "B": {
        this.tipo = '3D';
        break;
      }
      case "C": {
        this.tipo = '4D';
        break;
      }
      case "D": {
        this.tipo = 'D-BOX';
        break;
      }
      default: break;
    }
  }
}

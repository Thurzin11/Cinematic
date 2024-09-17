import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ISessao } from '../../../../model/ISessao';
import { Router } from '@angular/router';
import { SessaoService } from '../../../../services/sessao/sessao.service';

@Component({
  selector: 'app-sessao-detalhe',
  templateUrl: './sessao-detalhe.component.html',
  styleUrl: './sessao-detalhe.component.scss'
})
export class SessaoDetalheComponent implements OnInit, OnChanges{
  @Input() sessao: ISessao = {
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
      horario: '',
      status: false
    },
    filme: {
      id: '',
      nome: '',
      categoria: {
        id: '',
        nome: ''
      },
      duracao: '',
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
      endereco: '',
      cidade: '',
      estado: ''
    }
  };
  @Input() sessaoId: string = '';
  @Output() onAtivar = new EventEmitter();
  @Output() onInativar = new EventEmitter();
  @Output() onCloseDetails = new EventEmitter();
  tipo: string = '';

  constructor(private router: Router, private sessaoService: SessaoService) {}

  ngOnInit(): void {
    if(this.sessaoId !== '') {
      this.sessaoService.findById(this.sessaoId).subscribe(sessao => {
        this.sessao = sessao;
        this.setTipo();
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.sessaoId !== '') {
      this.sessaoService.findById(this.sessaoId).subscribe(sessao => {
        this.sessao = sessao;
        this.setTipo();
      });
    }
  }

  close(): void {
    this.onCloseDetails.emit();
  }

  edit(id: string): void {
    this.router.navigate([`/sistema/sessao/editar/${id}`]);
  }

  ativar(id: string): void {
    this.onAtivar.emit(id);
  }

  inativar(id: string): void {
    this.onInativar.emit(id);
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

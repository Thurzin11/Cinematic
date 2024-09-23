import { Component, inject, OnInit } from '@angular/core';
import { ISessao } from '../../../../model/ISessao';
import { SessaoService } from '../../../../services/sessao/sessao.service';

@Component({
  selector: 'app-sessao-list',
  templateUrl: './sessao-list.component.html',
  styleUrl: './sessao-list.component.scss'
})
export class SessaoListComponent implements OnInit{
  sessoes: ISessao[] = [];
  filterIsOpen: boolean = false;
  openSessaoDetails: boolean = false;
  sessaoDetails: ISessao = {
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
  idSessaoDetails: string = '';

  private sessaoService: SessaoService = inject(SessaoService);

  ngOnInit(): void {
    this.findAllSessoes();
  }

  findAllSessoes(): void {
    this.sessaoService.findAll().subscribe(sessoes => this.sessoes = sessoes);
  }

  closeFiltro(): void {
    this.filterIsOpen = false;
  }

  openFiltro(): void {
    this.filterIsOpen = true;
  }

  seeSessaoDetails(id: string): void {
    this.idSessaoDetails = id;
    this.openSessaoDetails = true;
  }

  closeDetails(): void {
    this.openSessaoDetails = false;
  }

  ativarSessao(id: string): void {
    this.sessaoService.ativar(id).subscribe(() => {
      this.closeDetails();
      this.findAllSessoes();
    })
  }

  inativarSessao(id: string): void {
    this.sessaoService.inativar(id).subscribe(() => {
      this.closeDetails();
      this.findAllSessoes();
    })
  }
}

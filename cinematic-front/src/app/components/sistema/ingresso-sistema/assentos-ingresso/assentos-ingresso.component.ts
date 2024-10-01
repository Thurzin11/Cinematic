import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessaoService } from '../../../../services/sessao/sessao.service';
import { ISessao } from '../../../../model/ISessao';
import { IAssento } from '../../../../model/IAssento';

@Component({
  selector: 'app-assentos-ingresso',
  templateUrl: './assentos-ingresso.component.html',
  styleUrl: './assentos-ingresso.component.scss'
})
export class AssentosIngressoComponent implements OnInit {
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
  }
  assentoIsSelected: boolean = false;
  assentosSelecionados: IAssento[] = [];
  sessaoId: string = '';

  assentosPorFileira: {[key:string]: IAssento[]} = {
    'A': [],
    'B': [],
    'C': [],
    'D': [],
    'E': [],
    'F': [],
    'G': [],
    'H': []
  }

  private route: ActivatedRoute = inject(ActivatedRoute);
  private sessaoService: SessaoService = inject(SessaoService);

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('sessaoId');

    if(id !== null) {
      this.sessaoId = id;
      this.sessaoService.findById(id).subscribe(sessao => {
        this.sessao = sessao; 
        this.separarAssentosPorFileira(this.sessao.assentos);
      });
    }
  }

  private separarAssentosPorFileira(assentos: IAssento[]): void {
    assentos.forEach(assento => {
      const fileira: string = assento.nome[0];
      this.assentosPorFileira[fileira.toUpperCase()].push(assento);
    })
  }

  setBackgroundAssento(tipo: string): string {
    if(tipo.toUpperCase() === 'ACOMPANHANTE')
      return 'acompanhante';

    if(tipo.toUpperCase() === 'DEFICIENTE')
      return 'deficiente';

    return '';
  }

  setAssentoClass(assentoNome: string, tamanhoSala: string): boolean {
    let numero: string = '';
    let returnBool: boolean = false;

    if(assentoNome.length === 2)
      numero = assentoNome[1];

    if(assentoNome.length > 2)
      numero = assentoNome[1]+assentoNome[2];

    switch(tamanhoSala.toUpperCase()) {
      case "PEQUENA": {
        if(numero === '6' || numero === '14')          
          returnBool = true;

        break;
      }
      case "MEDIA": {
        if(numero === '7' || numero === '16')
          returnBool = true;

        break;
      }
      case "GRANDE": {
        if(numero === '8' || numero === '18')
          returnBool = true;

        break;
      }
      default: {
        break;
      }
    }

    return returnBool;
  }

  selectAssento(assento: IAssento): void {
    if(this.assentosSelecionados.length >= 10)
      return;
    
    this.assentosSelecionados.push(assento);
  }

  removeAssento(assentoParam: IAssento): void {
    const index:number = this.assentosSelecionados.findIndex(assento => assento.id === assentoParam.id );

    if(index !== -1)
      this.assentosSelecionados.splice(index, 1);
  }

  reiniciar(): void {
    this.assentoIsSelected = false;
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessaoService } from '../../../../services/sessao/sessao.service';
import { ISessao } from '../../../../model/ISessao';

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

  private route: ActivatedRoute = inject(ActivatedRoute);
  private sessaoService: SessaoService = inject(SessaoService);

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('sessaoId');
    if(id !== null) {
      this.sessaoService.findById(id).subscribe(sessao => this.sessao = sessao);
    }

  }
}

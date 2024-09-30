import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IIngresso } from '../../model/IIngresso';

@Injectable({
  providedIn: 'root'
})
export class TransferirIngressosService {
  private ingressosSource = new BehaviorSubject<{acao: string, ingresso: IIngresso}>({acao: '', ingresso: {
    id: '',
    sessao: {
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
    },
    assento: {
      id: '',
      nome: '',
      tipo: '',
      status: ''
    },
    tipo: {
      nome: '',
      valor: 0,
      quantidade: 0
    },
    valor: 0
  }});
  ingressos$ = this.ingressosSource.asObservable();

  atualizarIngressos(acao: string, ingresso: IIngresso) {
    this.ingressosSource.next({acao, ingresso});
  }
}

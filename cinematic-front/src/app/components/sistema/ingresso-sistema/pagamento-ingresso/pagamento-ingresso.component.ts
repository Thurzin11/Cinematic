import { IIngresso } from './../../../../model/IIngresso';
import { Component, inject, OnInit } from '@angular/core';
import { ITipoIngresso } from '../../../../model/ITipoIngresso';
import { ActivatedRoute, Router } from '@angular/router';
import { ITipoPagamento } from '../../../../model/ITipoPagamento';
import { IAssento } from '../../../../model/IAssento';
import { SessaoService } from '../../../../services/sessao/sessao.service';
import { ISessao } from '../../../../model/ISessao';
import { AssentoService } from '../../../../services/assento/assento.service';
import { IngressoService } from '../../../../services/ingresso/ingresso.service';

@Component({
  selector: 'app-pagamento-ingresso',
  templateUrl: './pagamento-ingresso.component.html',
  styleUrl: './pagamento-ingresso.component.scss',
})
export class PagamentoIngressoComponent implements OnInit {
  isPagamento: boolean = false;
  tipoIngresso: ITipoIngresso [] = [
  {
    nome: "Inteira",
    valor: 20,
    quantidade: 0
  },
  {
    nome: "Meia Estudante",
    valor: 10,
    quantidade: 0
  },
  {
    nome: "Meia Criança",
    valor: 10,
    quantidade: 0
  },
  {
    nome: "Meia Idoso",
    valor: 10,
    quantidade: 0
  },
  {
    nome: "Meia Entrada - PCD",
    valor: 10,
    quantidade: 0
  }
  ];
  dadosPagamento: boolean = false;
  tipoPagamento: ITipoPagamento [] = [
    {
      nome: 'Cartão de Crédito',
      img: '../../../../../assets/img/cartao-de-credito.png',
      label: ['Número do cartão','Data de validade','Código de Segurança','Nome no cartão']
    },
    {
      nome: 'Cartão de Débito',
      img: '../../../../../assets/img/cartao-de-credito.png',
      label: ['Número do cartão','Data de validade','Código de Segurança','Nome no cartão']
    },
    {
      nome: 'Pix',
      img: '../../../../../assets/img/pix.png',
      label: []
    }
  ]

  ingressos: IIngresso[] = [];
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

  assentos: IAssento[] = [];
  quantidadeIngressos: number = 0;

  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private serviceSessao: SessaoService= inject(SessaoService);
  private ingressoService: IngressoService = inject(IngressoService);
  private assentoService: AssentoService = inject(AssentoService);

  ngOnInit(): void {
    let idSessao: string | null = this.route.snapshot.paramMap.get('sessaoId');
    if (idSessao!=null) {
      this.serviceSessao.findById(idSessao).subscribe((sessao)=>{this.sessao = sessao});
    }
    this.route.queryParamMap.subscribe((params) =>{
      let assentos = params.get("assentos");
      if (assentos!=null) {
        let ids: string[] = JSON.parse(assentos);
        ids.forEach(id => {
          this.assentoService.findById(id).subscribe(assento => this.assentos.push(assento));
        })
      }
    })
  }

  increment(ingresso: ITipoIngresso): void{
    if (this.quantidadeIngressos<this.assentos.length && ingresso.quantidade<this.assentos.length) {
        this.gerarIngresso(ingresso);
        this.quantidadeIngressos++;
        ingresso.quantidade++;
    }
  }

  decrement(ingresso: ITipoIngresso): void{
    if (this.quantidadeIngressos>0 && ingresso.quantidade>0) {
      this.quantidadeIngressos--;
      ingresso.quantidade--;
      this.removeIngresso(ingresso);
    }
  }

  gerarIngresso(tipo: ITipoIngresso){
        let assento = this.assentos[this.ingressos.length];
          let ingresso: IIngresso = {
            id: '',
            sessao: this.sessao,
            assento: {
              id: assento.id,
              nome: assento.nome,
              tipo: assento.tipo,
              status: assento.status
            },
            tipo: tipo,
            valor: tipo.valor
          };
          
          this.ingressos.push(ingresso);
          this.ingressoService.atualizarIngressos('+', false, ingresso);
        
  }

  removeIngresso(tipo: ITipoIngresso){
    let indexIngresso: number = this.ingressos.findIndex(ingresso=>ingresso.tipo.nome === tipo.nome);
    if (indexIngresso!=-1) {
      this.ingressoService.atualizarIngressos('-', false, this.ingressos[indexIngresso]);
      this.ingressos.splice(indexIngresso,1);
    }
  }

  irParaPagamento(): void {
    this.isPagamento = true;
  }
}

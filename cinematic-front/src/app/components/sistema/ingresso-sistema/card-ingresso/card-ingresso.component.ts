import { Component, inject, Input, OnInit } from '@angular/core';
import { ISessao } from '../../../../model/ISessao';
import { SessaoService } from '../../../../services/sessao/sessao.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  @Input() assentos: IAssento[] = [];
  classificacao: string = '';
  classificacaoClass: string = '';
  tipo: string = '';
  userLogged: string = '';
  userType: string = '';
  sessaoId: string = '';

  private sessaoService: SessaoService = inject(SessaoService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('sessaoId');
    const userLogged: string | null = this.route.snapshot.queryParams['userLogged'];
    const userType: string | null = this.route.snapshot.queryParams['userType'];

    this.route.queryParamMap.subscribe((params) =>{
      let assentos = params.get("assentos");
      if (assentos!=null) {
        this.assentos = JSON.parse(assentos);
        console.log(this.assentos);
      }
    })


    if(userLogged !== null && userType !== null) {
      this.userLogged = userLogged;
      this.userType = userType;
    }

    if(id !== null) {
      this.sessaoId = id;
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

  redirect(): void {
    if(this.sessaoId !== ''){
      const assentosJSON: string = JSON.stringify(this.assentos);
      this.router.navigate([`sistema/ingresso/${this.sessaoId}`], {queryParams: {userLogged: this.userLogged, userType: this.userType,assentos: assentosJSON}});
    }
  }
}

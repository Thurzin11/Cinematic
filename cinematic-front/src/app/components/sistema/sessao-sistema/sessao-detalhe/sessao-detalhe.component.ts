import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ISessao } from '../../../../model/ISessao';
import { ActivatedRoute, Router } from '@angular/router';
import { SessaoService } from '../../../../services/sessao/sessao.service';

@Component({
  selector: 'app-sessao-detalhe',
  templateUrl: './sessao-detalhe.component.html',
  styleUrl: './sessao-detalhe.component.scss'
})
export class SessaoDetalheComponent implements OnInit{
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
    },
    fileiras: []
  };
  @Input() sessaoId: string = '';
  @Output() onAtivar = new EventEmitter();
  @Output() onInativar = new EventEmitter();
  @Output() onCloseDetails = new EventEmitter();
  tipo: string = '';
  showModal: boolean = false;
  userLogged: string = '';
  userType: string = '';

  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private sessaoService: SessaoService = inject(SessaoService);

  ngOnInit(): void {
    const userLogged: string | undefined = this.route.snapshot.queryParams['userLogged'];
    const userType: string | undefined = this.route.snapshot.queryParams['userType'];

    if(userLogged && userType) {
      this.userLogged = userLogged;
      this.userType = userType;
    }

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

  redirect(): void {
    this.router.navigate([`sistema/sessao/editar/${this.sessao.id}`], {queryParams: {userLogged: this.userLogged, userType: this.userType}});
  }
}

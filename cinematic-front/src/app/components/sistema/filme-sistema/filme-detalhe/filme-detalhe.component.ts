import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IFilme } from '../../../../model/IFilme';
import { FilmeService } from '../../../../services/filme/filme.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filme-detalhe',
  templateUrl: './filme-detalhe.component.html',
  styleUrl: './filme-detalhe.component.scss'
})
export class FilmeDetalheComponent implements OnInit, OnChanges{
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
  };
  @Output() onCloseDetails = new EventEmitter();

  classificacaoClass: string = '';
  classificacao: string = '';
  status: string = '';
  showModal: boolean = false;
  userId: string = '';
  userType: string = '';
  
  private filmeService: FilmeService = inject(FilmeService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const id: string | undefined = this.route.snapshot.queryParams['userLogged'];
    const userType: string | undefined = this.route.snapshot.queryParams['userType'];
    if(id && userType) {
      this.userId = id;
      this.userType = userType;
    }

    this.setClassificacao()
    this.setStatus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setClassificacao();
  }

  setClassificacao(): void {
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
        this.status = 'cartaz';
        break;
      }
    }
  }

  closeDetails(): void {
    this.onCloseDetails.emit();
  }

  inativar(id: string): void {
    this.filmeService.inativar(id).subscribe(() => this.onCloseDetails.emit());
  }
}

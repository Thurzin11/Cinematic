import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ISessao } from '../../../../model/ISessao';
import { SessaoService } from '../../../../services/sessao/sessao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IAssento } from '../../../../model/IAssento';
import { IIngresso } from '../../../../model/IIngresso';
import { TransferirIngressosService } from '../../../../services/transferirIngressos/transferir-ingressos.service';
import { AssentoService } from '../../../../services/assento/assento.service';
import { ITipoIngresso } from '../../../../model/ITipoIngresso';

@Component({
  selector: 'app-card-ingresso',
  templateUrl: './card-ingresso.component.html',
  styleUrl: './card-ingresso.component.scss'
})
export class CardIngressoComponent implements OnInit {
  @Input() assentos: IAssento[] = [];
  ingressos: IIngresso[] = [];
  @Input() isPagamento: boolean = false;
  @Output() onIrParaPagamento = new EventEmitter();

  assentoRotasExist: boolean = false;
  valorTotal: number = 0;
  classificacao: string = '';
  classificacaoClass: string = '';
  tipo: string = '';
  sessaoId: string = '';
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
  tipoIngresso: ITipoIngresso [] = [];

  private sessaoService: SessaoService = inject(SessaoService);
  private assentoService: AssentoService = inject(AssentoService);
  private transferirIngressos: TransferirIngressosService = inject(TransferirIngressosService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('sessaoId');
    
    this.route.queryParamMap.subscribe((params) =>{
      let assentos = params.get("assentos");
      if (assentos!=null) {
        this.assentoRotasExist = true;
        let ids: string[] = [];
        ids = JSON.parse(assentos);
        ids.forEach(id => {
          this.assentoService.findById(id).subscribe(assento => this.assentos.push(assento));
        })
      }
    })

    if(id !== null) {
      this.sessaoId = id;
      this.sessaoService.findById(id).subscribe(sessao => {
        this.sessao = sessao;
        this.setClassificacao();
        this.setTipo();
      });
    }

    this.transferirIngressos.ingressos$.subscribe(ingressos => {
      if(ingressos.restart) {
        this.ingressos = [];
        return;
      }

      if(ingressos.ingresso) {
        if(this.ingressos.length === 0)
          this.valorTotal = 0;
        
        if(ingressos.acao === '+') {
          this.valorTotal += ingressos.ingresso.valor;
          this.ingressos.push(ingressos.ingresso);
          this.adicionarTipoIngresso(ingressos.ingresso.tipo);
        }
        
        if(ingressos.acao === '-') {
          this.valorTotal -= ingressos.ingresso.valor;
          this.removerTipoIngresso(ingressos.ingresso);
          const index: number = this.ingressos.findIndex(ingresso => ingresso === ingressos.ingresso);
          
          if(index !== -1)
            this.ingressos.splice(index, 1);
        }
      }
    });
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
      const ids: string[] = [];
      this.assentos.forEach(assento => {
        ids.push(assento.id);
      })

      const assentosJSON: string = JSON.stringify(ids);

      if(this.assentoRotasExist) {
        this.onIrParaPagamento.emit();
        return;
      }

      this.router.navigate([`sistema/ingresso/${this.sessaoId}`], {queryParams: {assentos: assentosJSON}});
    }
  }

  reiniciar(): void {
    this.assentos = [];
    this.transferirIngressos.atualizarIngressos('', true);
    this.router.navigate(['sistema/ingresso'])
  }

  private adicionarTipoIngresso(tipo: ITipoIngresso): void {
    if(this.tipoIngresso.length === 0) {
      this.tipoIngresso.push({
        nome: tipo.nome,
        quantidade: tipo.quantidade+1,
        valor: tipo.valor,
      })
    
      return;
    }

    const tipoIngresso: ITipoIngresso | undefined = this.tipoIngresso.find(tipoIngresso => tipoIngresso.nome.toLowerCase() === tipo.nome.toLowerCase());
    if(tipoIngresso) {
      this.tipoIngresso.forEach(tipoIngressoParam => {
        if(tipoIngressoParam.nome.toLowerCase() === tipoIngresso.nome.toLowerCase())
          tipoIngresso.quantidade++;
      });
      return;
    }
    
    this.tipoIngresso.push({
      nome: tipo.nome,
      quantidade: tipo.quantidade+1,
      valor: tipo.valor,
    });
  }

  private removerTipoIngresso(ingresso: IIngresso): void {
    if(this.tipoIngresso.length === 1) {
      this.tipoIngresso.forEach(tipoIngresso => {
        if(tipoIngresso.quantidade === 1) {
          const index: number = this.tipoIngresso.findIndex(tipoIngressoParam => tipoIngresso.nome.toLowerCase() === tipoIngressoParam.nome.toLowerCase());
          
          if(index !== -1)
            this.tipoIngresso.splice(index, 1);
          
          return;
        }

        tipoIngresso.quantidade--;
      });

      return;
    }

    const tipoIngresso: ITipoIngresso | undefined = this.tipoIngresso.find(tipoIngressoParams => tipoIngressoParams.nome.toLowerCase() === ingresso.tipo.nome.toLowerCase());
    if(tipoIngresso) {
      this.tipoIngresso.forEach(tipoIngressoParam => {
        if(tipoIngressoParam.quantidade === 1) {
          const index: number = this.tipoIngresso.findIndex(tipoIngressoParam => tipoIngresso.nome.toLowerCase() === tipoIngressoParam.nome.toLowerCase());
          
          if(index !== -1)
            this.tipoIngresso.splice(index, 1);
          
          return;
        }

        if(tipoIngressoParam.nome.toLowerCase() === tipoIngresso.nome.toLowerCase())
          tipoIngresso.quantidade--;
      });
    }

  }
}

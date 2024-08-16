import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { ICategoria } from '../../model/ICategoria';
import { EstabelecimentoService } from '../../services/estabelecimento/estabelecimento.service';
import { IEstabelecimento } from '../../model/IEstabelecimento';

@Component({
  selector: 'app-filtro-sistema',
  templateUrl: './filtro-sistema.component.html',
  styleUrl: './filtro-sistema.component.scss'
})
export class FiltroSistemaComponent implements OnInit {
  @Input() tipo: string = '';
  @Output() onCloseFilter = new EventEmitter();

  categoriaList: ICategoria[] = [];
  classificacaoList: string[] = [];
  duracaoList: string[] = [];
  statusFilmeList: string[] = [];
  cargoList: string[] = [];
  statusList: string[] = [];
  email: string = '';
  tipoSalaList: string[] = [];
  tamanhoSalaList: string[] = [];
  periodoList: string[] = [];
  tipoSessaoList: string[] = [];
  estabelecimentoList: IEstabelecimento[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private estabelecimentoService: EstabelecimentoService) { }

  ngOnInit(): void {
    this.initLists();
  }

  closeFilter(): void {
    this.onCloseFilter.emit();
  }

  private initLists(): void {
    switch (this.tipo.toUpperCase()) {
      case 'FILME': {
        this.caseFilme();
        break;
      }
      case 'FUNCIONARIO': {
        this.caseFuncionario();
        break;
      }
      case 'SALA': {
        this.caseSala();
        break;
      }
      case 'HORARIO': {
        this.caseHorario();
        break;
      }
      case 'SESSAO': {
        this.caseSessao();
        break;
      }
    }
  }

  private caseFilme(): void {
    this.categoriaService.findAll().subscribe(categoriaList => this.categoriaList = categoriaList);
    this.classificacaoList = ['Livre', 'Dez', 'Doze', 'Quatorze', 'Dezesseis', 'Dezoito'];
    this.duracaoList = ['1hr-', '1hr30-', '2h-', '2hr30-'];
    this.statusFilmeList = ['Lançamento', 'Cartaz', 'Destaque', 'Pré-Estreia', 'Estreia'];
  }

  private caseFuncionario(): void {
    this.cargoList = ['Funcionario', 'Gerente'];
    this.statusList = ['Ativo', 'Inativo'];
  }

  private caseSala(): void {
    this.tipoSalaList = ['Cinema', 'Teatro', 'Evento'];
    this.statusList = ['Ativo', 'Inativo'];
    this.tamanhoSalaList = ['Grande', 'Media', 'Pequena'];
  }

  private caseHorario(): void {
    this.periodoList = ['Manha', 'Tarde', 'Noite'];
    this.statusList = ['Ativo', 'Inativo'];
  }

  private caseSessao(): void {
    this.periodoList = ['Manha', 'Tarde', 'Noite'];
    this.statusList = ['Ativo', 'Inativo'];
    this.tipoSessaoList = ['Legendado', 'Dublado', 'Normal'];
    this.estabelecimentoService.findAll().subscribe(estabelecimentoList => this.estabelecimentoList = estabelecimentoList);
  }
}

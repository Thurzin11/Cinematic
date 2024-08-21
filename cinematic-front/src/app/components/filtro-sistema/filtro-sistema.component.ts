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
  @Output() onFiltroFuncionario = new EventEmitter();

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
  cargoCheckbox: string ='';

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
  filtroFuncionario(tipo?: string[],status?: boolean | null,email?: string | null):void{
    this.onFiltroFuncionario.emit({
      tipo,
      status,
      email
    });
  }
  listCargosFilter: string[]=[];
  status: boolean | null | undefined = null;
  removeDuplicates = (array:Array<string>) =>[...new Set(array)];

  checkFuncionario(check: boolean):void{
    if (check) {
      this.listCargosFilter.push('FUNCIONARIO');
    }else{
      this.listCargosFilter = this.listCargosFilter.filter(cargo => cargo !== 'FUNCIONARIO');
    }
    check = !check;
    this.listCargosFilter = this.removeDuplicates(this.listCargosFilter);
    // console.log(this.listCargosFilter);
    this.filtroFuncionario(this.listCargosFilter,this.status,this.email);
  }
  checkGerente(check: boolean):void{
    if (check) {
      this.listCargosFilter.push('GERENTE');
    }else{
      this.listCargosFilter = this.listCargosFilter.filter(cargo => cargo !== 'GERENTE');
    }
    check = !check;
    this.listCargosFilter = this.removeDuplicates(this.listCargosFilter);
    // console.log(this.listCargosFilter);
    this.filtroFuncionario(this.listCargosFilter,this.status,this.email);
  }
  getFilterEmail(email: string): void{
    // console.log(email);
    this.email = email;
    this.filtroFuncionario(this.listCargosFilter,this.status,this.email);
  }

  getFilterStatus(ativo: boolean,inativo: boolean): void{
    if (ativo && inativo || !ativo && !inativo) {
      this.filtroFuncionario(this.listCargosFilter,null,this.email);
      return
    }
    if (ativo) {
      this.filtroFuncionario(this.listCargosFilter,ativo,this.email);
      return
    }
    if (inativo) {
      this.filtroFuncionario(this.listCargosFilter,!inativo,this.email);
      return
    }
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

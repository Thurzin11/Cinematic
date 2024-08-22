import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { EstabelecimentoService } from '../../services/estabelecimento/estabelecimento.service';
import { IBotao } from '../../model/IBotao';
import { IFilter } from '../../model/IFilter';
import { FilmeService } from '../../services/filme/filme.service';
import { IBotaoValue } from '../../model/IBotaoValue';
@Component({
  selector: 'app-filtro-sistema',
  templateUrl: './filtro-sistema.component.html',
  styleUrl: './filtro-sistema.component.scss'
})
export class FiltroSistemaComponent implements OnInit {
  @Input() tipo: string = '';
  @Output() onCloseFilter = new EventEmitter();
  @Output() onFilter = new EventEmitter();
  email: string = '';
  estabelecimento: string = '';

  botoes: IBotao[] = [];
  filterList: IFilter[] = [];
  filterMap: Map<string, string[]> = new Map();
  constructor(
    private categoriaService: CategoriaService,
    private estabelecimentoService: EstabelecimentoService,
    private filmeService: FilmeService) { }

  ngOnInit(): void {
    this.initLists();
  }

  verificarEmail(): void {
    if(this.email === '') {
      this.removeFilter({ nome: this.email, isSelected: true }, 'Email');
      return;
    }

    this.toggleButton({ nome: this.email, isSelected: false }, 'Email');
  }

  closeFilter(): void {
    this.onCloseFilter.emit();
  }
  
  private setBotaoValue(list: string[]): IBotaoValue[] {
    let listBotaoValue: IBotaoValue[] = [];
    
    list.forEach(string => listBotaoValue.push({
      nome: string,
      isSelected: false
    }))

    return listBotaoValue;
  }

  private setBotao(label: string, values: IBotaoValue[]): void {
    this.botoes.push({
      label,
      values
    })
  }

  filter(): void {
    this.filterList.forEach(filter => {
      if (this.filterMap.has(filter.label.toLowerCase())) {
        let list: string[] | undefined = this.filterMap.get(filter.label.toLowerCase());
        if(list && list.length === 0)
          list.push(filter.value.nome.toLowerCase());

        if (list && list.length > 0) {
          let str = list.find(value => filter.value.nome.toLowerCase() === value.toLowerCase())
          if (!str)
            list.push(filter.value.nome.toLowerCase());
        }
      }

      if (!this.filterMap.has(filter.label.toLowerCase()))
        this.filterMap.set(filter.label.toLowerCase(), [filter.value.nome.toLowerCase()]);
    })

    this.routes();
  }

  private routes(): void {
    switch(this.tipo.toUpperCase()) {
      case "FUNCIONARIO": {
        console.log(this.filterMap)
        console.log('working...');
        break;
      }
      case "SALA": {
        console.log('working...');
        break;
      }
      case "FILME": {
        this.filmeService.filter(this.mapToObject(this.filterMap)).subscribe(filmes => {
          this.onFilter.emit(filmes);
        });
        break;
      }
      case "SESSAO": {
        console.log('working...');
        break;
      }
      case "HORARIO": {
        console.log('working...');
        break;
      }
      default: {
        console.log('working...');
        break;
      }
    }
  }
  
  private mapToObject(map: Map<string, string[]>): { [key: string]: string[] } {
    let obj: { [key: string]: string[] } = {};
    map.forEach((value, key) => obj[key] = value);
    return obj;
  }

  toggleButton(botaoValue: IBotaoValue, label: string): void {
    if (botaoValue.isSelected) {
      this.removeFilter(botaoValue, label);
      this.filter();
      return;
    }

    botaoValue.isSelected = true;
    this.filterList.push({
      label,
      value: botaoValue
    });
    this.filter();
  }
  
  private removeFilter(botaoValue: IBotaoValue, label: string): void {
    let index: number = this.filterList.findIndex(botao => botao.value.nome.toLowerCase() === botaoValue.nome.toLowerCase());
    this.filterList.splice(index, 1);
    botaoValue.isSelected = false;
    
    if(this.filterMap.has(label.toLowerCase())) {
      let filter: string[] | undefined = this.filterMap.get(label.toLowerCase());
      if(filter && filter.length > 0) {
        let str: string | undefined  = filter.find(value => botaoValue.nome.toLowerCase() === value);
        if(str) {
          let index: number = filter.findIndex(value => str === value);
          filter.splice(index, 1);
        }
      }
    }
  }

  getButtonStyle(botaoParams: IBotaoValue): {} {
    let objeto: { [key: string]: string } = {};
    this.filterList.forEach(botao => {
      botaoParams.nome === botao.value.nome ? objeto = { 'background-color': '#ffa930' } : {};
    })
    return objeto;
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
    let classificacaoList: string[] = ['Livre', 'Dez', 'Doze', 'Quatorze', 'Dezesseis', 'Dezoito'];
    let duracaoList: string[] = ['1hr-', '1hr30-', '2h-', '2hr30-'];
    let statusList: string[] = ['Lançamento', 'Cartaz', 'Destaque', 'Pré-Estreia', 'Estreia'];
  
    this.categoriaService.findAll().subscribe(categoriaList => {
      const categorias: string[] = [];
      categoriaList.forEach(categoria => categorias.push(categoria.nome));
      this.setBotao('Categoria', this.setBotaoValue(categorias))
    });
  
    this.setBotao('Classificacao', this.setBotaoValue(classificacaoList));
    this.setBotao('Duracao', this.setBotaoValue(duracaoList));
    this.setBotao('Status', this.setBotaoValue(statusList));
  }
  
  private caseFuncionario(): void {
    let cargoList: string[] = ['Funcionario', 'Gerente'];
    let statusList: string[] = ['Ativo', 'False'];
  
    this.setBotao('Cargo', this.setBotaoValue(cargoList));
    this.setBotao('Status', this.setBotaoValue(statusList));
  }
  
  private caseSala(): void {
    let listTipoSala: string[] = ['Cinema', 'Teatro', 'Evento'];
    let listStatusSala: string[] = ['Ativo', 'Inativo'];
    let listTamanhoSala: string[] = ['Grande', 'Media', 'Pequena'];
  
    this.setBotao('Tipo', this.setBotaoValue(listTipoSala));
    this.setBotao('Status', this.setBotaoValue(listStatusSala));
    this.setBotao('Tamanho', this.setBotaoValue(listTamanhoSala));
  }
  
  private caseHorario(): void {
    let listPeriodo: string[] = ['Manha', 'Tarde', 'Noite'];
    let listStatus: string[] = ['Ativo', 'Inativo'];
  
    this.setBotao('Periodo', this.setBotaoValue(listPeriodo));
    this.setBotao('Status', this.setBotaoValue(listStatus));
  }
  
  private caseSessao(): void {
    let listPeriodo: string[] = ['Manha', 'Tarde', 'Noite'];
    let listStatus: string[] = ['Ativo', 'Inativo'];
    let listTipoSessao: string[] = ['Legendado', 'Dublado', 'Normal'];
    let listIdioma: string[] = ['Legendado', 'Dublado', 'Normal'];
  
    this.setBotao('Periodo', this.setBotaoValue(listPeriodo));
    this.setBotao('Status', this.setBotaoValue(listStatus));
    this.setBotao('Tipo', this.setBotaoValue(listTipoSessao));
    this.setBotao('Idioma', this.setBotaoValue(listIdioma));
  
    this.estabelecimentoService.findAll().subscribe(estabelecimentoList => {
      let estabelecimentos: string[] = [];
      estabelecimentoList.forEach(estabelecimento => estabelecimentos.push(estabelecimento.nome));
      this.setBotao('Estabelecimento', this.setBotaoValue(estabelecimentos));
    });
  }
}

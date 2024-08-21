import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  botoes: IBotao[] = [];
  listFilter: IFilter[] = [];
  filterRequest: Map<string, string[]> = new Map();

  constructor(
    private categoriaService: CategoriaService,
    private estabelecimentoService: EstabelecimentoService,
    private filmeService: FilmeService) { }

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
    this.listFilter.forEach(filter => {
      if (this.filterRequest.has(filter.label.toLowerCase())) {
        let list: string[] | undefined = this.filterRequest.get(filter.label.toLowerCase());
        if (list) {
          let str: string | undefined = list.find(value => filter.value.nome === value)
          if (!str)
            list.push(filter.value.nome);
        }
      }

      if (!this.filterRequest.has(filter.label.toLowerCase()))
        this.filterRequest.set(filter.label.toLowerCase(), [filter.value.nome]);
    })

    this.filmeService.filter(this.mapToObject(this.filterRequest)).subscribe(filmes => {
      this.onFilter.emit(filmes);
    });
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


    this.listFilter.push({
      label: label,
      value: botaoValue
    });
    botaoValue.isSelected = true;
    this.filter();
  }

  private removeFilter(botaoValue: IBotaoValue, label: string): void {
    let index: number = this.listFilter.findIndex(botao => botao.value === botaoValue);
    this.listFilter.splice(index, 1);
    botaoValue.isSelected = false;
    if (this.filterRequest.get(label.toLowerCase())) {
      let list: string[] | undefined = this.filterRequest.get(label.toLowerCase());

      if (list) {
        list.forEach(value => {
          if (botaoValue.nome === value && list) {
            let index: number = list.findIndex(str => value === str);
            list.splice(index, 1);
          }
        })
      }
    }
  }

  getButtonStyle(botaoParams: IBotaoValue): {} {
    let objeto: { [key: string]: string } = {};
    this.listFilter.find(botao => {
      botaoParams === botao.value ? objeto = { 'background-color': '#ffa930' } : {};
    })
    return objeto;
  }
}

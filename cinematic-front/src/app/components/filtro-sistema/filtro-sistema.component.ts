import { UsuarioService } from './../../services/usuario/usuario.service';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { IBotao } from '../../model/IBotao';
import { IFilter } from '../../model/IFilter';
import { FilmeService } from '../../services/filme/filme.service';
import { IBotaoValue } from '../../model/IBotaoValue';
import { SalaService } from '../../services/sala/sala.service';
import { SessaoService } from '../../services/sessao/sessao.service';
import { HorarioService } from '../../services/horario/horario.service';
import { IBGEService } from '../../services/IBGE/ibge.service';
import { IEstados } from '../../model/IEstados';
import { ICidades } from '../../model/ICidades';
import { EstabelecimentoService } from '../../services/estabelecimento/estabelecimento.service';
@Component({
  selector: 'app-filtro-sistema',
  templateUrl: './filtro-sistema.component.html',
  styleUrl: './filtro-sistema.component.scss'
})
export class FiltroSistemaComponent implements OnInit{
  @Input() tipo: string = '';
  @Output() onCloseFilter = new EventEmitter();
  @Output() onFilter = new EventEmitter();
  estabelecimento: string = '';
  cidades: ICidades[] = [];
  cidadeSelected: ICidades = {
    id: 0,
    nome: ''
  };
  estados: IEstados[] = [];
  estadoSelected: IEstados = {
    id: 0,
    nome: '',
    sigla: '',
    regiao: {
      id: 0,
      nome: '',
      sigla: ''
    }
  };
  estadoIsSelected: boolean = false;

  botoes: IBotao[] = [];
  filterList: IFilter[] = [];
  filterMap: Map<string, string[]> = new Map();
  private usuarioService: UsuarioService = inject(UsuarioService);
  private categoriaService: CategoriaService = inject(CategoriaService);
  private filmeService: FilmeService = inject(FilmeService);
  private salaService: SalaService = inject(SalaService);
  private sessaoService: SessaoService = inject(SessaoService);
  private horarioService: HorarioService = inject(HorarioService);
  private ibgeService: IBGEService = inject(IBGEService);
  private estabelecimentoService: EstabelecimentoService = inject(EstabelecimentoService);

  ngOnInit(): void {
    this.initLists();
  }

  verificarEmail(email: string): void {
    this.toggleButton({ nome: email, isSelected: false }, 'Email');
  }

  verificarCep(cep: string): void {
    if(cep.length === 8) {
      this.toggleButton({nome: cep, isSelected: false}, 'Cep');
      return;
    }

    let index:number = this.filterList.findIndex(filter => filter.label.toLowerCase() === 'cep');
    this.filterList.splice(index, 1);
    this.filterMap.delete('cep');
    this.filter();
  }

  verificarEstabelecimento(): void {
    if(this.estabelecimento === '') {
      this.removeFilter({nome: this.estabelecimento, isSelected: true}, 'Estabelecimento');
      return;
    }

    this.toggleButton({nome: this.estabelecimento, isSelected: false}, 'Estabelecimento');
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

          if(filter.label.toLowerCase() === 'email' || filter.label.toLowerCase() === 'cep' || filter.label.toLowerCase() === 'estado' || filter.label.toLocaleLowerCase() === 'cidade')
            list.splice(0, list.length-1);
        }
      }

      if (!this.filterMap.has(filter.label.toLowerCase()))
        this.filterMap.set(filter.label.toLowerCase(), [filter.value.nome.toLowerCase()]);
    })

    this.routes();
  }

  filterEstabelecimentoEstado(estadoId: string): void {
    if(this.cidadeSelected.nome === undefined) {
      let index: number = this.filterList.findIndex(filter => filter.label.toLowerCase() === 'cidade');
      this.filterList.splice(index, 1);
      this.filterMap.delete('cidade');
    }

    this.ibgeService.findEstadoById(estadoId).subscribe(estado => {
      this.toggleButton({nome: estado.sigla, isSelected: false}, 'estado');
      this.findCidadesPorEstado(estado.id.toString());
    });
  }

  filterEstabelecimentoCidade(nome: string): void {
    this.toggleButton({nome, isSelected: false}, 'cidade')
  }

  limparAtributos(): void {
    this.filterList = [];
    this.filterMap.delete('cidade');
    this.filterMap.delete('estado');
    this.estadoSelected = {
      id: 0,
      nome: '',
      sigla: '',
      regiao: {
        id: 0,
        nome: '',
        sigla: ''
      }
    };
    this.cidadeSelected = {
      id: 0,
      nome: ''
    }
    this.estadoIsSelected = false; 
    this.filter();
  }  

  private findCidadesPorEstado(estadoId: string): void {
    this.ibgeService.findCidadesPorEstado(estadoId).subscribe(cidades => {
      this.cidades = cidades;
      if(!this.estadoIsSelected)
        this.estadoIsSelected = true;
    })
  }

  private routes(): void {
    switch(this.tipo.toUpperCase()) {
      case "FUNCIONARIO": {
        this.usuarioService.filter(this.mapToObject(this.filterMap)).subscribe(usuarios => {
          this.onFilter.emit(usuarios);
        })
        break;
      }
      case "SALA": {
        this.salaService.filter(this.mapToObject(this.filterMap)).subscribe(salas => {
          this.onFilter.emit(salas);
        })
        break;
      }
      case "FILME": {
        this.filmeService.filter(this.mapToObject(this.filterMap)).subscribe(filmes => {
          this.onFilter.emit(filmes);
        });
        break;
      }
      case "SESSAO": {
        this.sessaoService.filter(this.mapToObject(this.filterMap)).subscribe(sessoes => {
          this.onFilter.emit(sessoes);
        })
        break;
      }
      case "HORARIO": {
        this.horarioService.filter(this.mapToObject(this.filterMap)).subscribe(horarios => {
          this.onFilter.emit(horarios);
        })
        break;
      }
      case "ESTABELECIMENTO": {
        this.estabelecimentoService.filter(this.mapToObject(this.filterMap)).subscribe(estabelecimentos => {
          this.onFilter.emit(estabelecimentos);
        })
        break;
      }
      default: {
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

    if(this.tipo.toLowerCase() === 'estabelecimento') {
      let filterExists:IFilter | undefined = this.filterList.find(filter => filter.label === label);
      if(filterExists) {
        let index: number = this.filterList.findIndex(filter => filter.label === label);
        this.filterList.splice(index, 1);
      }
    }
    
    botaoValue.isSelected = true;
    this.filterList.push({
      label: label,
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
      case 'ESTABELECIMENTO': {
        this.caseEstabelecimento();
        break;
      }
    }
  }

  private caseEstabelecimento(): void {
    this.ibgeService.findEstados().subscribe(estados => {
      estados.forEach(estado => this.estados.push(estado))
    });
  }

  private caseFilme(): void {
    let classificacaoList: string[] = ['Livre', 'Dez', 'Doze', 'Quatorze', 'Dezesseis', 'Dezoito'];
    let duracaoList: string[] = ['Curta', '1hr', '1hr30', '2h', '2hr30'];
    let statusList: string[] = ['Lancamento', 'Cartaz', 'Destaque', 'Pre-Estreia', 'Estreia'];

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
    let statusList: string[] = ['Ativo', 'Inativo'];

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
    let listTipoSessao: string[] = ['2D', '3D', '4D', 'D-BOX'];
    let listIdioma: string[] = ['Legendado', 'Dublado', 'Normal'];

    this.setBotao('Periodo', this.setBotaoValue(listPeriodo));
    this.setBotao('Status', this.setBotaoValue(listStatus));
    this.setBotao('Tipo', this.setBotaoValue(listTipoSessao));
    this.setBotao('Idioma', this.setBotaoValue(listIdioma));
  }
}

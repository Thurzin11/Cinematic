import { Component, inject, OnInit } from '@angular/core';
import { SalaService } from '../../../../services/sala/sala.service';
import { ISala } from '../../../../model/ISala';
import { FilmeService } from '../../../../services/filme/filme.service';
import { IFilme } from '../../../../model/IFilme';
import { ISessao } from '../../../../model/ISessao';
import { HorarioService } from '../../../../services/horario/horario.service';
import { IHorario } from '../../../../model/IHorario';
import { SessaoService } from '../../../../services/sessao/sessao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IEstabelecimento } from '../../../../model/IEstabelecimento';
import { EstabelecimentoService } from '../../../../services/estabelecimento/estabelecimento.service';

@Component({
  selector: 'app-sessao-form',
  templateUrl: './sessao-form.component.html',
  styleUrl: './sessao-form.component.scss'
})
export class SessaoFormComponent implements OnInit{
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
      duracao: '',
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
  salas: ISala[] = [];
  filmes: IFilme[] = [];
  horarios: IHorario[] = [];
  idiomas: string[] = ['Legendado', 'Dublado', 'Original'];
  tipos: string[] = ['2D', '3D', '4D', 'D-BOX'];
  estabelecimentos: IEstabelecimento[] = [];

  private salaService: SalaService = inject(SalaService);
  private filmeService: FilmeService = inject(FilmeService);
  private horarioService: HorarioService = inject(HorarioService);
  private sessaoService: SessaoService = inject(SessaoService);
  private estabelecimentoService: EstabelecimentoService = inject(EstabelecimentoService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get("id");
    if(id) {
      this.sessaoService.findById(id).subscribe(sessao => this.sessao = sessao);
    }

     this.salaService.findAll().subscribe(salas => this.salas = salas);
     this.filmeService.findAllByDisponibilidade().subscribe(filmes => this.filmes = filmes);
     this.horarioService.findAll().subscribe(horarios => this.horarios = horarios);
     this.estabelecimentoService.findAll().subscribe(estabelecimentos => this.estabelecimentos = estabelecimentos);
  }

  register(): void {
    this.sessaoService.create(this.sessao).subscribe(() => this.router.navigate(["/sistema/sessao"]));
  }
}

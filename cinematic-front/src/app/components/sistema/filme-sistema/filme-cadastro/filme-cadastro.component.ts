import { Component, OnInit } from '@angular/core';
import { ICategoria } from '../../../../model/ICategoria';
import { CategoriaService } from '../../../../services/categoria/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IFilme } from '../../../../model/IFilme';
import { FilmeService } from '../../../../services/filme/filme.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-filme-cadastro',
  templateUrl: './filme-cadastro.component.html',
  styleUrl: './filme-cadastro.component.scss'
})
export class FilmeCadastroComponent implements OnInit {
  filme: IFilme = {
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
  };
  categoriaList: ICategoria[] = [];
  classificacaoList: string[] = ['Livre', 'Dez', 'Doze', 'Quatorze', 'Dezesseis', 'Dezoito'];
  statusList: string[] = ['Cartaz', 'Estreia', 'Destaque', 'Pre_Estreia', 'lancamento'];
  trailers: string[] = [];
  capas: string[] = [];
  trailer: string = '';
  capa: string = '';
  status: string = '';
  canSubmit: boolean = false;
  canSubmitCapas: boolean = false;

  constructor(
    private categoriaService: CategoriaService,
    private filmeService: FilmeService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get("id");
    if(id && id != null) {
      this.filmeService.findById(id).subscribe(filme => this.filme = filme);
    }

    this.categoriaService.findAll().subscribe(categoriaList => {this.categoriaList = categoriaList; console.log(this.categoriaList)});
  }

  adicionarTrailer(string: string, list: string): void {
    if(string === '')
      return;
    
    if(list.toLowerCase() === 'trailer') {
      this.trailers.push(string);
      this.trailer = '';
      return;
    }
  
    this.capas.push(string);
    this.capa = '';
  }

  enableSubmit(): void {
    this.canSubmit = true;
  }

  disableSubmit(): void {
    this.canSubmit = false;
  }

  enableSubmitCapas(): void {
    this.canSubmitCapas = true;
  }

  disableSubmitCapas(): void {
    this.canSubmitCapas = false;
  }

  register(): void {
    this.filme.trailers = this.trailers;
    this.filme.capas = this.capas;
    this.filmeService.create(this.filme).subscribe(() => this.router.navigate(['/sistema/filme']));
  }
}

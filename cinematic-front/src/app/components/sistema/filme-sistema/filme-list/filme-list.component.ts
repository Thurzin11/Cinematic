import { Component, inject, OnInit } from '@angular/core';
import { ICategoria } from '../../../../model/ICategoria';
import { CategoriaService } from '../../../../services/categoria/categoria.service';
import { FilmeService } from '../../../../services/filme/filme.service';
import { IFilme } from '../../../../model/IFilme';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';


@Component({
  selector: 'app-filme-list',
  templateUrl: './filme-list.component.html',
  styleUrl: './filme-list.component.scss'
})
export class FilmeListComponent implements OnInit{
  filmes: IFilme[] = [];
  categoriaList: ICategoria[] = [];
  classificacaoList: string[] = ['Livre', 'Dez', 'Doze', 'Quatorze', 'Dezesseis', 'Dezoito'];
  duracaoList: string[] = ['1hr-', '1hr30-', '2h-', '2hr30-'];
  statusList: string[] = ['Lançamento', 'Cartaz', 'Destaque', 'Pré-Estreia', 'Estreia'];
  filterIsOpen: boolean = false;
  filmeDetails: IFilme = {
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
  openFilmeDetailes: boolean = false;
  userId: string = '';
  userType: string = '';
  
  private categoriaService: CategoriaService = inject(CategoriaService);
  private filmeService: FilmeService = inject(FilmeService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  constructor() {
    this.findAllFilmes();
  }

  ngOnInit(): void {
    const id: string | undefined = this.route.snapshot.queryParams['userLogged'];
    const userType: string | undefined = this.route.snapshot.queryParams['userType'];
    if(id && userType) {
      this.userId = id;
      this.userType = userType;
    }

    this.categoriaService.findAll().subscribe(categoriaList => this.categoriaList = categoriaList); 
    this.findAllFilmes();
  }

  private findAllFilmes(): void {
    this.filmeService.findAllByDisponibilidade().subscribe(filmes => this.filmes = filmes);
  }

  toggleFiltro(): void {
    this.filterIsOpen = !this.filterIsOpen;
    if(!this.filterIsOpen)
      this.findAllFilmes();
  }

  findByNomeIlike(nome: string): void {
    if(nome === '') {
      this.findAllFilmes();
      return;
    }

    this.filmeService.findByNomeIlike(nome).subscribe(filmes => this.filmes = filmes);
  }

  seeFilmeDetails(id: string): void {
    let filme = this.filmes.find((filme) => filme.id == id);
    if(filme) {
      this.filmeDetails = filme;
      this.openFilmeDetailes = true;
    }
  }

  closeDetails(): void {
    this.openFilmeDetailes = false;
    this.findAllFilmes();
  }

  redirect(): void {
    this.router.navigate(['sistema/filme/cadastro'], {queryParams: {userLogged: this.userId, userType: this.userType}});
  }
}

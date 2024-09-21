import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ICategoria } from '../../../../model/ICategoria';
import { CategoriaService } from '../../../../services/categoria/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IFilme } from '../../../../model/IFilme';
import { FilmeService } from '../../../../services/filme/filme.service';

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
  statusList: string[] = ['Cartaz', 'Estreia', 'Destaque', 'Pre_Estreia', 'Lancamento'];
  trailers: string[] = [];
  capas: string[] = [];
  trailer: string = '';
  capa: string = '';
  status: string = '';
  canRegister: boolean = false;
  canSubmitTrailers: boolean = false;
  canSubmitCapas: boolean = false;
  isEdit: boolean = false;

  private categoriaService: CategoriaService = inject(CategoriaService);
  private filmeService: FilmeService = inject(FilmeService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get("id");
    if(id != null) {
      this.filmeService.findById(id).subscribe(filme => {
        this.filme = filme

        this.capas = this.filme.capas;
        this.trailers = this.filme.trailers;

        this.statusList.forEach(status => {
          if(this.filme.status.toString().toLowerCase() === status.toLowerCase()) {
            this.filme.status = status;
          }
        })

        this.classificacaoList.forEach(classificacao => {
          if(this.filme.classificacao.toString().toLowerCase() === classificacao.toLowerCase())
            this.filme.classificacao = classificacao;
        })

        this.categoriaService.findAll().subscribe(categoriaList => {
          this.categoriaList = categoriaList;
          
          this.categoriaList.forEach(categoria => {
            if(this.filme.categoria.id === categoria.id)
              this.filme.categoria = categoria;
          })
        });
      });
      this.isEdit = true;
      return;
    }

    this.categoriaService.findAll().subscribe(categoriaList => {
      this.categoriaList = categoriaList;

      if(this.filme.categoria.nome === '' && this.filme.categoria.id === '') {
        this.filme.categoria = categoriaList[0];
      }
    });

    if(this.filme.status === '')
      this.filme.status = this.statusList[0];
    
    if(this.filme.classificacao === '')
      this.filme.classificacao = this.classificacaoList[0];
  }

  adicionarTrailer(string: string, list: string): void {
    if(string === '')
      return;
    
    if(list.toLowerCase() === 'trailer') {
      this.filme.trailers.push(string);
      this.trailer = '';
      this.validaCampos();
      return;
    }
  
    this.filme.capas.push(string);
    this.capa = '';
    this.validaCampos();
  }

  enableSubmit(): void {
    this.canSubmitTrailers = true;
  }

  disableSubmit(): void {
    this.canSubmitTrailers = false;
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
    if(this.canRegister)
      this.filmeService.create(this.filme).subscribe(() => this.router.navigate(['/sistema/filme']));
  }

  update(): void {
    this.filmeService.update(this.filme).subscribe(() => this.router.navigate(['/sistema/filme']))
  }

  validaCampos(): boolean {
      if(
        this.filme.nome === '' || 
        this.filme.dataEstreia === '' || 
        this.filme.direcao === '' ||
        this.filme.banner === '' ||
        this.filme.trailers.length === 0 ||
        this.filme.capas.length === 0 ||
        this.filme.categoria.nome === '' ||
        this.filme.classificacao === '' ||
        this.filme.status === '' ||
        this.filme.descricao === '' ||
        this.filme.duracao === ''
      ) {
        this.canRegister = false;
        return false;
      }
  
      this.canRegister = true;
      return true;
  }
}

import { Component, OnInit } from '@angular/core';
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
    duracao: 0,
    classificacao: '',
    descricao: '',
    dataEstreia: '',
    disponibilidade: false,
    banner: '',
    direcao: '',
    distribuidora: '',
    statusFilme: '',
    capas: [],
    trailers: []
  };
  categoriaList: ICategoria[] = [];
  classificacaoList: string[] = ['Livre', 'Dez', 'Doze', 'Quatorze', 'Dezesseis', 'Dezoito'];
  trailer: string = '';
  capa: string = '';

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

  register(): void {
    this.filme.trailers.push(this.trailer);
    this.filme.capas.push(this.capa);
    this.filmeService.create(this.filme).subscribe();
    this.router.navigate(['/sistema/filme']);
  }
}

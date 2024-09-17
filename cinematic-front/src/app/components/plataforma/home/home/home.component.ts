import { Component, inject, OnInit } from '@angular/core';
import { IFilme } from '../../../../model/IFilme';
import { FilmeService } from '../../../../services/filme/filme.service';
import { IUsuario } from '../../../../model/IUsuario';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  filmesDestaque: IFilme[] = [];
  filmesCartaz: IFilme[] = [];
  filmesLancamento: IFilme[] = [];
  filmesEstreia: IFilme[] = [];
  filmesPreEstreia: IFilme[] = [];
  seeDetalhes: boolean = false;
  filmeDetalhe: IFilme = {
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
  }
  usuario: IUsuario = {
    id: '',
    nome: '',
    email: '',
    senha: '',
    status: false,
    tipoUsuario: ''
    }

  private filmeService: FilmeService = inject(FilmeService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const usuario: IUsuario = this.route.snapshot.queryParams['usuario'];
    console.log(usuario);

    this.filmeService.findAll().subscribe(filmes => {
      console.log(filmes);
      this.filmesDestaque = filmes.filter(filme => filme.status.toString().toLowerCase() === 'destaque');
      this.filmesCartaz = filmes.filter(filme => filme.status.toString().toLowerCase() === 'cartaz');
      this.filmesLancamento = filmes.filter(filme => filme.status.toString().toLowerCase() === 'lancamento');
      this.filmesEstreia = filmes.filter(filme => filme.status.toString().toLowerCase() === 'estreia');
      this.filmesPreEstreia = filmes.filter(filme => filme.status.toString().toLowerCase() === 'pre_estreia');
    });
  }

  showDetalhes(id: string): void {
    this.filmeService.findById(id).subscribe(filme => {
      this.filmeDetalhe = filme;
      this.seeDetalhes = true;
    })
  }

  closeDetalhes(): void {
    this.seeDetalhes = false;
  }
}

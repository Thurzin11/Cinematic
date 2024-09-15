import { Component, OnInit } from '@angular/core';
import { IFilme } from '../../../../model/IFilme';
import { FilmeService } from '../../../../services/filme/filme.service';

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

  constructor(private filmeService: FilmeService) {}

  ngOnInit(): void {
    this.filmeService.findAll().subscribe(filmes => {
      console.log(filmes);
      this.filmesDestaque = filmes.filter(filme => filme.status.toString().toLowerCase() === 'destaque');
      this.filmesCartaz = filmes.filter(filme => filme.status.toString().toLowerCase() === 'cartaz');
      this.filmesLancamento = filmes.filter(filme => filme.status.toString().toLowerCase() === 'lancamento');
      this.filmesEstreia = filmes.filter(filme => filme.status.toString().toLowerCase() === 'estreia');
      this.filmesPreEstreia = filmes.filter(filme => filme.status.toString().toLowerCase() === 'pre_estreia');
    });
  }
}

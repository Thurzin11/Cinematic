import { Component, Input, OnInit} from '@angular/core';
import { IFilme } from '../../../../model/IFilme';
import { FilmeService } from '../../../../services/filme/filme.service';

@Component({
  selector: 'app-filme-carrosel',
  templateUrl: './filme-carrosel.component.html',
  styleUrl: './filme-carrosel.component.scss'
})
export class FilmeCarroselComponent implements OnInit {
  filmes: IFilme[] = [];
  classificacao: string = '';
  classificacaoClass: string = '';

  constructor(private filmeService: FilmeService) {}

  ngOnInit(): void {
    this.filmeService.findAll().subscribe(filmes => {this.filmes = filmes; console.log(filmes)});
  }
}

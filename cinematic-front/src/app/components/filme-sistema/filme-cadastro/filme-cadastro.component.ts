import { Component, OnInit } from '@angular/core';
import { ICategoria } from '../../../model/ICategoria';
import { CategoriaService } from '../../../services/categoria/categoria.service';

@Component({
  selector: 'app-filme-cadastro',
  templateUrl: './filme-cadastro.component.html',
  styleUrl: './filme-cadastro.component.scss'
})
export class FilmeCadastroComponent implements OnInit {
  categoriaList: ICategoria[] = [];
  classificacaoList: string[] = ['Livre', 'Dez', 'Doze', 'Quatorze', 'Dezesseis', 'Dezoito'];

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.categoriaService.findAll().subscribe(categoriaList => this.categoriaList = categoriaList);
  }
}

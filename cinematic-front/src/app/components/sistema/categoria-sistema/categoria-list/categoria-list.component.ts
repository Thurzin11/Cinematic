import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ICategoria } from '../../../../model/ICategoria';
import { CategoriaService } from '../../../../services/categoria/categoria.service';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.scss'
})
export class CategoriaListComponent implements OnInit, OnChanges {
  categorias: ICategoria[] = [];
  filterIsOpen: boolean = false;
  openCategoriaDetails: boolean = false;
  categoriaDetails: ICategoria = {
    id: '',
    nome: ''
  };
  private categoriaService: CategoriaService = inject(CategoriaService);

  ngOnInit(): void {
    this.findAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.findAll();
  }

  private findAll(): void {
    this.categoriaService.findAll().subscribe(categorias => this.categorias = categorias);
  }

  openFiltro(): void {
    this.filterIsOpen = true;
  }

  findByNomeIlike(nome: string): void {
    if(nome === '') {
      this.findAll();
      return;
    }

    this.categoriaService.findByNomeIlike(nome).subscribe(categorias => this.categorias = categorias);
  }

  seeCategoriaDetails(id: string): void {
    this.categoriaService.findById(id).subscribe(categoria => {
      this.categoriaDetails = categoria;
      this.openCategoriaDetails = true;
    })
  }

  closeDetails(): void {
    this.openCategoriaDetails = false;
  }
}

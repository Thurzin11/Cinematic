import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ICategoria } from '../../../../model/ICategoria';
import { CategoriaService } from '../../../../services/categoria/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  userLogged: string = '';
  userType: string = '';

  private categoriaService: CategoriaService = inject(CategoriaService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  constructor() {
    this.findAll();
  }

  ngOnInit(): void {
    const userLogged: string | undefined = this.route.snapshot.queryParams['userLogged'];
    const userType: string | undefined = this.route.snapshot.queryParams['userType'];

    if(userLogged && userType) {
      this.userLogged = userLogged;
      this.userType = userType;
    }

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

  redirect(): void {
    this.router.navigate(['sistema/categoria/cadastro'], {queryParams: {userLogged: this.userLogged, userType: this.userType}});
  }
}

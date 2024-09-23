import { Component, inject, OnInit } from '@angular/core';
import { ICategoria } from '../../../../model/ICategoria';
import { CategoriaService } from '../../../../services/categoria/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.scss'
})
export class CategoriaFormComponent implements OnInit {
  categoria: ICategoria = {
    id: '',
    nome: ''
  }
  canRegister: boolean = false;
  userLogged: string = '';
  userType: string = '';

  private categoriaService: CategoriaService = inject(CategoriaService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    const userLogged: string | undefined = this.route.snapshot.queryParams['userLogged'];
    const userType: string | undefined = this.route.snapshot.queryParams['userType'];

    if(userLogged && userType) {
      this.userLogged = userLogged;
      this.userType = userType;
    }

    if(id)
      this.categoriaService.findById(id).subscribe(categoria => this.categoria = categoria);
  }

  register(): void {
    if(this.canRegister)
      this.categoriaService.create(this.categoria).subscribe(() => this.redirect());
  }

  validaCampos(): boolean {
    if(this.categoria.nome === '') {
      this.canRegister = false;
      return false;
    }

    this.canRegister = true;
    return true;
  }

  redirect(): void {
    this.router.navigate(['sistema/categoria'], {queryParams: {userLogged: this.userLogged, userType: this.userType}});
  }
}

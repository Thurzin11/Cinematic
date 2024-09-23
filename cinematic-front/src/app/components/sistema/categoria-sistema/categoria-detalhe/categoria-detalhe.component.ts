import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ICategoria } from '../../../../model/ICategoria';
import { CategoriaService } from '../../../../services/categoria/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoria-detalhe',
  templateUrl: './categoria-detalhe.component.html',
  styleUrl: './categoria-detalhe.component.scss'
})
export class CategoriaDetalheComponent implements OnInit {
  @Input() categoria: ICategoria = {
    id: '',
    nome: ''
  }
  @Output() onCloseDetails = new EventEmitter();

  showModal: boolean = false;
  userLogged: string = '';
  userType: string = '';

  private categoriaService: CategoriaService = inject(CategoriaService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  
  ngOnInit(): void {
    const userLogged: string | undefined = this.route.snapshot.queryParams['userLogged'];
    const userType: string | undefined = this.route.snapshot.queryParams['userType'];

    if(userLogged && userType) {
      this.userLogged = userLogged;
      this.userType = userType;
    }
  }

  fecharDetalhe(): void {
    this.onCloseDetails.emit();
  }

  inativar(id: string): void {
    this.categoriaService.delete(id).subscribe(() => this.onCloseDetails.emit());
  }
  
  redirect(): void {
    this.router.navigate([`sistema/categoria/editar/${this.categoria.id}`], {queryParams: {userLogged: this.userLogged, userType: this.userType}});
  }
}

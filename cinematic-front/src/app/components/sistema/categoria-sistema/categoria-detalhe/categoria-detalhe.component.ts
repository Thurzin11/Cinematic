import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ICategoria } from '../../../../model/ICategoria';
import { CategoriaService } from '../../../../services/categoria/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoria-detalhe',
  templateUrl: './categoria-detalhe.component.html',
  styleUrl: './categoria-detalhe.component.scss'
})
export class CategoriaDetalheComponent {
  @Input() categoria: ICategoria = {
    id: '',
    nome: ''
  }
  @Output() onCloseDetails = new EventEmitter();

  showModal: boolean = false;

  private categoriaService: CategoriaService = inject(CategoriaService);
  private router: Router = inject(Router);

  fecharDetalhe(): void {
    this.onCloseDetails.emit();
  }

  inativar(id: string): void {
    this.categoriaService.delete(id).subscribe(() => this.onCloseDetails.emit());
  }
}

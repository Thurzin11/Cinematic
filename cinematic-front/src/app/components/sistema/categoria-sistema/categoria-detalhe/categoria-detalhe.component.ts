import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ICategoria } from '../../../../model/ICategoria';
import { CategoriaService } from '../../../../services/categoria/categoria.service';

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
  private categoriaService: CategoriaService = inject(CategoriaService);

  fecharDetalhe(): void {
    this.onCloseDetails.emit();
  }

  inativar(id: string): void {
    this.categoriaService.delete(id).subscribe(() => this.onCloseDetails.emit());
  }
}

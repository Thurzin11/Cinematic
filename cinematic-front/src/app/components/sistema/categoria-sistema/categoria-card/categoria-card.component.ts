import { Component, Input } from '@angular/core';
import { ICategoria } from '../../../../model/ICategoria';

@Component({
  selector: 'app-categoria-card',
  templateUrl: './categoria-card.component.html',
  styleUrl: './categoria-card.component.scss'
})
export class CategoriaCardComponent {
  @Input() categoria: ICategoria = {
    id: '',
    nome: ''
  };
}

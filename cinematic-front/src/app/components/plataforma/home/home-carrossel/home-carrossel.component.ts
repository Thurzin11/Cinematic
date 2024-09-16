import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFilme } from '../../../../model/IFilme';

@Component({
  selector: 'app-home-carrossel',
  templateUrl: './home-carrossel.component.html',
  styleUrl: './home-carrossel.component.scss'
})
export class HomeCarrosselComponent {
  @Input() filmes: IFilme[] = [];
  @Input() nomeCarrossel: string = '';
  @Output() onShowDetalhes = new EventEmitter();

  showDetalhes(id: string): void {
    this.onShowDetalhes.emit(id);
  }
}

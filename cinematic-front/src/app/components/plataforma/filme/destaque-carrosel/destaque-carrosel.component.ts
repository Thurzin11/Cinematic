import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFilme } from '../../../../model/IFilme';

@Component({
  selector: 'app-destaque-carrosel',
  templateUrl: './destaque-carrosel.component.html',
  styleUrl: './destaque-carrosel.component.scss'
})
export class DestaqueCarroselComponent {
  @Input() filmes: IFilme[] = [];
  classificacao: string = '';
  classificacaoClass: string = '';
  @Output() onShowDetalhes = new EventEmitter();

  showDetalhes(id: string): void {
    this.onShowDetalhes.emit(id);
  }
}

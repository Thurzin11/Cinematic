import { Component, Input } from '@angular/core';
import { IFilme } from '../../../../model/IFilme';

@Component({
  selector: 'app-home-carrossel',
  templateUrl: './home-carrossel.component.html',
  styleUrl: './home-carrossel.component.scss'
})
export class HomeCarrosselComponent {
  @Input() filmes: IFilme[] = [];
  @Input() nomeCarrossel: string = '';
}

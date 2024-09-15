import { Component, Input, OnInit } from '@angular/core';
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
}

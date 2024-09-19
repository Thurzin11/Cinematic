import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-estabelecimento-card',
  templateUrl: './estabelecimento-card.component.html',
  styleUrl: './estabelecimento-card.component.scss'
})
export class EstabelecimentoCardComponent {
  @Input() nome: string = '';
  @Input() rua:string = '';
  @Input() bairro: string = '';
  @Input() numero: number = 0;
  @Input() cidade: string = '';
  @Input() estado: string = '';

}

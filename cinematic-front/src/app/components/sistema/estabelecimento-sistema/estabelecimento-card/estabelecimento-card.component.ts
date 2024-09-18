import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-estabelecimento-card',
  templateUrl: './estabelecimento-card.component.html',
  styleUrl: './estabelecimento-card.component.scss'
})
export class EstabelecimentoCardComponent {
  @Input() nome: string = '';
  @Input() endereco:string = '';
  @Input() cidade: string = '';
  @Input() estado: string = '';

}

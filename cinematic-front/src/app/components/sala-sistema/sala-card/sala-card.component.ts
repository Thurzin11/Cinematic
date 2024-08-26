import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sala-card',
  templateUrl: './sala-card.component.html',
  styleUrl: './sala-card.component.scss'
})
export class SalaCardComponent {
  @Input() numero: number = 0;
  @Input() disponibilidade: boolean = false;
  @Input() tipo: string = '';
  @Input() tamanho: string = '';
}

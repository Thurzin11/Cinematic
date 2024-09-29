import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-caminho-ingresso',
  templateUrl: './caminho-ingresso.component.html',
  styleUrl: './caminho-ingresso.component.scss'
})
export class CaminhoIngressoComponent {
  @Input() page: string = '';

  setClass(): void {
    const spanClasses: string[] = [];
    const divClasses: string[] = [];

    switch(this.page.toUpperCase()) {
      case "INGRESSO": {
        spanClasses.push("APAGADO")
        break;
      }
      case "PAGAMENTO": {
        break;
      }
    }
  }
}

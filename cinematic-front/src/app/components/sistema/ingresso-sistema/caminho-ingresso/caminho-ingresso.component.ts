import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-caminho-ingresso',
  templateUrl: './caminho-ingresso.component.html',
  styleUrl: './caminho-ingresso.component.scss'
})
export class CaminhoIngressoComponent implements OnInit{
  @Input() page: string = '';
  sessaoClasses: string[] = [];
  assentoClasses: string[] = [];
  ingressoClasses: string[] = [];

  ngOnInit(): void {
    this.setClass();
  }

  private setClass(): void {
    switch(this.page.toUpperCase()) {
      case "SESSAO": {
        this.ingressoClasses.push('apagado');
        this.assentoClasses.push('apagado');
        break;
      }
      case "ASSENTO": {
        this.sessaoClasses.push('amarelo');
        this.assentoClasses.splice(0, 1);
        break;
      }
      case "PAGAMENTO": {
        this.assentoClasses.push('amarelo');
        break;
      }
    }
  }
}

import { Component, inject } from '@angular/core';
import { ITipoIngresso } from '../../../../model/ITipoIngresso';
import { ActivatedRoute } from '@angular/router';
import { ITipoPagamento } from '../../../../model/ITipoPagamento';

@Component({
  selector: 'app-pagamento-ingresso',
  templateUrl: './pagamento-ingresso.component.html',
  styleUrl: './pagamento-ingresso.component.scss'
})
export class PagamentoIngressoComponent {
isPagamento: boolean = false;
  tipoIngresso: ITipoIngresso [] = [
  {
    nome: "Inteira",
    valor: 20,
    quantidade: 0
  },
  {
    nome: "Meia-Estudante",
    valor: 10,
    quantidade: 0
  },
  {
    nome: "Meia Criança",
    valor: 10,
    quantidade: 0
  },
  {
    nome: "Meia Idoso",
    valor: 10,
    quantidade: 0
  },
  {
    nome: "Meia Entrada - PCD",
    valor: 10,
    quantidade: 0
  }
];

  tipoPagamento: ITipoPagamento [] = [
    {
      nome: 'Cartão de Crédito'
    },
    {
      nome: 'Cartão de Débito'
    },
    {
      nome: 'Paypal'
    },
    {
      nome: 'Pix'
    }
  ]

  private route: ActivatedRoute = inject(ActivatedRoute);

  constructor(){

  }

  increment(ingresso: ITipoIngresso): void{
    ingresso.quantidade++;
  }
  decrement(ingresso: ITipoIngresso): void{
    if (ingresso.quantidade>0) {
      ingresso.quantidade--;

    }
  }
}

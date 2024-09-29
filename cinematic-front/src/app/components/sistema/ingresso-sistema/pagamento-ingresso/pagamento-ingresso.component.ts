import { Component, inject, OnInit } from '@angular/core';
import { ITipoIngresso } from '../../../../model/ITipoIngresso';
import { ActivatedRoute } from '@angular/router';
import { ITipoPagamento } from '../../../../model/ITipoPagamento';
import { IAssento } from '../../../../model/IAssento';

@Component({
  selector: 'app-pagamento-ingresso',
  templateUrl: './pagamento-ingresso.component.html',
  styleUrl: './pagamento-ingresso.component.scss'
})
export class PagamentoIngressoComponent implements OnInit {
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

  assentos: IAssento[] = [];
  private route: ActivatedRoute = inject(ActivatedRoute);

  constructor(){

  }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) =>{
      let assentos = params.get("assentos");
      if (assentos!=null) {
        this.assentos = JSON.parse(assentos);
        console.log(this.assentos);
      }
    })
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

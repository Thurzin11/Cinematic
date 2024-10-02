import { Component, Input } from '@angular/core';
import { ITipoPagamento } from '../../../../model/ITipoPagamento';

@Component({
  selector: 'app-pagamento-card',
  templateUrl: './pagamento-card.component.html',
  styleUrl: './pagamento-card.component.scss'
})
export class PagamentoCardComponent {
  @Input() tipoPagamento: ITipoPagamento = {
    nome: '',
    img: '',
    label: []
  };

  showInfosCartao: boolean = false;
  showInfosOthersPayment: boolean = false;

  toggleShowInfos(): void {
    if(this.tipoPagamento.nome.toUpperCase() === 'PIX' || this.tipoPagamento.nome.toUpperCase() === 'PAYPAL') {
      this.showInfosOthersPayment = !this.showInfosOthersPayment;
      return;
    }

    this.showInfosCartao = !this.showInfosCartao;
  }
}

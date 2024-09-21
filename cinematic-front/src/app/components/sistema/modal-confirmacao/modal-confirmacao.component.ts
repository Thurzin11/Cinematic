import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrl: './modal-confirmacao.component.scss'
})
export class ModalConfirmacaoComponent {
  @Output() onClose = new EventEmitter();
  @Output() onInativar = new EventEmitter();

  close(): void {
    this.onClose.emit();
  }
  
  inativar(): void {
    this.onInativar.emit();
  }
}

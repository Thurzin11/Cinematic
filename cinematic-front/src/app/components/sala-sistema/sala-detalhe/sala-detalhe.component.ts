import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISala } from '../../../model/ISala';
import { SalaService } from '../../../services/sala/sala.service';

@Component({
  selector: 'app-sala-detalhe',
  templateUrl: './sala-detalhe.component.html',
  styleUrl: './sala-detalhe.component.scss'
})
export class SalaDetalheComponent {
  @Input() sala: ISala = {
    id: '',
    numero: 0,
    fileiras: [],
    quantidadeColunas: 0,
    tipo: '',
    tamanho: '',
    disponibilidade: false
  };
  @Output() onCloseDetails = new EventEmitter();
  @Output() onEdit = new EventEmitter();
  @Output() onAtivar = new EventEmitter();
  @Output() onInativar = new EventEmitter();

  constructor(private salaService: SalaService) {}
  
  close(): void {
    this.onCloseDetails.emit();
  }

  edit(salaId: string): void {
    this.onEdit.emit(salaId);
  }

  inativar(salaId: string): void {
    this.onInativar.emit(salaId);
  }

  ativar(salaId: string): void {
    this.onAtivar.emit(salaId);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IHorario } from '../../../../model/IHorario';

@Component({
  selector: 'app-horario-detalhe',
  templateUrl: './horario-detalhe.component.html',
  styleUrl: './horario-detalhe.component.scss'
})
export class HorarioDetalheComponent {

  @Output() onClose = new EventEmitter();
  @Output() onInativar = new EventEmitter();
  @Output() onAtivar = new EventEmitter();

  @Input() horarioDetalhe: IHorario= {
      id: '',
      hora: '',
      status: false,
      periodo: ''
    }

  showModal: boolean = false;

  fecharDetalhe(): void{
    this.onClose.emit();
  }

  inativar(id : string): void{
    this.onInativar.emit(id);
  }

  ativar(id : string): void{
    this.onAtivar.emit(id);
  }
}

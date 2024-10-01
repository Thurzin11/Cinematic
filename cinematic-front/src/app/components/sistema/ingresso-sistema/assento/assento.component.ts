import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAssento } from '../../../../model/IAssento';

@Component({
  selector: 'app-assento',
  templateUrl: './assento.component.html',
  styleUrl: './assento.component.scss'
})
export class AssentoComponent {
  @Input() assento: IAssento = {
    id: '',
    nome: '',
    tipo: '',
    status: ''
  }
  @Input() assentosSelecionados: number = 0;
  @Output() onSelectAssento = new EventEmitter();
  @Output() onRemoveAssento = new EventEmitter();

  @Input() assentoIsSelected: boolean = false;

  setBackgroundAssento(tipo: string): string {
    if(tipo.toUpperCase() === 'ACOMPANHANTE')
      return 'acompanhante';

    if(tipo.toUpperCase() === 'DEFICIENTE')
      return 'deficiente';

    return '';
  }

  toggleAssento(): void {
    if(!this.assentoIsSelected && (this.assentosSelecionados < 10)) {
      this.onSelectAssento.emit(this.assento);
      this.assentoIsSelected = true;
      return;
    }

    this.onRemoveAssento.emit(this.assento);
    this.assentoIsSelected = false;
  }
}

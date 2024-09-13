import { IHorario } from './../../../model/IHorario';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-horario-card',
  templateUrl: './horario-card.component.html',
  styleUrl: './horario-card.component.scss'
})
export class HorarioCardComponent {

  @Input() horario: IHorario = {
    id: '',
    horario: '',
    status: false
  };

}

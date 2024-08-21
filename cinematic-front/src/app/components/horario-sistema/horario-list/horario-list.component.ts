import { Component } from '@angular/core';

@Component({
  selector: 'app-horario-list',
  templateUrl: './horario-list.component.html',
  styleUrl: './horario-list.component.scss'
})
export class HorarioListComponent {

  filtroIsOpen: boolean= false;

  fecharFiltro(): void{
    this.filtroIsOpen=!this.filtroIsOpen;
  }
}

import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../../../../services/horario/horario.service';
import { IHorario } from '../../../../model/IHorario';

@Component({
  selector: 'app-horario-list',
  templateUrl: './horario-list.component.html',
  styleUrl: './horario-list.component.scss'
})
export class HorarioListComponent implements OnInit{

  filtroIsOpen: boolean= false;
  listaHorarios: IHorario[] = [];
  constructor(private horarioService: HorarioService){}

  ngOnInit(): void {
    this.findAllHorario()
  }

  findAllHorario(): void{
    this.horarioService.findAll().subscribe(listaHorarios=> this.listaHorarios = listaHorarios)
  }

  fecharFiltro(): void{
    this.filtroIsOpen=!this.filtroIsOpen;
  }
}

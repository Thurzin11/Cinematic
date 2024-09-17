import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../../../services/horario/horario.service';
import { IHorario } from '../../../model/IHorario';

@Component({
  selector: 'app-horario-list',
  templateUrl: './horario-list.component.html',
  styleUrl: './horario-list.component.scss'
})
export class HorarioListComponent implements OnInit{

  detalheIsOpen: boolean= false;
  filtroIsOpen: boolean= false;
  horarioDetalhe: IHorario= {
    id: '',
    horario: '',
    status: false
  }

  listaHorarios: IHorario[] = [];
  constructor(private horarioService: HorarioService){
      this.findAllHorario();
  }

  ngOnInit(): void {
    this.findAllHorario()
  }

  findAllHorario(): void{
    this.horarioService.findAll().subscribe(listaHorarios=> this.listaHorarios = listaHorarios)
  }

  fecharFiltro(): void{
    this.filtroIsOpen=!this.filtroIsOpen;
  }

  abrirDetalhe(id: string): void{
    let horario=this.listaHorarios.find(horario=> horario.id==id)

    if (horario) {
      this.horarioDetalhe = horario;
      this.detalheIsOpen = true;
    }
  }

  fecharDetalhe(): void {
    this.detalheIsOpen = false;
  }

  inativar(id:string):void {
    this.horarioService.inativar(id).subscribe(()=>{
      this.findAllHorario();
      this.fecharDetalhe();
    });
  }

  ativar(id:string):void {
    this.horarioService.ativar(id).subscribe(()=>{
      this.findAllHorario();
      this.fecharDetalhe();
    });
  }
}

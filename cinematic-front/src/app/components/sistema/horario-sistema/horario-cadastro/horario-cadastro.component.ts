import { Router } from '@angular/router';
import { HorarioService } from './../../../../services/horario/horario.service';
import { Component } from '@angular/core';
import { IHorario } from '../../../../model/IHorario';

@Component({
  selector: 'app-horario-cadastro',
  templateUrl: './horario-cadastro.component.html',
  styleUrl: './horario-cadastro.component.scss'
})
export class HorarioCadastroComponent {
  horario: IHorario= {
    id: '',
    hora: '',
    status: false,
    periodo: ''
  }

  periodoList: string[] = ["Manha", "Tarde", "Noite"];

  constructor(private horarioService: HorarioService, private router: Router){}

  cadastrar(horario: IHorario){
    this.horarioService.create(horario).subscribe();
    this.router.navigate(["/sistema/horario"])
  }
}

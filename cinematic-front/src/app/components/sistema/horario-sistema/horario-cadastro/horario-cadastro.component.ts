import { ActivatedRoute, Router } from '@angular/router';
import { HorarioService } from './../../../../services/horario/horario.service';
import { Component, inject, OnInit } from '@angular/core';
import { IHorario } from '../../../../model/IHorario';

@Component({
  selector: 'app-horario-cadastro',
  templateUrl: './horario-cadastro.component.html',
  styleUrl: './horario-cadastro.component.scss'
})
export class HorarioCadastroComponent implements OnInit {
  horario: IHorario= {
    id: '',
    hora: '',
    status: false,
    periodo: ''
  }

  periodoList: string[] = ["Manha", "Tarde", "Noite"];
  canRegister: boolean = false;

  private horarioService: HorarioService = inject(HorarioService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if(id !== null) {
      this.horarioService.findById(id).subscribe(horario => {
        this.horario = horario;
        this.periodoList.forEach(periodo => {
          if(this.horario.periodo.toLowerCase() === periodo.toLowerCase())
            this.horario.periodo = periodo;
        })
      })

      return;
    }

    this.horario.periodo = this.periodoList[0];
  }

  cadastrar(horario: IHorario){
    if(this.canRegister)
      this.horarioService.create(horario).subscribe(() => this.router.navigate(["/sistema/horario"]));
  }

  validaCampos(): boolean {
    if(this.horario.hora === '' || this.horario.periodo === '') {
      this.canRegister = false;
      return false;
    }

    this.canRegister = true;
    return true;
  }
}

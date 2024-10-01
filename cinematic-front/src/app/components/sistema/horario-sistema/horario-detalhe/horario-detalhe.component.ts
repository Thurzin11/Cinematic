import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { IHorario } from '../../../../model/IHorario';
import { IUsuario } from '../../../../model/IUsuario';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario/usuario.service';

@Component({
  selector: 'app-horario-detalhe',
  templateUrl: './horario-detalhe.component.html',
  styleUrl: './horario-detalhe.component.scss'
})
export class HorarioDetalheComponent implements OnInit{

  @Output() onClose = new EventEmitter();
  @Output() onInativar = new EventEmitter();
  @Output() onAtivar = new EventEmitter();

  @Input() horarioDetalhe: IHorario = {
    id: '',
    hora: '',
    status: false,
    periodo: ''
  }
  showModal: boolean = false;

  private router: Router= inject(Router);

  ngOnInit(): void {
  }
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

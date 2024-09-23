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
  userLogged: IUsuario = {
    id: '',
    nome: '',
    email: '',
    senha: '',
    status: false,
    tipoUsuario: ''
  }
  private route: ActivatedRoute= inject(ActivatedRoute);
  private router: Router= inject(Router);
  private usuarioService: UsuarioService= inject(UsuarioService);
  ngOnInit(): void {
    const idUser: string = this.route.snapshot.queryParams['userLogged'];
    if (idUser) {
      this.usuarioService.findById(idUser).subscribe(usuario => {this.userLogged = usuario; console.log(this.userLogged);
      })
    }
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
  redirect(idHorario: string): void{
    this.router.navigate([`sistema/horario/editar/${idHorario}`],{queryParams: {userLogged: this.userLogged.id, userType: this.userLogged.tipoUsuario}})
  }
}

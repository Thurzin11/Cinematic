import { IUsuario } from './../../../../model/IUsuario';
import { Component, inject, OnInit } from '@angular/core';
import { HorarioService } from '../../../../services/horario/horario.service';
import { IHorario } from '../../../../model/IHorario';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario/usuario.service';

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
    hora: '',
    status: false,
    periodo: ''
  }
  userLogged: IUsuario ={
    id: '',
    nome: '',
    email: '',
    senha: '',
    status: false,
    tipoUsuario: ''
  }
  listaHorarios: IHorario[] = [];

  private usuarioService: UsuarioService = inject(UsuarioService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  constructor(private horarioService: HorarioService){
      this.findAllHorario();
    }

    ngOnInit(): void {
      this.findAllHorario()
      const idUser: string = this.route.snapshot.queryParams['userLogged'];
    if (idUser) {
      this.usuarioService.findById(idUser).subscribe(usuario => {this.userLogged = usuario; console.log(this.userLogged);
      })
    }
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
  redirect(): void{
    this.router.navigate(['sistema/horario/cadastro'],{queryParams: {userLogged: this.userLogged.id, userType: this.userLogged.tipoUsuario}})
  }
}

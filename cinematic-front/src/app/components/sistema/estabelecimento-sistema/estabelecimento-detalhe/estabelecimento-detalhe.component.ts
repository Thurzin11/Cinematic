import { ActivatedRoute, Router } from '@angular/router';
import { IEstabelecimento } from './../../../../model/IEstabelecimento';
import { Component, EventEmitter, Output, Input, inject, OnInit } from '@angular/core';
import { IUsuario } from '../../../../model/IUsuario';
import { UsuarioService } from '../../../../services/usuario/usuario.service';

@Component({
  selector: 'app-estabelecimento-detalhe',
  templateUrl: './estabelecimento-detalhe.component.html',
  styleUrl: './estabelecimento-detalhe.component.scss'
})
export class EstabelecimentoDetalheComponent implements OnInit {
  @Output() onClose = new EventEmitter();
  @Output() onEditar = new EventEmitter();
  @Input() estabelecimentoDetails:IEstabelecimento ={
    id: '',
    nome: '',
    rua: '',
    bairro: '',
    numero: 0,
    cidade: '',
    estado: '',
    cep: ''
  }
  userLogged: IUsuario = {
    id: '',
    nome: '',
    email: '',
    senha: '',
    status: false,
    tipoUsuario: ''
  }
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private usuarioService: UsuarioService = inject(UsuarioService);

  ngOnInit(): void {
    const idUser: string = this.route.snapshot.queryParams['userLogged'];
    if (idUser) {
      this.usuarioService.findById(idUser).subscribe(usuario => {this.userLogged = usuario; console.log(this.userLogged);
      })
    }
  }
  close():void{
    this.onClose.emit();
  }
  redirect(idEstabelecimento: string): void{
    this.router.navigate([`sistema/estabelecimento/editar/${idEstabelecimento}`],{queryParams: {userLogged: this.userLogged.id, userType: this.userLogged.tipoUsuario}})
  }
}

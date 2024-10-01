import { Component, inject, Input, OnInit } from '@angular/core';
import { IUsuario } from '../../../model/IUsuario';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario/usuario.service';

@Component({
  selector: 'app-header-sistema',
  templateUrl: './header-sistema.component.html',
  styleUrl: './header-sistema.component.scss'
})
export class HeaderSistemaComponent implements OnInit{
  userLogged: IUsuario = {
    id: '',
    nome: '',
    email: '',
    senha: '',
    status: false,
    tipoUsuario: ''
  };
  options: boolean = false;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private usuarioService: UsuarioService = inject(UsuarioService);

  ngOnInit(): void {
    const id: string | undefined = this.route.snapshot.queryParams['userLogged'];
    if(id) {
      this.usuarioService.findById(id).subscribe(usuario => this.userLogged = usuario);
    }
  }

  activateOptions(){
    this.options =! this.options;
    console.log(this.options);
  }
}

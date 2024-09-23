import { Component, OnInit } from '@angular/core';
import { IUsuario } from '../../../../model/IUsuario';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-funcionario-cadastro',
  templateUrl: './funcionario-cadastro.component.html',
  styleUrl: './funcionario-cadastro.component.scss'
})
export class FuncionarioCadastroComponent implements OnInit {
  usuario: IUsuario = {
    id: '',
    nome: '',
    email: '',
    senha: '',
    status: false,
    tipoUsuario: '',
  };
  editar: boolean = false;
  userLogged: IUsuario = {
    id: '',
    nome: '',
    email: '',
    senha: '',
    status: false,
    tipoUsuario: ''
  };
  cargos: string[] = ['Funcionario','Gerente'];

  constructor(private usuarioService: UsuarioService,private router: Router,private route: ActivatedRoute){}

  ngOnInit(): void{
    let id: string | null = this.route.snapshot.paramMap.get('id');
    const idUser: string = this.route.snapshot.queryParams['userLogged'];
    if (idUser) {
      this.usuarioService.findById(idUser).subscribe(usuario => this.userLogged = usuario);
    }
    if (id && id!=null) {
      this.editar = true;
      this.usuarioService.findById(id).subscribe((usuario)=> {
        this.usuario = usuario
        this.cargos.forEach(cargo=>{
          if (this.usuario.tipoUsuario.toLowerCase() === cargo.toLowerCase())
            this.usuario.tipoUsuario = cargo;
        })
      });
      return;
    }
    this.usuario.tipoUsuario = this.cargos[0];
  }
  cadastraUsuario(usuario: IUsuario): void{
    if (this.editar) {
      this.usuarioService.update(usuario).subscribe(usuario => console.log(usuario));
      this.router.navigate(["/sistema/funcionario"]);
    }else{
      this.usuarioService.createFuncionario(usuario).subscribe();
      this.router.navigate(["/sistema/funcionario"]);
    }
  }
}

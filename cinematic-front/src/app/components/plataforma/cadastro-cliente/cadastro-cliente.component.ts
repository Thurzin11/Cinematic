import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { IUsuarioClient } from '../../../model/IUsuarioClient';
import { IEstados } from '../../../model/IEstados';
import { IBGEService } from '../../../services/IBGE/ibge.service';
import { ICidades } from '../../../model/ICidades';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrl: './cadastro-cliente.component.scss'
})
export class CadastroClienteComponent {
  usuario: IUsuarioClient = {
    id: '',
    nome: '',
    email: '',
    senha: '',
    status: false,
    tipoUsuario: 'CLIENTE',
    cidade: '',
    estado: '',
    confirmPassword: ''
  }
  passwordsEquals: boolean = true;
  estados: IEstados[] = [];
  cidades: ICidades[] = [];

  constructor(private service: UsuarioService, private ibgeService: IBGEService){
    this.ibgeService.findEstados().subscribe(estados => this.estados = estados);
  }

  createUser(usuario: IUsuarioClient): void{
    if (usuario.senha == usuario.confirmPassword) {
      this.passwordsEquals = true;
      this.service.createClient(usuario).subscribe((usuario =>{console.log(usuario);
      }));
    }else{
      this.passwordsEquals = false;
    }
  }
  findCidades(): void{
    this.ibgeService.findCidadesPorEstado(this.usuario.estado).subscribe(cidades => this.cidades = cidades);
  }



}

import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { IUsuarioClient } from '../../../model/IUsuarioClient';
import { IEstados } from '../../../model/IEstados';
import { IBGEService } from '../../../services/IBGE/ibge.service';
import { ICidades } from '../../../model/ICidades';
import { Router } from '@angular/router';

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
  eyePassword: boolean = true;
  eyePasswordConfirm: boolean = true;
  passwordsEquals: boolean = true;
  validDados: boolean = true;
  estados: IEstados[] = [];
  cidades: ICidades[] = [];

  constructor(private service: UsuarioService, private ibgeService: IBGEService,private router: Router){
    this.ibgeService.findEstados().subscribe(estados => this.estados = estados);
  }

  createUser(usuario: IUsuarioClient): void{
    console.log(usuario);
    if (usuario.senha == usuario.confirmPassword) {
      this.passwordsEquals = true;
      this.service.createClient(usuario).subscribe(()=> {this.router.navigate([`login`])},
      erro=>{
        if (erro.status == 400) {
          this.validDados = false;
        }
      })
    }else{
      this.passwordsEquals = false;
    }
  }
  findCidades(): void{
    this.ibgeService.findCidadesPorEstado(this.usuario.estado).subscribe(cidades => this.cidades = cidades);
  }
  changeLogin(): void{
    this.router.navigate([`login`])
  }
  seePassword(password: any): void{
    if (password.type.value == 'text') {
      password.type.value = 'password'
    }else{
      password.type.value = 'text'
    }
    this.eyePassword = !this.eyePassword;
  }
  seePasswordConfirm(password: any): void{
    if (password.type.value == 'text') {
      password.type.value = 'password'
    }else{
      password.type.value = 'text'
    }
    this.eyePasswordConfirm = !this.eyePasswordConfirm;
  }

  limparCampos(): void{
    this.usuario = {
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
  }


}

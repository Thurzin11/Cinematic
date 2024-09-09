import { Router } from '@angular/router';
import { Component, OnChanges, SimpleChanges, ViewChild, ɵɵqueryRefresh } from '@angular/core';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { IUsuario } from '../../../model/IUsuario';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrl: './funcionario-list.component.scss'
})
export class FuncionarioListComponent{
  filterIsOpen: boolean = false;
  detalheIsOpen: boolean = false;
  usuarios: IUsuario[]=[];
  email: string = '';
  funcionarioDetails: IUsuario = {
    id: '',
    nome: '',
    email: '',
    senha: '',
    status: false,
    tipoUsuario: '',
    login: '',
    isGerente: false,
    cidade: '',
    estado: ''
  };

  constructor(private usuarioService: UsuarioService,private router: Router){
    this.findAll();
  }

  toggleFiltro(): void{
    this.filterIsOpen = !this.filterIsOpen;
  }

  openDetalhe(id: string): void{
    let funcionario = this.usuarios.find(usuario => usuario.id == id)
    console.log(funcionario);
    if(funcionario){
      this.funcionarioDetails = funcionario;
      this.detalheIsOpen = true;
    }
  }

  closeDetalhe(): void{
    this.detalheIsOpen = false;
    this.findAll();
  }
  filtroNome(nome: string):void{
    if (nome) {
      this.usuarioService.findByNome(nome).subscribe(usuarios => this.usuarios = usuarios);
    }else{
      this.findAll();
    }
  }
  findAll(): void{
    this.usuarioService.findAll().subscribe(usuarios => this.usuarios = usuarios);
  }
  inativarUsuario(id:string):void{
    this.usuarioService.inativarUsuario(id).subscribe(()=> this.findAll());
    this.closeDetalhe();
  }
  ativarUsuario(id: string): void{
    this.usuarioService.ativarUsuario(id).subscribe(() => this.findAll());
    this.closeDetalhe();
  }
}

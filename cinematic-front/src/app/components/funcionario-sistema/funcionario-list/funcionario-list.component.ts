import { Component, ViewChild } from '@angular/core';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { IUsuario } from '../../../model/IUsuario';
import { IUsuarioFilterParams } from '../../../model/IUsuarioFilterParams';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrl: './funcionario-list.component.scss'
})
export class FuncionarioListComponent  {
  filterIsOpen: boolean = false;
  detalheIsOpen: boolean = false;
  usuarios: IUsuario[]=[]
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

  constructor(private usuarioService: UsuarioService){}


  ngOnInit(): void {
    this.usuarioService.findAll().subscribe(usuarios => this.usuarios = usuarios)
  }

  toggleFiltro(): void{
    this.filterIsOpen = !this.filterIsOpen;
  }

  openDetalhe(id: string): void{
    let funcionario = this.usuarios.find(usuario => usuario.id == id)
    if(funcionario){
      this.funcionarioDetails = funcionario;
      this.detalheIsOpen = true;
    }
  }
  closeDetalhe(): void{
    this.detalheIsOpen = false;
  }
  filtroNome(nome: string):void{
    if (nome) {
      this.usuarioService.findByNome(nome).subscribe(usuarios => this.usuarios = usuarios);
    }else{
      this.usuarioService.findAll().subscribe(usuarios => this.usuarios = usuarios);
    }
  }

  filtrar(event: IUsuarioFilterParams): void{
    console.log(event);
    this.usuarioService.filter(event).subscribe(usuarios => this.usuarios = usuarios);
  }
}

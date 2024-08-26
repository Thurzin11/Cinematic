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

  constructor(private usuarioService: UsuarioService){
    this.findAll();
  }


  ngOnInit(): void {
    this.findAll();
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
  findAll(): void{
    this.usuarioService.findAll().subscribe(usuarios => this.usuarios = usuarios)
  }
}

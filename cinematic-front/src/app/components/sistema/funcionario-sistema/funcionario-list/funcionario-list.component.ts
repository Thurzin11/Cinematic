import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import { IUsuario } from '../../../../model/IUsuario';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrl: './funcionario-list.component.scss'
})
export class FuncionarioListComponent implements OnInit{
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
  };

  private usuarioService: UsuarioService = inject(UsuarioService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.findAll();
    const idUser: string | null = this.route.snapshot.paramMap.get('id');
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

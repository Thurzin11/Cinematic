import { UsuarioService } from './../../../../services/usuario/usuario.service';
import { Component, inject, OnInit } from '@angular/core';
import { IEstabelecimento } from '../../../../model/IEstabelecimento';
import { EstabelecimentoService } from '../../../../services/estabelecimento/estabelecimento.service';
import { find } from 'rxjs';
import { IUsuario } from '../../../../model/IUsuario';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-estabelecimento-list',
  templateUrl: './estabelecimento-list.component.html',
  styleUrl: './estabelecimento-list.component.scss'
})
export class EstabelecimentoListComponent implements OnInit {
  filterIsOpen: boolean = false;
  detalheIsOpen: boolean = false;
  estabelecimentoDetails: IEstabelecimento = {
    id: '',
    nome: '',
    rua: '',
    bairro: '',
    numero: 0,
    cidade: '',
    estado: '',
    cep: ''
  };
  userLogged: IUsuario = {
    id: '',
    nome: '',
    email: '',
    senha: '',
    status: false,
    tipoUsuario: ''
  }
  estabelecimentos: IEstabelecimento[]=[];

  private service: EstabelecimentoService = inject(EstabelecimentoService);
  private usuarioService: UsuarioService = inject(UsuarioService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  constructor(){
    this.findAll();
  }
  
  ngOnInit(): void {
    const idUser: string = this.route.snapshot.queryParams['userLogged'];
    if (idUser) {
      this.usuarioService.findById(idUser).subscribe(usuario => {this.userLogged = usuario; console.log(this.userLogged);
      })
    }
  }

  toggleFiltro(): void{
    this.filterIsOpen = !this.filterIsOpen;
    console.log(this.estabelecimentos);

  }

  findAll(): void{
    this.service.findAll().subscribe(estabelecimento=>this.estabelecimentos=estabelecimento);
  }

  findByNome(nome: string): void{
    if (nome) {
      this.service.findByNome(nome).subscribe(estabelecimento=>this.estabelecimentos=estabelecimento);
    }else{
      this.findAll();
    }
  }

  openDetalhe(id: string): void{
    let estabelecimento = this.estabelecimentos.find(estabelecimento => estabelecimento.id == id)
    console.log(estabelecimento);
    if(estabelecimento){
      this.estabelecimentoDetails = estabelecimento;
      this.detalheIsOpen = true;
    }
  }
  closeDetalhe(): void{
    this.detalheIsOpen = false;
    this.findAll();
  }

  redirect(): void{
    this.router.navigate(['sistema/estabelecimento/cadastro'],{queryParams: {userLogged: this.userLogged.id, userType: this.userLogged.tipoUsuario}})
  }


}

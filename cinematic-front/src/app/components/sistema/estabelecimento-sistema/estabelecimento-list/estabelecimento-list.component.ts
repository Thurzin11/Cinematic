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
  estabelecimentos: IEstabelecimento[]=[];

  private service: EstabelecimentoService = inject(EstabelecimentoService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  constructor(){
    this.findAll();
  }
  
  ngOnInit(): void {
    this.findAll();
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
}

import { ViaCepService } from './../../../../services/viaCep/via-cep.service';
import { Component, inject } from '@angular/core';
import { IEstabelecimento } from '../../../../model/IEstabelecimento';
import { IEstados } from '../../../../model/IEstados';
import { ICidades } from '../../../../model/ICidades';
import { IBGEService } from '../../../../services/IBGE/ibge.service';
import { EstabelecimentoService } from '../../../../services/estabelecimento/estabelecimento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estabelecimento-cadastro',
  templateUrl: './estabelecimento-cadastro.component.html',
  styleUrl: './estabelecimento-cadastro.component.scss'
})
export class EstabelecimentoCadastroComponent {
  estabelecimento: IEstabelecimento = {
    id: '',
    nome: '',
    endereco: '',
    cidade: '',
    estado: ''
  }
  numero: string = '';
  bairro: string = '';
  cep: string = '';
  cepIsValid: boolean = true;
  estados: IEstados[] = [];
  cidades: ICidades[] = [];

  private serviceCep: ViaCepService = inject(ViaCepService);
  private ibgeService: IBGEService = inject(IBGEService);
  private service: EstabelecimentoService = inject(EstabelecimentoService);
  private router: Router = inject(Router);

  constructor(){
    this.ibgeService.findEstados().subscribe(estados => this.estados = estados);
  }

  verificaCep(): void{
    if (this.cep.length == 8) {
      this.serviceCep.findEnderecoByCep(this.cep).subscribe((retorno)=>{
        this.estabelecimento.endereco = retorno.logradouro,
        this.estabelecimento.estado = retorno.uf,
        this.findCidades();
        this.estabelecimento.cidade = retorno.localidade,
        this.bairro = retorno.bairro;
      });
      this.cepIsValid = true;
      return
    }
    this.cepIsValid = false;
  }

  findCidades(): void{
    this.ibgeService.findCidadesPorEstado(this.estabelecimento.estado).subscribe(cidades => this.cidades = cidades);
  }

  create(): void{
    this.estabelecimento.endereco = this.estabelecimento.endereco +", "+ this.numero+ " - "+this.bairro;
    this.service.create(this.estabelecimento).subscribe((retorno)=> console.log(retorno));
    this.router.navigate([`/sistema/estabelecimento`]);
  }

}

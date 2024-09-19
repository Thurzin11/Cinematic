import { ViaCepService } from './../../../../services/viaCep/via-cep.service';
import { Component, inject , OnInit } from '@angular/core';
import { IEstabelecimento } from '../../../../model/IEstabelecimento';
import { IEstados } from '../../../../model/IEstados';
import { ICidades } from '../../../../model/ICidades';
import { IBGEService } from '../../../../services/IBGE/ibge.service';
import { EstabelecimentoService } from '../../../../services/estabelecimento/estabelecimento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-estabelecimento-cadastro',
  templateUrl: './estabelecimento-cadastro.component.html',
  styleUrl: './estabelecimento-cadastro.component.scss'
})
export class EstabelecimentoCadastroComponent implements OnInit {
  estabelecimento: IEstabelecimento = {
    id: '',
    nome: '',
    rua: '',
    bairro: '',
    numero: 0,
    cidade: '',
    estado: '',
    cep: ''
  }
  numero: string = '';
  bairro: string = '';
  cepIsValid: boolean = true;
  estados: IEstados[] = [];
  cidades: ICidades[] = [];
  disableSelect: boolean = true;

  private serviceCep: ViaCepService = inject(ViaCepService);
  private ibgeService: IBGEService = inject(IBGEService);
  private estabelecimentoService: EstabelecimentoService = inject(EstabelecimentoService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.estabelecimentoService.findById(id).subscribe(estabelecimento => {
        this.estabelecimento = estabelecimento;
        this.verificaCep();
      });
    }

    this.ibgeService.findEstados().subscribe(estados => this.estados = estados);
  }

  verificaCep(): void{
    if (this.estabelecimento.cep.length == 8) {
      this.serviceCep.findEnderecoByCep(this.estabelecimento.cep).subscribe((retorno)=>{
        this.estabelecimento.rua = retorno.logradouro,
        this.estabelecimento.estado = retorno.uf,
        this.findCidades();
        this.estabelecimento.cidade = retorno.localidade,
        this.estabelecimento.bairro = retorno.bairro;
      });
      this.cepIsValid = true;
      this.disableSelect = false;
      return
    }
    this.cepIsValid = false;
  }

  private findCidades(): void{
    this.ibgeService.findEstados().subscribe(estados => {
      let idEstado: number | undefined;

      let estado: IEstados | undefined = estados.find(estado => estado.sigla === this.estabelecimento.estado);
      if(estado)
        idEstado = estado.id;

      if(idEstado && idEstado !== 0)
        this.ibgeService.findCidadesPorEstado(idEstado.toString()).subscribe(cidades => this.cidades = cidades);
    })

  }

  create(): void{
    if(this.estabelecimento.numero !== 0)
      this.estabelecimentoService.create(this.estabelecimento).subscribe(() => this.router.navigate([`/sistema/estabelecimento`]));
  }

}

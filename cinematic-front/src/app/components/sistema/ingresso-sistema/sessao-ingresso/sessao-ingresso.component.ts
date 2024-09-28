import { Component, inject, OnInit } from '@angular/core';
import { ISessao } from '../../../../model/ISessao';
import { SessaoService } from '../../../../services/sessao/sessao.service';

@Component({
  selector: 'app-sessao-ingresso',
  templateUrl: './sessao-ingresso.component.html',
  styleUrl: './sessao-ingresso.component.scss'
})
export class SessaoIngressoComponent implements OnInit {
  filterIsOpen: boolean = false;
  sessoes: ISessao[] = [];

  private sessaoService: SessaoService = inject(SessaoService);

  constructor() {
    this.findAllSessoes();
  }

  ngOnInit(): void {
    this.findAllSessoes();
  }

  private findAllSessoes(): void {
    this.sessaoService.findAll().subscribe(sessoes => this.sessoes = sessoes);
  }

  closeFiltro(): void {
    this.filterIsOpen = false;
  }
  
  openFiltro(): void {
    this.filterIsOpen = true;
  }

  redirect(): void {

  }

  findByNomeFilmeIlike(nome: string): void {
    if(nome === '')
      this.findAllSessoes();

    this.sessaoService.findByFilme(nome).subscribe(sessoes => this.sessoes = sessoes);
  }
}

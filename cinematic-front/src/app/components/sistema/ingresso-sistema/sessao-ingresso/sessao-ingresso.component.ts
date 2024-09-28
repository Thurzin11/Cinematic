import { Component, inject, OnInit } from '@angular/core';
import { ISessao } from '../../../../model/ISessao';
import { SessaoService } from '../../../../services/sessao/sessao.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sessao-ingresso',
  templateUrl: './sessao-ingresso.component.html',
  styleUrl: './sessao-ingresso.component.scss'
})
export class SessaoIngressoComponent implements OnInit {
  filterIsOpen: boolean = false;
  sessoes: ISessao[] = [];
  userLogged: string = '';
  userType: string = '';

  private sessaoService: SessaoService = inject(SessaoService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  constructor() {
    this.findAllSessoes();
  }

  ngOnInit(): void {
    const userLogged: string | undefined = this.route.snapshot.queryParams['userLogged'];
    const userType: string | undefined = this.route.snapshot.queryParams['userType'];

    if(userLogged && userType) {
      this.userLogged = userLogged;
      this.userType = userType;
    }

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

  redirect(sessaoId: string): void {
    this.router.navigate([`sistema/ingresso/${sessaoId}/assentos`], {queryParams: {userLogged: this.userLogged, userType: this.userType}});
  }

  findByNomeFilmeIlike(nome: string): void {
    if(nome === '')
      this.findAllSessoes();

    this.sessaoService.findByFilme(nome).subscribe(sessoes => this.sessoes = sessoes);
  }
}

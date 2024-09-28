import { Component, inject, OnInit } from '@angular/core';
import { ISala } from '../../../../model/ISala';
import { SalaService } from '../../../../services/sala/sala.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sala-list',
  templateUrl: './sala-list.component.html',
  styleUrl: './sala-list.component.scss'
})
export class SalaListComponent implements OnInit{
  filterIsOpen: boolean = false;
  openSalaDetails: boolean = false;
  salas: ISala[] = [];
  salaDetails: ISala = {
    id: '',
    numero: 0,
    fileiras: [],
    quantidadeColunas: 0,
    tipo: '',
    tamanho: '',
    disponibilidade: false
  };
  userLogged: string = '';
  userType: string = '';

  private salaService: SalaService = inject(SalaService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  constructor() {
    this.findAllSala();
  }

  ngOnInit(): void {
    const userLogged: string | undefined = this.route.snapshot.queryParams['userLogged'];
    const userType: string | undefined = this.route.snapshot.queryParams['userType'];

    if(userLogged && userType) {
      this.userLogged = userLogged;
      this.userType = userType;
    }

    this.findAllSala();
  }

  findAllSala(): void {
    this.salaService.findAll().subscribe(salas => this.salas = salas);
  }

  openFiltro(): void {
    this.filterIsOpen = true;
  }

  closeFiltro(): void {
    this.filterIsOpen = false;
  }

  seeSalaDetails(id: string): void {
    const sala: ISala | undefined = this.salas.find(sala => sala.id === id);
    if(sala) {
      this.salaDetails = sala;
      this.openSalaDetails = true;
    }
  }

  closeDetails(): void {
    this.openSalaDetails = false;
  }

  ativarSala(salaId: string): void {
    this.salaService.ativarSala(salaId).subscribe(() => {
      this.findAllSala();
      this.openSalaDetails = false;
    });
  }

  inativarSala(salaId: string): void {
    this.salaService.inativarSala(salaId).subscribe(() => {
      this.findAllSala();
      this.openSalaDetails = false;
    });
  }
  redirect(): void {
    this.router.navigate(['sistema/sala/cadastro'], {queryParams: {userLogged: this.userLogged, userType: this.userType}});
  }
}

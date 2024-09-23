import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ISala } from '../../../../model/ISala';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sala-detalhe',
  templateUrl: './sala-detalhe.component.html',
  styleUrl: './sala-detalhe.component.scss'
})
export class SalaDetalheComponent implements OnInit {
  @Input() sala: ISala = {
    id: '',
    numero: 0,
    fileiras: [],
    quantidadeColunas: 0,
    tipo: '',
    tamanho: '',
    disponibilidade: false
  };
  @Input() idUserLogged: string = '';
  @Output() onCloseDetails = new EventEmitter();
  @Output() onAtivar = new EventEmitter();
  @Output() onInativar = new EventEmitter();
  showModal: boolean = false;
  userLogged: string = '';
  userType: string = '';

  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  ngOnInit(): void {
    const userLogged: string | undefined = this.route.snapshot.queryParams['userLogged'];
    const userType: string | undefined = this.route.snapshot.queryParams['userType'];

    if(userLogged && userType) {
      this.userLogged = userLogged;
      this.userType = userType;
    }
  }

  close(): void {
    this.onCloseDetails.emit();
  }

  inativar(salaId: string): void {
    this.onInativar.emit(salaId);
  }

  ativar(salaId: string): void {
    this.onAtivar.emit(salaId);
  }

  redirect(): void {
    this.router.navigate([`sistema/sala/editar/${this.sala.id}`], {queryParams: {userLogged: this.userLogged, userType: this.userType}});
  }
}

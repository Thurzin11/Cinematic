import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ISala } from '../../../../model/ISala';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sala-detalhe',
  templateUrl: './sala-detalhe.component.html',
  styleUrl: './sala-detalhe.component.scss'
})
export class SalaDetalheComponent {
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
  @Output() onEdit = new EventEmitter();
  @Output() onAtivar = new EventEmitter();
  @Output() onInativar = new EventEmitter();
  showModal: boolean = false;

  private router: Router = inject(Router);

  close(): void {
    this.onCloseDetails.emit();
  }

  edit(salaId: string): void {
    this.onEdit.emit(salaId);
    this.redirect(salaId);
  }

  inativar(salaId: string): void {
    this.onInativar.emit(salaId);
  }

  ativar(salaId: string): void {
    this.onAtivar.emit(salaId);
  }
  redirect(salaId: string): void{
    this.router.navigate([`sistema/sala/editar/${salaId}`],{queryParams: {userLogged: this.idUserLogged}})
  }
}

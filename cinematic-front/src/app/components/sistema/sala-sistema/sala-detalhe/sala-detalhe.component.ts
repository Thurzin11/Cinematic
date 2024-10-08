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
  @Output() onCloseDetails = new EventEmitter();
  @Output() onAtivar = new EventEmitter();
  @Output() onInativar = new EventEmitter();
  showModal: boolean = false;

  private router: Router = inject(Router);

  ngOnInit(): void {
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
}

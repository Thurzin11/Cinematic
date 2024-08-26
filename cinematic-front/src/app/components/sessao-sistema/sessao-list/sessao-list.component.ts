import { Component } from '@angular/core';
import { ISessao } from '../../../model/ISessao';

@Component({
  selector: 'app-sessao-list',
  templateUrl: './sessao-list.component.html',
  styleUrl: './sessao-list.component.scss'
})
export class SessaoListComponent {
  sessoes: ISessao[] = [];
  filterIsOpen: boolean = false;

  closeFiltro(): void {
    this.filterIsOpen = false;
  }

  openFiltro(): void {
    this.filterIsOpen = true;
  }
}

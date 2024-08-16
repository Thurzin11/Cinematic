import { Component, Input, OnInit } from '@angular/core';
import { IFilme } from '../../../model/IFilme';
import { FilmeService } from '../../../services/filme/filme.service';
import { IClassificacao } from '../../../model/IClassificacao';

@Component({
  selector: 'app-filme-card',
  templateUrl: './filme-card.component.html',
  styleUrl: './filme-card.component.scss'
})
export class FilmeCardComponent implements OnInit {
  @Input() filmes: IFilme[] = [];
  classificacao: string = '';
  
  constructor(private filmeService: FilmeService) {}

  ngOnInit(): void {
    
  }

  setClassificacao(classificacao: IClassificacao): string {
    switch(classificacao.toString().toUpperCase()) {
      case 'LIVRE': return this.classificacao = 'L';
      case 'DEZ': return this.classificacao = '10';
      case 'DOZE': return  this.classificacao = '12';
      case 'QUATORZE': return this.classificacao = '14';
      case 'DEZESSEIS': return this.classificacao = '16';
      case 'DEZOITO': return this.classificacao = '18';
      default: return '';
    }
  }
}

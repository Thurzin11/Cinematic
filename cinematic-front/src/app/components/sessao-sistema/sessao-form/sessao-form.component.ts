import { Component, OnInit } from '@angular/core';
import { SalaService } from '../../../services/sala/sala.service';
import { ISala } from '../../../model/ISala';
import { FilmeService } from '../../../services/filme/filme.service';
import { IFilme } from '../../../model/IFilme';
import { ISessao } from '../../../model/ISessao';

@Component({
  selector: 'app-sessao-form',
  templateUrl: './sessao-form.component.html',
  styleUrl: './sessao-form.component.scss'
})
export class SessaoFormComponent implements OnInit{
  sessao: ISessao = {
    id: '',
    sala: '',
    horario: '',
    filme: '',
    disponibilidade: false,
    assentos: [],
    idioma: '',
    tipo: '',
    data: ''
  };
  salas: ISala[] = [];
  filmes: IFilme[] = [];
  idiomas: string[] = ['Legendado', 'Dublado', 'Original'];
  tipos: string[] = ['2D', '3D', '4D', 'D-BOX'];
  
  constructor(
    private salaService: SalaService,
    private filmeService: FilmeService,
    ) {}

  ngOnInit(): void {
     this.salaService.findAll().subscribe(salas => this.salas = salas);
     this.filmeService.findAll().subscribe(filmes => this.filmes = filmes); 
  }

  register(): void {
    
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { ISala } from '../../../../model/ISala';
import { SalaService } from '../../../../services/sala/sala.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sala-form',
  templateUrl: './sala-form.component.html',
  styleUrl: './sala-form.component.scss'
})
export class SalaFormComponent implements OnInit{
  sala: ISala = {
    id: '',
    numero: 0,
    fileiras: [],
    quantidadeColunas: 0,
    tipo: '',
    tamanho: '',
    disponibilidade: false
  };
  tipos: string[] = ['Cinema', 'Evento', 'Teatro'];
  tamanhos: string[] = ['Grande', 'Media', 'Pequena'];
  isEdit: boolean = false;

  private salaService: SalaService = inject(SalaService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get("id");
    if(id) {
      this.salaService.findById(id).subscribe(sala => {
        this.sala = sala;

        this.tipos.forEach(tipo => {
          if(this.sala.tipo.toLowerCase() === tipo.toLowerCase())
            this.sala.tipo = tipo;
        })

        this.tamanhos.forEach(tamanho => {
          if(this.sala.tamanho.toLowerCase() === tamanho.toLowerCase())
            this.sala.tamanho = tamanho;
        })
      });

      this.isEdit = true;
      return;
    }

    this.sala.tipo = this.tipos[0];
    this.sala.tamanho = this.tamanhos[0];
  }

  register(): void {
    this.salaService.create(this.sala).subscribe(() => this.router.navigate(['/sistema/sala']));
  }

  update(): void {
    this.salaService.update(this.sala).subscribe(() => this.router.navigate(['/sistema/sala']));
  }
}

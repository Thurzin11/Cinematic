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

  private salaService: SalaService = inject(SalaService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get("id");
    if(id)
      this.salaService.findById(id).subscribe(sala => {this.sala = sala; console.log(this.sala)});
  }

  register(): void {
    this.salaService.create(this.sala).subscribe(() => this.router.navigate(['/sistema/sala']));
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { ISala } from '../../../../model/ISala';
import { SalaService } from '../../../../services/sala/sala.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from '../../../../model/IUsuario';
import { UsuarioService } from '../../../../services/usuario/usuario.service';

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
  canRegister: boolean = false;
  userLogged: string = '';
  userType: string = '';

  private salaService: SalaService = inject(SalaService);
  private usuarioService: UsuarioService = inject(UsuarioService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get("id");
    const userLogged: string | undefined = this.route.snapshot.queryParams['userLogged'];
    const userType: string | undefined = this.route.snapshot.queryParams['userType'];

    if(userLogged && userType) {
      this.userLogged = userLogged;
      this.userType = userType;
    }

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
    if(this.canRegister)
      this.salaService.create(this.sala).subscribe(() => this.redirect());
  }

  update(): void {
    this.salaService.update(this.sala).subscribe(() => this.redirect());
  }

  validaCampos(): boolean {
    if(this.sala.tipo === '' || this.sala.tamanho === '') {
      this.canRegister = false;
      return false;
    }

    this.canRegister = true;
    return true;
  }

  redirect(): void {
    this.router.navigate(['sistema/sala'], {queryParams: {userLogged: this.userLogged, userType: this.userType}});
  }
}

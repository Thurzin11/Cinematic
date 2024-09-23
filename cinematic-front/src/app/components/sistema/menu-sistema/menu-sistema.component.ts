import { Component, inject , OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-sistema',
  templateUrl: './menu-sistema.component.html',
  styleUrl: './menu-sistema.component.scss'
})
export class MenuSistemaComponent implements OnInit{
  menuIsOpen = false;
  userId: string = '';
  userIsGerente: boolean = false; 
  
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const id: string | undefined = this.route.snapshot.queryParams['userLogged'];
    const userType: string | undefined = this.route.snapshot.queryParams['userType'];
    if(id) {
      this.userId = id;
    }
  
    if(userType) {
      if(userType.toLowerCase() === 'funcionario') {
        this.userIsGerente = false;
        return;
      }

      this.userIsGerente = true;
    }
  }

  closeMenu(): void {
    this.menuIsOpen = false;
  }

  openMenu(): void {
    this.menuIsOpen = true;
  }

  redirect(path: string): void {
    this.router.navigate([`/sistema/${path}`], {queryParams: {userLogged: this.userId, userType: this.userIsGerente ? 'GERENTE':'FUNCIONARIO'}});
  }
}

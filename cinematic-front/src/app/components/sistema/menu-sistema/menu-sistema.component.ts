import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-sistema',
  templateUrl: './menu-sistema.component.html',
  styleUrl: './menu-sistema.component.scss'
})
export class MenuSistemaComponent {
  menuIsOpen = false;
  @Input() userId: string = '';

  private router: Router = inject(Router);

  closeMenu(): void {
    this.menuIsOpen = false;
  }

  openMenu(): void {
    this.menuIsOpen = true;
  }

  redirect(path: string): void {
    console.log(this.userId);
    this.router.navigate([`/sistema/${path}`], {queryParams: {userLogged: this.userId}});
  }
  
}

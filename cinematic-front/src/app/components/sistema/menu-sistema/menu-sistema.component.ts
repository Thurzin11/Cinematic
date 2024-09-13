import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-sistema',
  templateUrl: './menu-sistema.component.html',
  styleUrl: './menu-sistema.component.scss'
})
export class MenuSistemaComponent {
  menuIsOpen = false;

  closeMenu(): void {
    this.menuIsOpen = false;
  }

  openMenu(): void {
    this.menuIsOpen = true;
  }
}

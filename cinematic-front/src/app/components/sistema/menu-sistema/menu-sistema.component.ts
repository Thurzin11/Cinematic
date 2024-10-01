import { Component , OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-sistema',
  templateUrl: './menu-sistema.component.html',
  styleUrl: './menu-sistema.component.scss'
})
export class MenuSistemaComponent implements OnInit{
  menuIsOpen = false;
  userIsGerente: boolean = false;

  ngOnInit(): void {
    const userType: string | null = sessionStorage.getItem("usuarioTipo");
    if(userType !== null && userType.toUpperCase() === 'GERENTE')
      this.userIsGerente = true;
  }

  closeMenu(): void {
    this.menuIsOpen = false;
  }

  openMenu(): void {
    this.menuIsOpen = true;
  }
}

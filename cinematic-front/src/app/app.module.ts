
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuSistemaComponent } from './components/menu-sistema/menu-sistema.component';
import { HomeSistemaComponent } from './components/home-sistema/home-sistema.component';
import { HeaderSistemaComponent } from './components/header-sistema/header-sistema.component';
import { LoginFuncionarioComponent } from './components/login-funcionario/login-funcionario.component';
import { FiltroSistemaComponent } from './components/filtro-sistema/filtro-sistema.component';
import { FilmeCardComponent } from './components/filme-sistema/filme-card/filme-card.component';
import { FilmeSistemaComponent } from './components/filme-sistema/filme-sistema/filme-sistema.component';
import { FuncionarioCadastroComponent } from './components/funcionario-sistema/funcionario-cadastro/funcionario-cadastro.component';
import { FuncionarioListComponent } from './components/funcionario-sistema/funcionario-list/funcionario-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuSistemaComponent,
    HomeSistemaComponent,
    HeaderSistemaComponent,
    LoginFuncionarioComponent,
    FiltroSistemaComponent,
    FilmeCardComponent,
    FilmeSistemaComponent,
    FuncionarioCadastroComponent,
    FuncionarioListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuSistemaComponent } from './components/menu-sistema/menu-sistema.component';
import { HomeSistemaComponent } from './components/home-sistema/home-sistema.component';
import { HeaderSistemaComponent } from './components/header-sistema/header-sistema.component';
import { LoginFuncionarioComponent } from './components/login-funcionario/login-funcionario.component';
import { FuncionarioCadastroComponent } from './components/funcionario-sistema/funcionario-cadastro/funcionario-cadastro.component';
import { FuncionarioListComponent } from './components/funcionario-sistema/funcionario-list/funcionario-list.component';
import { FuncionarioCardComponent } from './components/funcionario-sistema/funcionario-card/funcionario-card.component';
import { FilmeListComponent } from './components/filme-sistema/filme-list/filme-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FilmeCardComponent } from './components/filme-sistema/filme-card/filme-card.component';
import { FilmeCadastroComponent } from './components/filme-sistema/filme-cadastro/filme-cadastro.component';
import { FiltroSistemaComponent } from './components/filtro-sistema/filtro-sistema.component';
import { HorarioCadastroComponent } from './components/horario-sistema/horario-cadastro/horario-cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuSistemaComponent,
    HomeSistemaComponent,
    HeaderSistemaComponent,
    LoginFuncionarioComponent,
    FuncionarioCadastroComponent,
    FuncionarioListComponent,
    FuncionarioCardComponent,
    FilmeListComponent,
    FilmeCardComponent,
    FilmeCadastroComponent,
    FiltroSistemaComponent,
    HorarioCadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

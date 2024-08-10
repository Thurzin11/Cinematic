
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuSistemaComponent } from './components/menu-sistema/menu-sistema.component';
import { HomeSistemaComponent } from './components/home-sistema/home-sistema.component';
import { HeaderSistemaComponent } from './components/header-sistema/header-sistema.component';
import { FiltroSistemaComponent } from './components/filtro-sistema/filtro-sistema.component';
import { FilmeCardComponent } from './components/filme-sistema/filme-card/filme-card.component';
import { FilmeSistemaComponent } from './components/filme-sistema/filme-sistema/filme-sistema.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuSistemaComponent,
    HomeSistemaComponent,
    HeaderSistemaComponent,
    FiltroSistemaComponent,
    FilmeCardComponent,
    FilmeSistemaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

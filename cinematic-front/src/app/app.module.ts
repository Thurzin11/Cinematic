
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { register } from 'swiper/element/bundle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MenuSistemaComponent } from './components/sistema/menu-sistema/menu-sistema.component';
import { HomeSistemaComponent } from './components/sistema/home-sistema/home-sistema.component';
import { HeaderSistemaComponent } from './components/sistema/header-sistema/header-sistema.component';
import { LoginFuncionarioComponent } from './components/sistema/login-funcionario/login-funcionario.component';
import { FuncionarioCadastroComponent } from './components/sistema/funcionario-sistema/funcionario-cadastro/funcionario-cadastro.component';
import { FuncionarioListComponent } from './components/sistema/funcionario-sistema/funcionario-list/funcionario-list.component';
import { FuncionarioCardComponent } from './components/sistema/funcionario-sistema/funcionario-card/funcionario-card.component';
import { FilmeListComponent } from './components/sistema/filme-sistema/filme-list/filme-list.component';
import { FilmeCardComponent } from './components/sistema/filme-sistema/filme-card/filme-card.component';
import { FilmeCadastroComponent } from './components/sistema/filme-sistema/filme-cadastro/filme-cadastro.component';
import { FiltroSistemaComponent } from './components/filtro-sistema/filtro-sistema.component';
import { HorarioCadastroComponent } from './components/sistema/horario-sistema/horario-cadastro/horario-cadastro.component';
import { HorarioListComponent } from './components/sistema/horario-sistema/horario-list/horario-list.component';
import { HorarioCardComponent } from './components/sistema/horario-sistema/horario-card/horario-card.component';
import { FilmeDetalheComponent } from './components/sistema/filme-sistema/filme-detalhe/filme-detalhe.component';
import { FuncionarioDetalheComponent } from './components/sistema/funcionario-sistema/funcionario-detalhe/funcionario-detalhe.component';
import { SalaListComponent } from './components/sistema/sala-sistema/sala-list/sala-list.component';
import { SalaFormComponent } from './components/sistema/sala-sistema/sala-form/sala-form.component';
import { SalaCardComponent } from './components/sistema/sala-sistema/sala-card/sala-card.component';
import { SalaDetalheComponent } from './components/sistema/sala-sistema/sala-detalhe/sala-detalhe.component';
import { SessaoListComponent } from './components/sistema/sessao-sistema/sessao-list/sessao-list.component';
import { SessaoFormComponent } from './components/sistema/sessao-sistema/sessao-form/sessao-form.component';
import { SessaoCardComponent } from './components/sistema/sessao-sistema/sessao-card/sessao-card.component';
import { SessaoDetalheComponent } from './components/sistema/sessao-sistema/sessao-detalhe/sessao-detalhe.component';
import { DestaqueCarroselComponent } from './components/plataforma/filme/destaque-carrosel/destaque-carrosel.component';
import { DestaqueDetalheCarrosselComponent } from './components/plataforma/filme/destaque-detalhe-carrossel/destaque-detalhe-carrossel.component';
import { HomeCarrosselComponent } from './components/plataforma/home/home-carrossel/home-carrossel.component';
import { HomeComponent } from './components/plataforma/home/home/home.component';

register();
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
    HorarioCadastroComponent,
    HorarioListComponent,
    HorarioCardComponent,
    FilmeDetalheComponent,
    FuncionarioDetalheComponent,
    SalaListComponent,
    SalaFormComponent,
    SalaCardComponent,
    SalaDetalheComponent,
    SessaoListComponent,
    SessaoFormComponent,
    SessaoCardComponent,
    SessaoDetalheComponent,
    DestaqueCarroselComponent,
    DestaqueDetalheCarrosselComponent,
    HomeCarrosselComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class AppModule { }

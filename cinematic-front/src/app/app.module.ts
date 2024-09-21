
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
import { HorarioDetalheComponent } from './components/sistema/horario-sistema/horario-detalhe/horario-detalhe.component';
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
import { CadastroClienteComponent } from './components/plataforma/cadastro-cliente/cadastro-cliente.component';
import { PlataformaFilmeDetalheComponent } from './components/plataforma/home/plataforma-filme-detalhe/plataforma-filme-detalhe.component';
import { HomeComponent } from './components/plataforma/home/home/home.component';
import { HomeCarrosselComponent } from './components/plataforma/home/home-carrossel/home-carrossel.component';
import { DestaqueDetalheCarrosselComponent } from './components/plataforma/filme/destaque-detalhe-carrossel/destaque-detalhe-carrossel.component';
import { DestaqueCarroselComponent } from './components/plataforma/filme/destaque-carrosel/destaque-carrosel.component';
import { LoginClienteComponent } from './components/plataforma/login-cliente/login-cliente.component';
import { EstabelecimentoListComponent } from './components/sistema/estabelecimento-sistema/estabelecimento-list/estabelecimento-list.component';
import { EstabelecimentoCadastroComponent } from './components/sistema/estabelecimento-sistema/estabelecimento-cadastro/estabelecimento-cadastro.component';
import { EstabelecimentoCardComponent } from './components/sistema/estabelecimento-sistema/estabelecimento-card/estabelecimento-card.component';
import { EstabelecimentoDetalheComponent } from './components/sistema/estabelecimento-sistema/estabelecimento-detalhe/estabelecimento-detalhe.component';
import { CategoriaListComponent } from './components/sistema/categoria-sistema/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './components/sistema/categoria-sistema/categoria-form/categoria-form.component';
import { CategoriaCardComponent } from './components/sistema/categoria-sistema/categoria-card/categoria-card.component';
import { CategoriaDetalheComponent } from './components/sistema/categoria-sistema/categoria-detalhe/categoria-detalhe.component';
import { ModalConfirmacaoComponent } from './components/sistema/modal-confirmacao/modal-confirmacao.component';

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
    HorarioDetalheComponent,
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
    CadastroClienteComponent,
    DestaqueCarroselComponent,
    DestaqueDetalheCarrosselComponent,
    HomeCarrosselComponent,
    HomeComponent,
    PlataformaFilmeDetalheComponent,
    LoginClienteComponent,
    EstabelecimentoListComponent,
    EstabelecimentoCadastroComponent,
    EstabelecimentoCardComponent,
    EstabelecimentoDetalheComponent,
    CategoriaListComponent,
    CategoriaFormComponent,
    CategoriaCardComponent,
    CategoriaDetalheComponent,
    ModalConfirmacaoComponent
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

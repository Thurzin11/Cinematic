import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeSistemaComponent } from './components/sistema/home-sistema/home-sistema.component';
import { LoginFuncionarioComponent } from './components/sistema/login-funcionario/login-funcionario.component';
import { FuncionarioCadastroComponent } from './components/sistema/funcionario-sistema/funcionario-cadastro/funcionario-cadastro.component';
import { FilmeListComponent } from './components/sistema/filme-sistema/filme-list/filme-list.component';
import { FilmeCadastroComponent } from './components/sistema/filme-sistema/filme-cadastro/filme-cadastro.component';
import { HorarioCadastroComponent } from './components/sistema/horario-sistema/horario-cadastro/horario-cadastro.component';
import { HorarioListComponent } from './components/sistema/horario-sistema/horario-list/horario-list.component';
import { FuncionarioListComponent } from './components/sistema/funcionario-sistema/funcionario-list/funcionario-list.component';
import { SalaListComponent } from './components/sistema/sala-sistema/sala-list/sala-list.component';
import { SalaFormComponent } from './components/sistema/sala-sistema/sala-form/sala-form.component';
import { SessaoListComponent } from './components/sistema/sessao-sistema/sessao-list/sessao-list.component';
import { SessaoFormComponent } from './components/sistema/sessao-sistema/sessao-form/sessao-form.component';
import { CadastroClienteComponent } from './components/plataforma/cadastro-cliente/cadastro-cliente.component';
import { HomeComponent } from './components/plataforma/home/home/home.component';
import { DestaqueCarroselComponent } from './components/plataforma/filme/destaque-carrosel/destaque-carrosel.component';
import { LoginClienteComponent } from './components/plataforma/login-cliente/login-cliente.component';
import { EstabelecimentoListComponent } from './components/sistema/estabelecimento-sistema/estabelecimento-list/estabelecimento-list.component';
import { EstabelecimentoCadastroComponent } from './components/sistema/estabelecimento-sistema/estabelecimento-cadastro/estabelecimento-cadastro.component';
import { CategoriaListComponent } from './components/sistema/categoria-sistema/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './components/sistema/categoria-sistema/categoria-form/categoria-form.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SessaoIngressoComponent } from './components/sistema/ingresso-sistema/sessao-ingresso/sessao-ingresso.component';
import { PagamentoIngressoComponent } from './components/sistema/ingresso-sistema/pagamento-ingresso/pagamento-ingresso.component';
import { AssentosIngressoComponent } from './components/sistema/ingresso-sistema/assentos-ingresso/assentos-ingresso.component';

const routes: Routes = [
  {path: "sistema/home", component: HomeSistemaComponent},
  {path: "sistema/login", component: LoginFuncionarioComponent},
  {path: "sistema/funcionario/cadastro",component: FuncionarioCadastroComponent},
  {path: "sistema/filme", component: FilmeListComponent},
  {path: "sistema/filme/cadastro", component: FilmeCadastroComponent},
  {path: "sistema/horario/cadastro", component: HorarioCadastroComponent},
  {path: "sistema/horario", component: HorarioListComponent},
  {path: "sistema/horario/editar/:id", component: HorarioCadastroComponent},
  {path: "sistema/filme/editar/:id", component: FilmeCadastroComponent},
  {path: "sistema/funcionario",component: FuncionarioListComponent},
  {path: "sistema/funcionario/editar/:id",component: FuncionarioCadastroComponent},
  {path: "sistema/sala", component: SalaListComponent},
  {path: "sistema/sala/cadastro", component: SalaFormComponent},
  {path: "sistema/sala/editar/:id", component: SalaFormComponent},
  {path: "sistema/sessao", component: SessaoListComponent},
  {path: "sistema/sessao/cadastro", component: SessaoFormComponent},
  {path: "sistema/sessao/editar/:id", component: SessaoFormComponent},
  {path: "sistema/estabelecimento",component:EstabelecimentoListComponent},
  {path: "sistema/estabelecimento/cadastro",component:EstabelecimentoCadastroComponent},
  {path: "sistema/estabelecimento/editar/:id", component:EstabelecimentoCadastroComponent},
  {path: "sistema/categoria", component: CategoriaListComponent},
  {path: "sistema/categoria/cadastro", component: CategoriaFormComponent},
  {path: "sistema/categoria/editar/:id", component: CategoriaFormComponent},
  {path: "sistema/ingresso", component: SessaoIngressoComponent},
  {path: "sistema/ingresso/:idSessao",component: PagamentoIngressoComponent},
  {path: "sistema/ingresso/:sessaoId/assentos", component: AssentosIngressoComponent},
  {path: "cadastro", component: CadastroClienteComponent},
  {path: "home", component: HomeComponent},
  {path: "filme/carrossel", component: DestaqueCarroselComponent},
  {path: "login", component: LoginClienteComponent},
  {path: "bem-vindo", component: LandingPageComponent},
  {path: "", redirectTo: "bem-vindo", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

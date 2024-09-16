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
import { FilmeCarroselComponent } from './components/plataforma/filme/filme-carrosel/filme-carrosel.component';
import { CadastroClienteComponent } from './components/plataforma/cadastro-cliente/cadastro-cliente.component';

const routes: Routes = [
  {path: "sistema/home/:id", component: HomeSistemaComponent},
  {path: "sistema/login", component: LoginFuncionarioComponent},
  {path: "sistema/funcionario/cadastro",component: FuncionarioCadastroComponent},
  {path: "sistema/filme", component: FilmeListComponent},
  {path: "sistema/filme/cadastro", component: FilmeCadastroComponent},
  {path: "sistema/horario/cadastro", component: HorarioCadastroComponent},
  {path: "sistema/horario", component: HorarioListComponent},
  {path: "sistema/filme/editar/:id", component: FilmeCadastroComponent},
  {path: "sistema/funcionario",component: FuncionarioListComponent},
  {path: "sistema/funcionario/editar/:id",component: FuncionarioCadastroComponent},
  {path: "sistema/sala", component: SalaListComponent},
  {path: "sistema/sala/cadastro", component: SalaFormComponent},
  {path: "sistema/sala/editar/:id", component: SalaFormComponent},
  {path: "sistema/sessao", component: SessaoListComponent},
  {path: "sistema/sessao/cadastro", component: SessaoFormComponent},
  {path: "sistema/sessao/editar/:id", component: SessaoFormComponent},
  {path: "filme/carrossel", component: FilmeCarroselComponent},
  {path: "cadastro", component: CadastroClienteComponent},
  {path: "", redirectTo: "sistema/login", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

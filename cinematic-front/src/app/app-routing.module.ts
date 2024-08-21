import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeSistemaComponent } from './components/home-sistema/home-sistema.component';
import { LoginFuncionarioComponent } from './components/login-funcionario/login-funcionario.component';
import { FuncionarioCadastroComponent } from './components/funcionario-sistema/funcionario-cadastro/funcionario-cadastro.component';
import { FilmeListComponent } from './components/filme-sistema/filme-list/filme-list.component';
import { FilmeCadastroComponent } from './components/filme-sistema/filme-cadastro/filme-cadastro.component';
import { HorarioCadastroComponent } from './components/horario-sistema/horario-cadastro/horario-cadastro.component';
import { HorarioListComponent } from './components/horario-sistema/horario-list/horario-list.component';
import { FuncionarioListComponent } from './components/funcionario-sistema/funcionario-list/funcionario-list.component';

const routes: Routes = [
  {path: "sistema/home", component: HomeSistemaComponent},
  {path: "sistema/login", component: LoginFuncionarioComponent},
  {path: "sistema/funcionario/cadastro",component: FuncionarioCadastroComponent},
  {path: "sistema/filme", component: FilmeListComponent},
  {path: "sistema/filme/cadastro", component: FilmeCadastroComponent},
  {path: "sistema/horario/cadastro", component: HorarioCadastroComponent},
  {path: "sistema/horario", component: HorarioListComponent},
  {path: "sistema/filme/editar/:id", component: FilmeCadastroComponent},
  {path: "sistema/funcionario",component: FuncionarioListComponent},
  {path: "sistema/funcionario/editar/:id",component: FuncionarioCadastroComponent},
  {path: "", redirectTo: "sistema/login", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

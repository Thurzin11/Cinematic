import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeSistemaComponent } from './components/home-sistema/home-sistema.component';
import { LoginFuncionarioComponent } from './components/login-funcionario/login-funcionario.component';
import { FuncionarioCadastroComponent } from './components/funcionario-sistema/funcionario-cadastro/funcionario-cadastro.component';
import { FilmeListComponent } from './components/filme-sistema/filme-list/filme-list.component';
import { FilmeCadastroComponent } from './components/filme-sistema/filme-cadastro/filme-cadastro.component';
import { FuncionarioListComponent } from './components/funcionario-sistema/funcionario-list/funcionario-list.component';
import { SalaListComponent } from './components/sala-sistema/sala-list/sala-list.component';
import { SalaFormComponent } from './components/sala-sistema/sala-form/sala-form.component';
import { SessaoListComponent } from './components/sessao-sistema/sessao-list/sessao-list.component';
import { SessaoFormComponent } from './components/sessao-sistema/sessao-form/sessao-form.component';

const routes: Routes = [
  {path: "sistema/home", component: HomeSistemaComponent},
  {path: "sistema/login", component: LoginFuncionarioComponent},
  {path: "sistema/funcionario/cadastro",component: FuncionarioCadastroComponent},
  {path: "sistema/filme", component: FilmeListComponent},
  {path: "sistema/filme/cadastro", component: FilmeCadastroComponent},
  {path: "sistema/filme/editar/:id", component: FilmeCadastroComponent},
  {path: "sistema/funcionario",component: FuncionarioListComponent},
  {path: "sistema/funcionario/editar/:id",component: FuncionarioCadastroComponent},
  {path: "sistema/sala", component: SalaListComponent},
  {path: "sistema/sala/cadastro", component: SalaFormComponent},
  {path: "sistema/sala/editar/:id", component: SalaFormComponent},
  {path: "sistema/sessao", component: SessaoListComponent},
  {path: "sistema/sessao/cadastro", component: SessaoFormComponent},
  {path: "", redirectTo: "sistema/login", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

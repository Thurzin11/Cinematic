import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeSistemaComponent } from './components/home-sistema/home-sistema.component';

const routes: Routes = [
  {path: "sistema/home", component: HomeSistemaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

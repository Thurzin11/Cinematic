
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuSistemaComponent } from './components/menu-sistema/menu-sistema.component';
import { HomeSistemaComponent } from './components/home-sistema/home-sistema.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuSistemaComponent,
    HomeSistemaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

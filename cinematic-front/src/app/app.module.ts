
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuSistemaComponent } from './components/menu-sistema/menu-sistema.component';
<<<<<<< HEAD
import { HomeSistemaComponent } from './components/home-sistema/home-sistema.component';
=======
import { HeaderSistemaComponent } from './components/header-sistema/header-sistema.component';
>>>>>>> 5a279aa85402ad46b6d45ec64425e4ea10ef5ca1

@NgModule({
  declarations: [
    AppComponent,
    MenuSistemaComponent,
<<<<<<< HEAD
    HomeSistemaComponent
=======
    HeaderSistemaComponent
>>>>>>> 5a279aa85402ad46b6d45ec64425e4ea10ef5ca1
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

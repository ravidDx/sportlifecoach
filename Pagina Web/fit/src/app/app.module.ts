import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// rutas
import { APP_ROUTING } from './app-routing.module';
// servicios
// componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { CarrouselComponent } from './componentes/carrousel/carrousel.component';
import { AboutComponent } from './componentes/about/about.component';
import { ServiciosComponent } from './componentes/servicios/servicios.component';
import { CompromisoComponent } from './componentes/compromiso/compromiso.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarrouselComponent,
    AboutComponent,
    ServiciosComponent,
    CompromisoComponent,
    ContactoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

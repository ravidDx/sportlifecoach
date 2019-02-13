import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {FlxUiDatatableModule,FlxUiDataTable} from 'flx-ui-datatable';

//firebase
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';


// rutas
import { APP_ROUTING } from './app.routes';
// servicios
// componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { CarrouselComponent } from './componentes/carrousel/carrousel.component';
import { AboutComponent } from './componentes/about/about.component';
import { ServiciosComponent } from './componentes/servicios/servicios.component';
import { CompromisoComponent } from './componentes/compromiso/compromiso.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { Page404Component } from './componentes/page/page404/page404.component';
import { ProfileComponent } from './componentes/admin/profile/profile.component';
import { NavbarTopComponent } from './componentes/admin/navbar-top/navbar-top.component';
import { NavbarLeftComponent } from './componentes/admin/navbar-left/navbar-left.component';
import { AthletesComponent } from './componentes/admin/athletes/athletes.component';
import { ExercisesComponent } from './componentes/admin/exercises/exercises.component';
import { FeedingComponent } from './componentes/admin/feeding/feeding.component';
import { SidebarComponent } from './componentes/admin/sidebar/sidebar.component';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarrouselComponent,
    AboutComponent,
    ServiciosComponent,
    CompromisoComponent,
    ContactoComponent,
    LoginComponent,
    HomeComponent,
    Page404Component,
    ProfileComponent,
    NavbarTopComponent,
    NavbarLeftComponent,
    AthletesComponent,
    ExercisesComponent,
    FeedingComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlxUiDatatableModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    APP_ROUTING
  ],
  providers: [AngularFireAuth, FlxUiDataTable],
  bootstrap: [AppComponent]
})
export class AppModule { }

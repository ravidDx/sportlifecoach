import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA  } from '@angular/core';
import { FormsModule }                from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

//Restfull
import {HttpClientModule} from '@angular/common/http';

//firebase
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';


//Services
import {AuthService} from './services/auth.service';
import {DeportistaService} from './services/deportista.service';



/*Rutas*/
import {AppRoutingModule} from './app-routing.module';



/*Componenetes*/
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SocialComponent } from './shared/social/social.component';
import { ContentComponent } from './pages/content/content.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ResetpasswordComponent } from './auth/resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './admin/home/home.component';
import { DeportistasComponent } from './admin/deportistas/deportistas.component';
import { EjerciciosComponent } from './admin/ejercicios/ejercicios.component';
import { PromocionesComponent } from './admin/promociones/promociones.component';
import { DietaComponent } from './admin/dieta/dieta.component';
import { SingleComponent } from './pages/single/single.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SocialComponent,
    ContentComponent,
    SigninComponent,
    SignupComponent,
    ResetpasswordComponent,
    ForgotpasswordComponent,
    DashboardComponent,
    HomeComponent,
    DeportistasComponent,
    EjerciciosComponent,
    PromocionesComponent,
    DietaComponent,
    SingleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,NgbPaginationModule, NgbAlertModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    HttpClientModule,
    /*AngularFullpageModule*/
  ],
  providers: [AngularFireAuth, AuthService, DeportistaService],
  bootstrap: [AppComponent]
})
export class AppModule { }

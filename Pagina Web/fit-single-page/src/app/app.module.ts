import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


/*Rutas*/
import {AppRoutingModule} from './app-routing.module';
//import { AngularFullpageModule } from '@fullpage/angular-fullpage';


/*Componenetes*/

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SocialComponent } from './shared/social/social.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';
import { ContactComponent } from './pages/contact/contact.component';
import { WorkComponent } from './pages/work/work.component';
import { ContentComponent } from './pages/content/content.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SocialComponent,
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    TestimonialsComponent,
    ContactComponent,
    WorkComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,/*
    AngularFullpageModule*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

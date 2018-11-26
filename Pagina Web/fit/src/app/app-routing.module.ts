// import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './componentes/about/about.component';

const routes: Routes = [
    {path: 'home', component: AboutComponent},
];


export const APP_ROUTING = RouterModule.forRoot(routes);

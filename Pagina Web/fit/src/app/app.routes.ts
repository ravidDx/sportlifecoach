import { Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './componentes/login/login.component';
import {HomeComponent} from './componentes/home/home.component';
import {ProfileComponent} from './componentes/admin/profile/profile.component';
import {Page404Component} from './componentes/page/page404/page404.component';

import {AuthGuard} from './guards/auth.guard';


const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},  //online Admin
    {path: 'page404', component: Page404Component},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}// si escribo mal o pongo una direccion inexistente redirecciona a home
];


export const APP_ROUTING = RouterModule.forRoot(routes);

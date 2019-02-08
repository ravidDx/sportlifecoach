import { Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './componentes/login/login.component';
import {HomeComponent} from './componentes/home/home.component';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}// si escribo mal o pongo una direccion inexistente redirecciona a home
];


export const APP_ROUTING = RouterModule.forRoot(routes);

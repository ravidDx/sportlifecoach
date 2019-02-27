import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//one page component
import { ContentComponent } from './pages/content/content.component';
import { SingleComponent } from './pages/single/single.component';

// sign component
import { SigninComponent }            from './auth/signin/signin.component';
import { SignupComponent }            from './auth/signup/signup.component';
import { ForgotpasswordComponent }    from './auth/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent }     from './auth/resetpassword/resetpassword.component';

// dashboard component
import { DashboardComponent }         from './admin/dashboard/dashboard.component';
import { HomeComponent }              from './admin/home/home.component';
import { DeportistasComponent }       from './admin/deportistas/deportistas.component';
import { EjerciciosComponent }        from './admin/ejercicios/ejercicios.component';
import { DietaComponent }       	  from './admin/dieta/dieta.component';
import { PromocionesComponent }       from './admin/promociones/promociones.component';


const app_routes:Routes = [
	{path:"", 						component:SingleComponent,},
	{path: 'signin',           		component: SigninComponent},
	{ path: 'dashboard',        	component: DashboardComponent, children: [
        { path: 'home',       		component: HomeComponent},
        { path: 'deportistas',      component: DeportistasComponent},
        { path: 'ejercicios',      component: EjerciciosComponent},
        { path: 'dieta',      		component: DietaComponent},
        { path: 'promociones',      component: PromocionesComponent},
        { path: '**',           redirectTo: 'home'},
    ]},
	{path:"**", pathMatch:"full", redirectTo:""},

];





@NgModule({

	imports:[
		RouterModule.forRoot(app_routes)
	],
	exports:[
		RouterModule			
	]

})


export class AppRoutingModule {

}
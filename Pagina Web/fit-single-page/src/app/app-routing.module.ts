import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
/*
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';
import { ContactComponent } from './pages/contact/contact.component';
import { WorkComponent } from './pages/work/work.component';
*/

import { ContentComponent } from './pages/content/content.component';


const app_routes:Routes = [

	{path:"", component:ContentComponent},
	/*
	{path:"about", component:AboutComponent},
	{path:"services", component:ServicesComponent},
	{path:"work", component:WorkComponent},
	{path:"testimonials", component:TestimonialsComponent},
	{path:"contact", component:ContactComponent},*/
	{path:"**", pathMatch:"full", redirectTo:""}

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
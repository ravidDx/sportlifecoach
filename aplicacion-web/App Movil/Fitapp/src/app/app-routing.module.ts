import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './componentes/tabs/tabs.module#TabsPageModule' },
  { path: 'slide', loadChildren: './componentes/slide/slide.module#SlidePageModule'},
  { path: 'login', loadChildren: './componentes/login/login.module#LoginPageModule' },
  { path: 'news', loadChildren: './componentes/news/news.module#NewsPageModule' },
  { path: 'perfil', loadChildren: './componentes/perfil/perfil.module#PerfilPageModule' },
  { path: 'dietas/dieta', loadChildren: './componentes/dieta/dieta.module#DietaPageModule' },
  { path: 'calculadora', loadChildren: './componentes/calculadora/calculadora.module#CalculadoraPageModule' },
  { path: 'ejertipos', loadChildren: './componentes/ejertipos/ejertipos.module#EjertiposPageModule' },
  { path: 'registro/personal', loadChildren: './componentes/registro/personal/personal.module#PersonalPageModule' },
  { path: 'registro/gender', loadChildren: './componentes/registro/gender/gender.module#GenderPageModule' },
  { path: 'registro/datos', loadChildren: './componentes/registro/datos/datos.module#DatosPageModule' },



  /*{ path: 'dietas', loadChildren: './dietas/dietas.module#DietasPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'ejercicios', loadChildren: './ejercicios/ejercicios.module#EjerciciosPageModule' },
  { path: 'estadisticas', loadChildren: './estadisticas/estadisticas.module#EstadisticasPageModule' }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

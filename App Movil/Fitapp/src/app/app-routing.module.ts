import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'slide', loadChildren: './slide/slide.module#SlidePageModule'},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'news', loadChildren: './news/news.module#NewsPageModule' },
  { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilPageModule' },
  { path: 'dietas/dieta', loadChildren: './dieta/dieta.module#DietaPageModule' },
  { path: 'calculadora', loadChildren: './calculadora/calculadora.module#CalculadoraPageModule' },
  { path: 'ejertipos', loadChildren: './ejertipos/ejertipos.module#EjertiposPageModule' },
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

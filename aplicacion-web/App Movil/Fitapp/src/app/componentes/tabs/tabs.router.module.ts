import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TabsPage} from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'dietas',
        children: [
          {
            path: '',
            loadChildren: '../../componentes/dietas/dietas.module#DietasPageModule'
          }
        ]
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../../componentes/home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'ejercicios',
        children: [
          {
            path: '',
            loadChildren: '../../componentes/ejercicios/ejercicios.module#EjerciciosPageModule'
          }
        ]
      },
      {
        path: 'estadisticas',
        children: [
          {
            path: '',
            loadChildren: '../../componentes/estadisticas/estadisticas.module#EstadisticasPageModule'
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

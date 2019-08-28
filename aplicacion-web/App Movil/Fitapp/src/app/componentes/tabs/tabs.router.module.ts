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
            loadChildren: () => import('../../componentes/dietas/dietas.module').then(m => m.DietasPageModule)
          }
        ]
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../../componentes/home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'ejercicios',
        children: [
          {
            path: '',
            loadChildren: () => import('../../componentes/ejercicios/ejercicios.module').then(m => m.EjerciciosPageModule)
          }
        ]
      },
      {
        path: 'estadisticas',
        children: [
          {
            path: '',
            loadChildren: () => import('../../componentes/estadisticas/estadisticas.module').then(m => m.EstadisticasPageModule)
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

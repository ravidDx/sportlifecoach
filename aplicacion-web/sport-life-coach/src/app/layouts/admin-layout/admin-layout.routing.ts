import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

/*COMPONENTES ROL ADMIN*/
import { DeportistasComponent } from '../../admin/deportistas/deportistas.component';
import { DeportistaComponent } from '../..//admin/deportista/deportista.component';
import { EjerciciosComponent } from '../..//admin/ejercicios/ejercicios.component';
import { EjercicioComponent } from '../..//admin/ejercicio/ejercicio.component';
import { DietaComponent } from '../..//admin/dieta/dieta.component';
import { DietasComponent } from '../..//admin/dietas/dietas.component';
import { PromocionesComponent } from 'app/admin/promociones/promociones.component';
import { PromocionComponent } from 'app/admin/promocion/promocion.component';

/*COMPONENTES ROL SUPER ADMIN*/
import { SlidersComponent } from '../../super/sliders/sliders.component';
import { AboutComponent } from '../../super/about/about.component';
import { ServicesComponent } from '../../super/services/services.component';
import { PortafolioComponent } from '../../super/portafolio/portafolio.component';
import { PostsComponent } from '../../super/posts/posts.component';

import {RoleGuard} from '../../guards/role-guard.guard';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',                component: DashboardComponent, canActivate:[RoleGuard],data:{role:'admin'} },
    { path: 'deportista-list',          component: DeportistasComponent, canActivate:[RoleGuard],data:{role:'admin'} },
    { path: 'deportista-profile/:_id',  component: DeportistaComponent, canActivate:[RoleGuard],data:{role:'admin'} },
    { path: 'ejercicios',               component: EjerciciosComponent, canActivate:[RoleGuard],data:{role:'admin'} },
    { path: 'ejercicio/:_id',           component: EjercicioComponent, canActivate:[RoleGuard],data:{role:'admin'} },
    { path: 'dietas',                   component: DietasComponent, canActivate:[RoleGuard],data:{role:'admin'} },
    { path: 'dieta/:_id',               component: DietaComponent, canActivate:[RoleGuard],data:{role:'admin'} },
    { path: 'promociones',              component: PromocionesComponent, canActivate:[RoleGuard],data:{role:'admin'} },
    { path: 'promocion/:_id',           component: PromocionComponent, canActivate:[RoleGuard],data:{role:'admin'} },
    { path: 'user-profile',             component: UserProfileComponent, canActivate:[RoleGuard],data:{role:'admin'} },
    { path: 'table-list',               component: TableListComponent, canActivate:[RoleGuard],data:{role:'admin'} },
    { path: 'typography',               component: TypographyComponent, canActivate:[RoleGuard],data:{role:'admin'} },
    { path: 'icons',                    component: IconsComponent, canActivate:[RoleGuard],data:{role:'admin'} },
    { path: 'maps',                     component: MapsComponent, canActivate:[RoleGuard],data:{role:'admin'} },
    { path: 'notifications',            component: NotificationsComponent, canActivate:[RoleGuard],data:{role:'admin'} },
    { path: 'upgrade',                  component: UpgradeComponent, canActivate:[RoleGuard],data:{role:'admin'} },
    { path: 'inicio',                   component: SlidersComponent, canActivate:[RoleGuard],data:{role:'super'} },
    { path: 'about',                    component: AboutComponent, canActivate:[RoleGuard],data:{role:'super'} },
    { path: 'services',                 component: ServicesComponent, canActivate:[RoleGuard],data:{role:'super'} },
    { path: 'portafolio',               component: PortafolioComponent, canActivate:[RoleGuard],data:{role:'super'} },
    { path: 'posts',                    component: PostsComponent, canActivate:[RoleGuard],data:{role:'super'} },
    { path: '**',           redirectTo: 'dashboard'}, 
];

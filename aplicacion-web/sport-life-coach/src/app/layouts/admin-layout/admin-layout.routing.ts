import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import { DeportistasComponent } from '../../admin/deportistas/deportistas.component';
import { DeportistaComponent } from '../..//admin/deportista/deportista.component';
import { EjerciciosComponent } from '../..//admin/ejercicios/ejercicios.component';
import { EjercicioComponent } from '../..//admin/ejercicio/ejercicio.component';
import { DietaComponent } from '../..//admin/dieta/dieta.component';
import { DietasComponent } from '../..//admin/dietas/dietas.component';
import { PromocionesComponent } from 'app/admin/promociones/promociones.component';
import { PromocionComponent } from 'app/admin/promocion/promocion.component';



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
    { path: 'dashboard',                component: DashboardComponent },
    { path: 'deportista-list',          component: DeportistasComponent },
    { path: 'deportista-profile/:_id',  component: DeportistaComponent },
    { path: 'ejercicios',               component: EjerciciosComponent },
    { path: 'ejercicio/:_id',           component: EjercicioComponent },
    { path: 'dietas',                   component: DietasComponent },
    { path: 'dieta/:_id',               component: DietaComponent },
    { path: 'promociones',              component: PromocionesComponent },
    { path: 'promocion/:_id',           component: PromocionComponent },
    { path: 'user-profile',             component: UserProfileComponent },
    { path: 'table-list',               component: TableListComponent },
    { path: 'typography',               component: TypographyComponent },
    { path: 'icons',                    component: IconsComponent },
    { path: 'maps',                     component: MapsComponent },
    { path: 'notifications',            component: NotificationsComponent },
    { path: 'upgrade',                  component: UpgradeComponent },
    { path: '**',           redirectTo: 'dashboard'},
];

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
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
import { EjerciciosComponent } from '../../admin/ejercicios/ejercicios.component';
import { EjercicioComponent } from '../..//admin/ejercicio/ejercicio.component';
import { DietaComponent } from '../..//admin/dieta/dieta.component';
import { DietasComponent } from '../..//admin/dietas/dietas.component';


import { HttpClientModule } from '@angular/common/http';


import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule ,
  MatIconModule,
  MatProgressBarModule,
  MatChipsModule
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    HttpClientModule
  ],
  declarations: [
    DashboardComponent,
    DeportistasComponent,
    DeportistaComponent,
    EjerciciosComponent,
    EjercicioComponent,
    DietaComponent,
    DietasComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
  ]
})

export class AdminLayoutModule {}

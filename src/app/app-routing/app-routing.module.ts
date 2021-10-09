import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from '../chart/chart.component';
import { HomeComponent } from '../home/home.component';
import { IncidentFormComponent } from '../incident-form/incident-form.component';
import { IncidentsListComponent } from '../incidents-list/incidents-list.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'addincident', component: IncidentFormComponent },
  { path: 'incidents', component: IncidentsListComponent }
  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealTimeModule } from '../real-time/real-time.module';
import { StatisticsModule } from '../statistics/statistics.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FamilySelectorModule } from '../family-selector/family-selector.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RealTimeModule,
    StatisticsModule,
    FamilySelectorModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }

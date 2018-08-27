import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CardModule } from 'primeng/card';

import { RealTimeComponent } from './real-time.component';
import { reducers, effects } from './state';
import { AlertsComponent } from './alerts/alerts.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('realTime', reducers),
    EffectsModule.forFeature(effects),
    CardModule
  ],
  declarations: [RealTimeComponent, AlertsComponent],
  exports: [RealTimeComponent]
})
export class RealTimeModule { }

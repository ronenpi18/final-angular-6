import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../../environments/environment'; // Angular CLI environemnt
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SharedModule } from '../shared/shared.module';
import { GlobalsProvider } from './providers/globals.provider';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forRoot({}, {}), // metaReducers
    EffectsModule.forRoot([]),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    })
  ],
  declarations: [
    NavBarComponent
  ],
  exports: [
    NavBarComponent
  ],
  providers: [
    GlobalsProvider
  ]
})
export class CoreModule { }

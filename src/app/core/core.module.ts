import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SharedModule } from '../shared/shared.module';
import { StateModule } from '../state/state.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    StateModule
  ],
  declarations: [
    NavBarComponent
  ],
  exports: [
    NavBarComponent
  ],
  providers: []
})
export class CoreModule { }

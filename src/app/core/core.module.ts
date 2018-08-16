import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SharedModule } from '../shared/shared.module';
import { GlobalsProvider } from './providers/globals.provider';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
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

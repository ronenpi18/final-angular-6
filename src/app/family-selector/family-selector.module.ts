import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { InputTextModule } from 'primeng/inputtext';

import { FamilySelectorComponent } from './family-selector.component';
import { effects, reducers } from './state';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    InputTextModule,
    StoreModule.forFeature('families', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [FamilySelectorComponent],
  exports: [FamilySelectorComponent]
})
export class FamilySelectorModule { }

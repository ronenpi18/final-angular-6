import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamilySelectorComponent } from './family-selector.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FamilySelectorComponent],
  exports: [FamilySelectorComponent]
})
export class FamilySelectorModule { }

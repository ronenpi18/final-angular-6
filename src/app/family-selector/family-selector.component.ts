import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from './state';
import { Observable } from 'rxjs';
import { IFamilyInstance } from './models/family.model';

@Component({
  selector: 'app-family-selector',
  templateUrl: './family-selector.component.html',
  styleUrls: ['./family-selector.component.scss']
})
export class FamilySelectorComponent implements OnInit {

  families$: Observable<IFamilyInstance[]>;

  constructor(private store: Store<fromStore.FamiliesState>) {

  }

  ngOnInit() {    
    this.families$ = this.store.select(fromStore.getAllFamilies);

    this.store.dispatch(new fromStore.LoadFamilies());
  }

}

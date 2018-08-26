import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromFamiliesState from '../family-selector/state';
import { IProcessInstance } from '../family-selector/models/family.model';

@Component({
  selector: 'app-real-time',
  templateUrl: './real-time.component.html',
  styleUrls: ['./real-time.component.scss']
})
export class RealTimeComponent implements OnInit {
  process$: Observable<IProcessInstance>;

  constructor(private store: Store<fromFamiliesState.FamiliesState>) { }

  ngOnInit() {
    this.process$ = this.store.select(fromFamiliesState.getSelectedProcess);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { ITrace } from '../models/trace.model';

@Component({
  selector: 'app-real-time-traces',
  templateUrl: './traces.component.html',
  styleUrls: ['./traces.component.scss']
})
export class TracesComponent implements OnInit {

  @Input() traces$: Observable<ITrace[]>;

  constructor() { }

  ngOnInit() {
    this.traces$.subscribe(console.log);
  }

}

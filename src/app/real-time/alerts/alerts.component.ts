import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { IAlertInstance } from '../models/alert.model';

@Component({
  selector: 'app-real-time-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  @Input() alerts$: Observable<IAlertInstance[]>;

  constructor() { }

  ngOnInit() {
  }

}

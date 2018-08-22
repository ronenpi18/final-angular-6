import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { IStatisticsInstance } from '../../models/data.model';
import { StatisticDynamicInput } from '../component.model';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.scss']
})
export class EventsTableComponent extends StatisticDynamicInput {

  static type = 'data';
  static title = 'מופעים';
  static icon = 'speedometer';
  static closable = true;
  static changeable = false;

  constructor() {
    super();
  }

}
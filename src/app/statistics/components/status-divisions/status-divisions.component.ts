import { Component } from '@angular/core';

import { StatisticDynamicInput } from '../component.model';

@Component({
  selector: 'app-status-divisions',
  templateUrl: './status-divisions.component.html',
  styleUrls: ['./status-divisions.component.scss']
})
export class StatusDivisionsComponent extends StatisticDynamicInput {

  static type = 'graph';
  static typeIcon = 'graph-area';
  static title = 'התפלגות משכים';
  static icon = 'speedometer';
  static closable = false;
  static changeable = true;

  constructor() {
    super();
  }
}

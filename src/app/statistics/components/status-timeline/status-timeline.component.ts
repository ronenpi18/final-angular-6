import { Component } from '@angular/core';
import { StatisticDynamicInput } from '../component.model';

@Component({
  selector: 'app-status-timeline',
  templateUrl: './status-timeline.component.html',
  styleUrls: ['./status-timeline.component.scss']
})
export class StatusTimelineComponent extends StatisticDynamicInput {

  static type = 'graph';
  static typeIcon = 'stats';
  static title = 'סטטוס';
  static icon = 'line-graph';
  static closable = false;
  static changeable = true;

  constructor() {
    super();
  }

}

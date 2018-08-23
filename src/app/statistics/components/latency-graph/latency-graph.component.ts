import { Component, Input } from '@angular/core';

import { StatisticDynamicInput } from '../component.model';

@Component({
  selector: 'app-latency-graph',
  templateUrl: './latency-graph.component.html',
  styleUrls: ['./latency-graph.component.scss']
})
export class LatencyGraphComponent extends StatisticDynamicInput {

  static type = 'graph';
  static typeIcon = 'graph-area';
  static title = 'פיזור מופעים';
  static icon = 'speedometer';
  static closable = false;
  static changeable = true;

  constructor() {
    super();
  }
}

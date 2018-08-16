import { Component } from '@angular/core';

@Component({
  selector: 'app-latency-graph',
  templateUrl: './latency-graph.component.html',
  styleUrls: ['./latency-graph.component.scss']
})
export class LatencyGraphComponent {

  static type = 'graph';
  static typeIcon = 'graph-area';
  static title = 'פיזור מופעים';
  static icon = 'speedometer';
  static closable = false;
  static changeable = true;

  constructor() { }
}

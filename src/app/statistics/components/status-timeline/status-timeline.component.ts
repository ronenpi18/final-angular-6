import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-timeline',
  templateUrl: './status-timeline.component.html',
  styleUrls: ['./status-timeline.component.scss']
})
export class StatusTimelineComponent implements OnInit {

  static type = 'graph';
  static typeIcon = 'stats';
  static title = 'סטטוס';
  static icon = 'line-graph';
  static closable = false;
  static changeable = true;

  constructor() { }

  ngOnInit() {
  }

}

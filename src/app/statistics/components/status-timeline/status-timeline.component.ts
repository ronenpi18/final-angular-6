import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-timeline',
  templateUrl: './status-timeline.component.html',
  styleUrls: ['./status-timeline.component.scss']
})
export class StatusTimelineComponent implements OnInit {

  static type = 'test';
  static title = 'סטטוס';
  static icon = 'line-graph';

  constructor() { }

  ngOnInit() {
  }

}

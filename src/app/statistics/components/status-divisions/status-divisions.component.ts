import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-divisions',
  templateUrl: './status-divisions.component.html',
  styleUrls: ['./status-divisions.component.scss']
})
export class StatusDivisionsComponent implements OnInit {

  static type = 'graph';
  static typeIcon = 'graph-area';
  static title = 'התפלגות משכים';
  static icon = 'speedometer';
  static closable = false;
  static changeable = true;

  constructor() { }

  ngOnInit() {
  }

}
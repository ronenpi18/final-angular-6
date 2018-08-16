import { Component } from '@angular/core';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.scss']
})
export class EventsTableComponent {

  static type = 'data';
  static title = 'מופעים';
  static icon = 'speedometer';
  static closable = true;
  static changeable = false;

  constructor() { }

}
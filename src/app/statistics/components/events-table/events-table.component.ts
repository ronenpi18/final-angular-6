import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.scss']
})
export class EventsTableComponent {

  static type = 'test';
  static title = 'מופעים';
  static icon = 'speedometer';

  constructor() { }

}
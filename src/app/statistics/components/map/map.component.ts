import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  static type = 'data';
  static title = 'מפה';
  static icon = 'map';
  static closable = true;
  static changeable = false;

  constructor() { }

}

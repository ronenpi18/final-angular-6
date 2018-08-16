import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  static type = 'map';
  static title = 'מפה';
  static icon = 'map';

  constructor() { }

}

import { Component, Input } from '@angular/core';
import { StatisticDynamicInput } from '../component.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent extends StatisticDynamicInput {

  static type = 'data';
  static title = 'מפה';
  static icon = 'map';
  static closable = true;
  static changeable = false;

  constructor() {
    super();
  }

}

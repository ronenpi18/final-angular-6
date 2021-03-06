import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GridStatistic } from '../grid-statistic.model';
import { EventsTableComponent } from '../components/events-table/events-table.component';
import { LatencyGraphComponent } from '../components/latency-graph/latency-graph.component';
import { StatisticsBaseComponent } from '../components/component.model';
import { MapComponent } from '../components/map/map.component';
import { StatusTimelineComponent } from '../components/status-timeline/status-timeline.component';
import { StatusDivisionsComponent } from '../components/status-divisions/status-divisions.component';

const allComponents: StatisticsBaseComponent[] = [
  StatusTimelineComponent,
  StatusDivisionsComponent,
  LatencyGraphComponent,
  MapComponent,
  EventsTableComponent
];

interface IListItem {
  component: StatisticsBaseComponent;
  label: string;
  icon: string;
  command: (event: any) => void
};

@Component({
  selector: 'app-statistic-container',
  templateUrl: './statistic-container.component.html',
  styleUrls: ['./statistic-container.component.scss']
})
export class StatisticContainerComponent implements OnInit {

  availableComponents$: Observable<IListItem[]>;

  @Input() statistic: GridStatistic;

  constructor() {}

  ngOnInit() {
    this.availableComponents$ = this.statistic.component$.pipe(
      map(component => allComponents.filter(compFromList => compFromList.type === component.type)),
      map(availableComponents => availableComponents.map(availableComponent => ({
        component: availableComponent,
        label: availableComponent.title,
        icon: `icon icon-${availableComponent.icon}`,
        command: (event) => {
          this.statistic.changeComponent(event.item.component);
        }
      })))
    );
  }
}

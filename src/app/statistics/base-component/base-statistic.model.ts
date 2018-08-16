import { Observable, BehaviorSubject } from 'rxjs';

import StatisticsBaseComponent from '../components/component.model';

export default class Statistic {

  public component$: BehaviorSubject<StatisticsBaseComponent>;

  constructor(
    component: StatisticsBaseComponent,
    public cols: number,
    public rows: number
  ) {
    this.component$ = new BehaviorSubject(component);
  }

  changeComponent(component: StatisticsBaseComponent): void {
    this.component$.next(component);
  }

  onComponentChange(): Observable<StatisticsBaseComponent> {
    return this.component$.asObservable();
  }

}

import { Component, OnInit } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { GlobalsProvider } from '../providers/globals.provider';
import { fillWithZeros } from '../../utils/moment.util';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  minute$: Observable<void>;
  timeClock$: Observable<string>;
  dateClock$: Observable<string>;

  constructor(private globals: GlobalsProvider) {}

  ngOnInit() {
    this.startClock();
  }
  
  // create stream minute$ that will emit event every minute
  private startClock(): void {
    const second = 1000;
    const timeUntilMinute = (60 - new Date().getSeconds()) * second;
    
    this.minute$ = timer(timeUntilMinute, second * 60).pipe(
      startWith(null)
    );

    this.startTimeClock();
    this.startDayClock();
  }

  // extend minute$ and return time, for example: 12:40
  private startTimeClock(): void {
    this.timeClock$ = this.minute$.pipe(
      map(() => {
        const date = new Date();
        return `${fillWithZeros(date.getHours(), 2)}:${fillWithZeros(date.getMinutes(), 2)}`;
      })
    );
  }

  // extend minute$ and return date, for example: יון שני, 22.01.18
  private startDayClock(): void {
    this.dateClock$ = this.minute$.pipe(
      map(() => {
        debugger;
        const date = new Date();
        const hebrewDay = this.globals.hebrewDays[date.getDay()];
        const month = fillWithZeros(date.getMonth() + 1, 2);
        const year = date.getFullYear().toString().slice(2);
        return `${hebrewDay}, ${date.getDate()}.${month}.${year}`;
      })
    );
  }

}

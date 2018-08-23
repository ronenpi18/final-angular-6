import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map, withLatestFrom, take } from 'rxjs/operators';

import { IRangeInstance } from '../models/range.model';

const MINUTE = 1000 * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const mockRanges = [{
  from: new Date(Date.now() - DAY * 4 - HOUR * 5 - MINUTE * 20),
  to: new Date(Date.now() - DAY * 3 - HOUR * 5)
}, {
  from: new Date(Date.now() - DAY * 8 - HOUR * 8 - MINUTE * 45),
  to: new Date(Date.now() - DAY * 5 - HOUR * 8)
}, {
  from: new Date(Date.now() - DAY * 20),
  to: new Date(Date.now() - DAY * 10)
}];

@Component({
  selector: 'app-statistics-range-selector',
  templateUrl: './range-selector.component.html',
  styleUrls: ['./range-selector.component.scss']
})
export class RangeSelectorComponent {

  @Input() ranges$: Observable<IRangeInstance[]>;
  @Input() activeRange$: Observable<IRangeInstance>;
  
  @Output() rangeAdd = new EventEmitter<IRangeInstance>();
  @Output() rangeRemove = new EventEmitter<IRangeInstance>();
  @Output() rangeSelect = new EventEmitter<IRangeInstance>();

  constructor() {}

  selectRange(range: IRangeInstance): void {
    this.rangeSelect.emit(range);
  }

  selectActiveTab(): void {
    this.ranges$
      .pipe(take(1))
      .subscribe(ranges => this.selectRange(ranges[0]));
  }

  addTab(): void {
    // const mockRange = mockRanges[this.ranges.length - 1] || mockRanges[mockRanges.length - 1];
    const mockRange = mockRanges[1];
    const mockCopy: IRangeInstance = { from: mockRange.from, to: mockRange.to };
    this.addRange(mockCopy);
  }

  addRange(range: IRangeInstance): void {
    this.rangeAdd.emit(range);
  }

  removeTab(range: IRangeInstance): void {
    this.rangeRemove.emit(range);
  }

  isRangeActive(range: IRangeInstance): Observable<boolean> {
    return this.activeRange$.pipe(
      map(activeRange => activeRange === range)
    );
  }

  isLiveRangeActive(): Observable<boolean> {
    const liveRange$ = this.ranges$.pipe(
      map(ranges => ranges[0])
    );
    // combine active range stream with live range stream and check they are the same
    return this.activeRange$.pipe(
      withLatestFrom(liveRange$),
      map(([activeRange, liveRange]) => activeRange === liveRange)
    );
  }

  getMonitorLabel(): Observable<string> {
    return this.isLiveRangeActive().pipe(
      map(isLiveActive => isLiveActive ? 'ניטור' : 'היום')
    );
  }

  getRangeLabel(range: IRangeInstance): string {
    if (!range.to) return 'עכשיו';
    return `${this.getDayLabel(range.from)} - ${this.getDayLabel(range.to)}`
  }
  
  getDayLabel(date: Date): string {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }

}

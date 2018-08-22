import { Component, Renderer2, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';

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

  selectTab(range: IRangeInstance) {
    this.rangeSelect.emit(range);
  }

  addTab() {
    // const mockRange = mockRanges[this.ranges.length - 1] || mockRanges[mockRanges.length - 1];
    const mockRange = mockRanges[1];
    const mockCopy: IRangeInstance = { from: mockRange.from, to: mockRange.to };
    this.rangeAdd.emit(mockCopy);
  }

  removeTab(range: IRangeInstance) {
    this.rangeRemove.emit(range);
  }

  getRangeLabel(range: IRangeInstance) {
    if (!range.to) return 'עכשיו';
    return `${this.getDayLabel(range.from)} - ${this.getDayLabel(range.to)}`
  }
  
  getDayLabel(date: Date) {
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
  }

}

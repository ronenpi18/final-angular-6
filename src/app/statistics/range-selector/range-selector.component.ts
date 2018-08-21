import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { TabView } from 'primeng/tabview';

export interface IRange {
  from: Date,
  to?: Date
}

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

  ranges: IRange[] = [{
    from: new Date(Date.now() - MINUTE * 10)
  }];
  selectedTabIndex = 0;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  selectTab(index: number) {
    this.selectedTabIndex = index;
  }

  addTab() {
    const mockRange = mockRanges[this.ranges.length - 1] || mockRanges[mockRanges.length - 1];
    const mockCopy = { from: mockRange.from, to: mockRange.to };
    // when pushing a new tab, it get's selected by default
    this.ranges = [...this.ranges, mockCopy];

    // select added tab
    this.selectedTabIndex = this.ranges.length - 1;
  }

  removeTab(index: number) {
    this.ranges = this.ranges.slice(0, index).concat(this.ranges.slice(index + 1));

    if (index > this.selectedTabIndex) {
      return;
    } else if (index !== this.selectedTabIndex) {
      this.selectedTabIndex -= 1;
    } else {
      // select previous tab
      this.selectedTabIndex = index - 1;
    }
  }

  getRangeLabel(range: IRange) {
    if (!range.to) return 'עכשיו';
    return `${this.getDayLabel(range.from)} - ${this.getDayLabel(range.to)}`
  }
  
  getDayLabel(date: Date) {
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
  }

}

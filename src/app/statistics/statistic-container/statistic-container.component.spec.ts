import { Component, DebugElement, Host } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';

import { StatisticContainerComponent } from './statistic-container.component';
import { GridStatistic } from '../grid-statistic.model';

class StatisticBase {
  static type = '';
  static title = '';
  static icon = '';
  static closable = false;
  static changeable = false;
}

describe('StatisticContainerComponent', () => {
  let component: StatisticContainerComponent;
  let fixture: ComponentFixture<StatisticContainerComponent>;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticContainerComponent],
      imports: [
        MenuModule,
        CardModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticContainerComponent);
    element = fixture.debugElement;
    component = fixture.componentInstance;
  });

  it('should show statistic title', () => {
    const host = { ...StatisticBase, title: 'Dinosaurs over time' };
    component.statistic = new GridStatistic(host, 1, 1);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(element.query(By.css('.title')).nativeElement.textContent).toEqual('Dinosaurs over time');
    });
  });

  it('should show statistic icon', () => {
    const host = { ...StatisticBase, icon: 'home' };
    component.statistic = new GridStatistic(host, 1, 1);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(element.query(By.css('.title-icon.icon.icon-home'))).toBeTruthy();
    });
  });

  it('should show closable button and hide changeable option on input', () => {
    const host = { ...StatisticBase, closable: true, changeable: false };
    component.statistic = new GridStatistic(host, 1, 1);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(element.query(By.css('.close-btn'))).toBeTruthy();
      expect(element.query(By.css('.graph-change-btn'))).toBeNull();
    });
  });

  it('should hide closable button and show changeable option on input', () => {
    const host = { ...StatisticBase, closable: false, changeable: true };
    component.statistic = new GridStatistic(host, 1, 1);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(element.query(By.css('.graph-change-btn'))).toBeTruthy();
      expect(element.query(By.css('.close-btn'))).toBeNull();
    });
  });

  it('should only show changeable options of same type', () => {
    const host = { ...StatisticBase, changeable: true, type: 'data' };
    component.statistic = new GridStatistic(host, 1, 1);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      component.availableComponents$.subscribe(availableComponents => {
        const notSameType = availableComponents.find(comp => comp.component.type !== 'data');
        expect(notSameType).toBeUndefined();
      });
    });
  });

  it('should update information when component changes', () => {
    const host = { ...StatisticBase, title: 'First component' };
    component.statistic = new GridStatistic(host, 1, 1);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(element.query(By.css('.title')).nativeElement.textContent).toEqual('First component');

      const host2 = { ...StatisticBase, title: 'Second component' };
      component.statistic.changeComponent(host2);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(element.query(By.css('.title')).nativeElement.textContent).toEqual('Second component');
      });
    });
  });
});

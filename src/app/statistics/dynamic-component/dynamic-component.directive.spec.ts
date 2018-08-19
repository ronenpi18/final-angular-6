import { DynamicComponentDirective } from './dynamic-component.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BehaviorSubject } from 'rxjs';

@Component({
  template: '<span>Hello World!</span>'
})
class HostedComponent {}

@Component({
  template: '<div [appDynamicComponent]="dynamicComponent"></div>'
})
class DynamicComponentTestComponent {
  public dynamicComponent = new BehaviorSubject(HostedComponent).asObservable();
}

describe('DynamicComponentDirective', () => {
  let fixture: ComponentFixture<DynamicComponentTestComponent>;
  let element: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostedComponent, DynamicComponentDirective, DynamicComponentTestComponent]
    });

    // some sort of hack to get this working
    // https://github.com/angular/angular/issues/10760
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [HostedComponent]
      }
    });
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicComponentTestComponent);
    element = fixture.debugElement;
  });

  it('should inject child component', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(element).toBeTruthy();
      expect(element.query(By.css('span')).nativeElement.textContent).toEqual('Hello World!');
    })
  });
});

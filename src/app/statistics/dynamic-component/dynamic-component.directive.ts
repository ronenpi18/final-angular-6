import { Directive, Input, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appDynamicComponent]'
})
export class DynamicComponentDirective implements OnInit {

  @Input('appDynamicComponent') component$: Subject<any>;
  @Input() data: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {}
  
  ngOnInit() {
    this.component$.subscribe((component) => {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
      const viewContainerRef = this.viewContainerRef;
  
      viewContainerRef.clear();
      const componentRef = viewContainerRef.createComponent(componentFactory);
      (componentRef.instance as any).data = this.data;
    });
  }

}

import { Directive, Input, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appDynamicComponent]'
})
export class DynamicComponentDirective implements OnInit {

  private componetDestroyed = new Subject();

  @Input('appDynamicComponent') component$: Subject<any>;
  @Input() data: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {}
  
  ngOnInit() {
    this.component$.pipe(
      takeUntil(this.componetDestroyed)
    ).subscribe((component) => {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
      const viewContainerRef = this.viewContainerRef;
  
      viewContainerRef.clear();
      const componentRef = viewContainerRef.createComponent(componentFactory);
      (componentRef.instance as any).data = this.data;
    });
  }

  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }

}

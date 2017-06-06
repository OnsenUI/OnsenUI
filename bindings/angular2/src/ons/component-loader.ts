import {
  Injector,
  Injectable,
  ApplicationRef,
  ComponentRef
} from '@angular/core';

@Injectable()
export class ComponentLoader {
  constructor(private appRef: ApplicationRef) {
  }

  // Load an instance of ComponentRef in app view.
  load(componentRef: ComponentRef<any>) {
    const rootElement = componentRef.location.nativeElement;

    if (this.appRef.attachView) {
      this.appRef.attachView(componentRef.hostView);

      componentRef.onDestroy(() => {
        this.appRef.detachView(componentRef.hostView);

        if (rootElement.parentNode) {
          rootElement.parentNode.removeChild(rootElement);
        }
      });
    } else {
      if ((<any>this.appRef).registerChangeDetector) {
        (<any>this.appRef).registerChangeDetector(componentRef.changeDetectorRef);
      }

      componentRef.onDestroy(() => {
        if ((<any>this.appRef).unregisterChangeDetector) {
          (<any>this.appRef).unregisterChangeDetector(componentRef.changeDetectorRef);
        }

        if (rootElement.parentNode) {
          rootElement.parentNode.removeChild(rootElement);
        }
      });
    }

    const rootContainer = (<any>this.appRef)._rootComponents[0].location.nativeElement;
    rootContainer.appendChild(rootElement);
  }
}



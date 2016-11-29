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

    if (this.appRef['attachView']) {
      // angular2.3.x has `attachView` and `detachView` methods.
      this.appRef['attachView'](componentRef.hostView);

      componentRef.onDestroy(() => {
        this.appRef['detachView'](componentRef.hostView);
      });
    } else {
      const rootContainer = this.appRef['_rootComponents'][0].location.nativeElement;
      rootContainer.appendChild(rootElement);

      if (this.appRef['registerChangeDetector']) {
        this.appRef['registerChangeDetector'](componentRef.changeDetectorRef);
      }

      componentRef.onDestroy(() => {
        if (this.appRef['unregisterChangeDetector']) {
          this.appRef['unregisterChangeDetector'](componentRef.changeDetectorRef);
        }

        if (rootElement.parentNode) {
          rootElement.parentNode.removeChild(rootElement);
        }
      });
    }
  }
}



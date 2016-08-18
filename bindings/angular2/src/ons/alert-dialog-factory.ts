import {
  Injector,
  Type,
  ComponentResolver,
  provide,
  Injectable,
  ApplicationRef,
  ComponentRef,
  ReflectiveInjector
} from '@angular/core';
import {PageParams} from '../directives/ons-navigator';

@Injectable()
export class AlertDialogFactory {

  constructor(
    private _injector: Injector,
    private _resolver: ComponentResolver,
    private _appRef: ApplicationRef
  ) {
  }

  createAlertDialog(componentType: Type, params: Object = {}): Promise<any> {
    return this._resolver.resolveComponent(componentType).then(factory => {
      const injector = ReflectiveInjector.resolveAndCreate([
        provide(PageParams, {useValue: new PageParams(params)})
      ], this._injector);

      const rootViewContainerRef = this._appRef['_rootComponents'][0]['_hostElement'].vcRef; // TODO: fix this dirty hack
      const componentRef = rootViewContainerRef.createComponent(factory, 0, injector);
      const element = componentRef.location.nativeElement.children[0];
      const alertDialogElement = element.tagName === 'ONS-ALERT-DIALOG' ? element : element.querySelector('ons-alert-dialog');

      return {alertDialog: alertDialogElement, destroy: () => componentRef.destroy()};
    });
  }
}

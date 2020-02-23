import { NgModule } from "@angular/core";
import { RESIZE_OBSERVER } from "./resize-observer";
import { ResizeObserver as Polyfill } from "@juggle/resize-observer";

declare var window: any;

export function ponyFillFactory() {
  return window.ResizeObserver || Polyfill;
};

export const polyfillProvider = { provide: RESIZE_OBSERVER, useFactory: ponyFillFactory };

@NgModule({
  providers: [polyfillProvider]
})
export class NgResizeObserverPonyfillModule {}

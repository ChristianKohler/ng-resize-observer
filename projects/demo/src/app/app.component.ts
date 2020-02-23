import { Component } from "@angular/core";
import {
  NgResizeObserver,
  ngResizeObserverProviders
} from "ng-resize-observer";
import { map } from "rxjs/operators";

@Component({
  selector: "app-root",
  template: "width is {{ width$ | async }} px",
  styles: [
    `
      :host {
        display: block;
        border: 3px solid green;
      }
    `
  ],
  providers: [...ngResizeObserverProviders]
})
export class AppComponent {
  width$ = this.resize$.pipe(map(entry => entry.contentRect.width));

  constructor(private resize$: NgResizeObserver) {}
}

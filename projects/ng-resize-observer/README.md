# Angular Resize Observer

## Installation

```bash
npm install ng-resize-observer
```

## Usage
```typescript
import {
  NgResizeObserver,
  ngResizeObserverProviders
} from "ng-resize-observer";

@Component({
  ...
  // 1. Add providers
  providers: [...ngResizeObserverProviders]
})
export class AppComponent {
  // 2. Inject resize$
  constructor(private resize$: NgResizeObserver) {}
}
```


## Example

```typescript
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
```

## Ponyfill

The ponyfill https://github.com/juggle/resize-observer is not bundled by default.

To include the bundle, use either

```typescript
providers: [...ngResizeObserverProvidersWithPonyfill]
```

on every component. Or import it once in a module:

```typescript
@NgModule({
    imports: [NgResizeObserverPonyfillModule]
})
```

## Prefer a directive over a observable?

Check out: https://www.npmjs.com/package/ngx-resize-observer

## Warning

ResizeObserver is still a draft and is not yet finalised and is subject to change.

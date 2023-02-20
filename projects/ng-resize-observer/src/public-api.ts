import {
  NgResizeObserverProvider,
  ResizeObserverService,
  NgResizeObserver,
} from './lib/ng-resize-observer.service';
import {
  NgResizeObserverPonyfillModule,
  polyfillProvider,
} from './lib/ponyfill.module';

const ngResizeObserverProviders = [
  NgResizeObserverProvider,
  ResizeObserverService,
];

const ngResizeObserverProvidersWithPonyfill = [
  ...ngResizeObserverProviders,
  polyfillProvider,
];

/*
 * Public API Surface of ng-resize-observer
 */
export {
  NgResizeObserver,
  ngResizeObserverProviders,
  ngResizeObserverProvidersWithPonyfill,
  NgResizeObserverPonyfillModule,
};

import { InjectionToken } from "@angular/core";
import { ResizeObserver } from "@juggle/resize-observer";

declare var window: any;

export type ResizeObserverClass = {
  new(callback: (entries: any[]) => void): ResizeObserver;
};

export const RESIZE_OBSERVER = new InjectionToken<ResizeObserverClass>(
  "Resize Observer",
  {
    providedIn: "root",
    factory: () => window.ResizeObserver || null
  }
);

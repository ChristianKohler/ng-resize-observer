import {
  ChangeDetectorRef,
  ElementRef,
  Inject,
  Injectable,
  OnDestroy,
  Optional
} from "@angular/core";
import { ResizeObserver, ResizeObserverEntry } from "@juggle/resize-observer";
import { Observable, Subject } from "rxjs";
import { RESIZE_OBSERVER, ResizeObserverClass } from "./resize-observer";

export class NgResizeObserver extends Observable<ResizeObserverEntry> {}

@Injectable()
export class ResizeObserverService implements OnDestroy {
  private onResizeSubject = new Subject<ResizeObserverEntry>();
  private resizeObserver: ResizeObserver;
  public onResize: Observable<
    ResizeObserverEntry
  > = this.onResizeSubject.asObservable();

  constructor(
    private chgRef: ChangeDetectorRef,
    @Optional() private el: ElementRef,
    @Inject(RESIZE_OBSERVER)
    private ResizeObserver: ResizeObserverClass
  ) {
    if (this.el === null) {
      console.error(
        `ng-resize-observer: No provider for ElementRef. This error is most likely because you added the ng-resize-observer provider in a @NgModule. Only add ng-resize-observer on @Component()`
      );
      return;
    }

    if (this.ResizeObserver === null) {
      console.error(
        `ng-resize-observer: ResizeObserver not available. Use the ponyfill module: NgResizeObserverPonyfillModule.`
      );
      return;
    }

    this.observe();
  }

  ngOnDestroy() {
    this.unobserve();
    this.onResizeSubject.complete();
  }

  private observe() {
    this.resizeObserver = new this.ResizeObserver(entries => {
      const entry = entries && entries[0];
      if (entry) {
        this.onResizeSubject.next(entry);
        this.chgRef.detectChanges();
      }
    });
    this.resizeObserver.observe(this.target);
  }

  private unobserve() {
    this.resizeObserver.unobserve(this.target);
  }

  private get target() {
    return this.el.nativeElement;
  }
}

export const NgResizeObserverProvider = {
  provide: NgResizeObserver,
  useFactory: (resizeObserverService: ResizeObserverService) =>
    resizeObserverService.onResize,
  deps: [ResizeObserverService]
};

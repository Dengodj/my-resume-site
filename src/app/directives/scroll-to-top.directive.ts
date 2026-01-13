import { Directive, ElementRef, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollToTop]',
  standalone: true,
})
export class ScrollToTopDirective implements OnInit, OnDestroy {
  private scrollThreshold = 300;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.updateVisibility();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.updateVisibility();
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  private updateVisibility() {
    const scrolled = window.scrollY;
    if (scrolled > this.scrollThreshold) {
      this.renderer.addClass(this.el.nativeElement, 'visible');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'visible');
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(this.el.nativeElement, 'visible');
  }
}

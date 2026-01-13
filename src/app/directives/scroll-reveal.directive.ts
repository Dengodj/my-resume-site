import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit {
  @Input() revealDelay: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const element = this.el.nativeElement;

    this.renderer.setStyle(element, 'opacity', '0');
    this.renderer.setStyle(element, 'transform', 'translateY(25px)');
    this.renderer.setStyle(element, 'transition', 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)');

    this.renderer.setStyle(element, 'transition-delay', `${this.revealDelay}ms`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              this.renderer.setStyle(element, 'opacity', '1');
              this.renderer.setStyle(element, 'transform', 'translateY(0)');
            });
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
  }
}

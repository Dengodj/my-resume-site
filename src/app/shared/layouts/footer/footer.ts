import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID, signal } from '@angular/core';
import { SHARED_IMPORTS } from '@shared/imports';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly currentYear = new Date().getFullYear();
  readonly isScrollBtnVisible = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('document:scroll', [])
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      const scrollPosition =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

      const shouldBeVisible = scrollPosition > 400;

      if (this.isScrollBtnVisible() !== shouldBeVisible) {
        this.isScrollBtnVisible.set(shouldBeVisible);
      }
    }
  }

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }
}

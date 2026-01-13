import { Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ThemeService } from '@core/theme.service';
import { LanguageSwitcher } from '@shared/components/language-switcher/language-switcher';
import { SHARED_IMPORTS } from '@shared/imports';
import { LucideAngularModule } from 'lucide-angular';
import { filter, Subscription } from 'rxjs';
import { NavBar } from '../nav-bar/nav-bar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavBar, LanguageSwitcher, SHARED_IMPORTS, LucideAngularModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',

  host: {
    '[class.force-dark]': 'isNotFoundPage()',
  },
})
export class Header implements OnDestroy {
  public themeService = inject(ThemeService);
  private router = inject(Router);

  isMenuOpen = false;
  private routerSubscription: Subscription;

  private currentUrl = signal<string>(this.router.url);

  public isNotFoundPage = computed(() => {
    const url = this.currentUrl();
    return url === '/page-not-found' || url === '/404' || url.includes('not-found');
  });

  public isDarkThemeActive = computed(() => {
    return this.isNotFoundPage() || this.themeService.isDark;
  });
  constructor() {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentUrl.set(event.urlAfterRedirects || event.url);

        if (this.isMenuOpen) {
          this.closeMenu();
        }
      });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.updateBodyScroll();
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    this.updateBodyScroll();
  }

  toggleTheme(): void {
    if (!this.isNotFoundPage()) {
      this.themeService.toggleTheme();
    }
  }

  private updateBodyScroll(): void {
    if (this.isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    document.body.classList.remove('no-scroll');
  }
}

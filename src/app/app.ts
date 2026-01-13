import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SHARED_IMPORTS } from '@shared/imports';
import { Footer } from '@shared/layouts/footer/footer';
import { Header } from '@shared/layouts/header/header';

import { animate, style, transition, trigger } from '@angular/animations';

import { NgxParticlesModule } from '@tsparticles/angular';
import { Engine, MoveDirection, OutMode } from '@tsparticles/engine';
import { loadFull } from 'tsparticles';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Footer, Header, SHARED_IMPORTS, NgxParticlesModule],
  template: `
    <ngx-particles
      id="tsparticles"
      [options]="particlesOptions"
      [particlesInit]="particlesInit"
    ></ngx-particles>

    <div *ngIf="isTranslationsLoaded()">
      <app-header />
      <main class="page-content">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
  animations: [
    trigger('contentFadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class App implements OnInit {
  protected readonly title = signal('my-resume-site');
  protected isTranslationsLoaded = signal(false);

  protected particlesOptions = {
    fullScreen: { enable: true, zIndex: -1 },
    fpsLimit: 120,
    particles: {
      number: { value: 60, density: { enable: true, area: 800 } },
      color: { value: '#152083' },
      links: {
        enable: true,
        distance: 150,
        color: '#835315',
        opacity: 0.6,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: MoveDirection.none,
        outModes: { default: OutMode.out },
      },
      size: { value: { min: 1, max: 3 } },
      opacity: { value: 0.5 },
      animation: {
        enable: true,
        speed: 1,
        minimumValue: 0.4,
        sync: false,
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: ['grab', 'bubble'] },
        onClick: {
          enable: true,
          mode: 'push',
        },
        resize: { enable: true },
      },
      modes: {
        grab: {
          distance: 200,
          links: {
            opacity: 0.7,
          },
        },
        bubble: {
          distance: 200,
          size: 10,
          duration: 2,
          opacity: 0.4,
          speed: 3,
        },
        push: {
          quantity: 4,
        },
      },
    },
    detectRetina: true,
  };

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('ru');
  }

  ngOnInit() {
    const savedLang = localStorage.getItem('lang') || 'ru';

    this.translate.use(savedLang).subscribe({
      next: () => {
        console.log(`Переводы [${savedLang}] успешно загружены.`);
        this.isTranslationsLoaded.set(true);
      },
      error: (err: unknown) => {
        console.error('Ошибка загрузки переводов:', err);
        this.isTranslationsLoaded.set(true);
      },
    });
  }
  protected async particlesInit(engine: Engine): Promise<void> {
    await loadFull(engine);
  }
}

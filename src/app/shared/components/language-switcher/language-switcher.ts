import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SHARED_IMPORTS } from '@shared/imports';

interface Language {
  code: string;
  labelKey: string;
}

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
})
export class LanguageSwitcher {
  private translate = inject(TranslateService);

  currentLang = this.translate.currentLang || this.translate.defaultLang;

  availableLangs: Language[] = [
    { code: 'ru', labelKey: 'LANG.RU' },
    { code: 'uk', labelKey: 'LANG.UK' },
    { code: 'en', labelKey: 'LANG.EN' },
  ];

  constructor() {
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });

    const preferredLang = localStorage.getItem('preferredLang');
    if (preferredLang && preferredLang !== this.translate.currentLang) {
      this.translate.use(preferredLang);
    }
  }

  switchLang(lang: string): void {
    if (lang === this.currentLang) return;

    this.translate.use(lang);
    localStorage.setItem('preferredLang', lang);
  }
}

import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable, catchError, of } from 'rxjs';

import {
  ArrowLeft,
  AtSign,
  Award,
  BriefcaseBusiness,
  CodeXml,
  Cpu,
  Download,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Languages,
  Lightbulb,
  Linkedin,
  LucideAngularModule,
  Mail,
  MessageCircle,
  MessageSquare,
  Monitor,
  Moon,
  Rocket,
  Send,
  Sparkles,
  Sun,
  Terminal,
  User,
  Users,
} from 'lucide-angular';

import { routes } from './app.routes';

export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  public getTranslation(lang: string): Observable<any> {
    const timestamp = new Date().getTime();
    return this.http.get(`./assets/i18n/${lang}.json?v=${timestamp}`).pipe(
      catchError((error) => {
        console.error(`Ошибка загрузки перевода [${lang}]:`, error);
        return of({});
      })
    );
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(
      LucideAngularModule.pick({
        AtSign,
        Award,
        ArrowLeft,
        BriefcaseBusiness,
        Cpu,
        CodeXml,
        Download,
        ExternalLink,
        FileText,
        Github,
        Linkedin,
        Mail,
        MessageSquare,
        Rocket,
        Send,
        Terminal,
        User,
        Users,
        Lightbulb,
        MessageCircle,
        GraduationCap,
        Monitor,
        Moon,
        Sparkles,
        Sun,
        Languages,
      }),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: CustomTranslateLoader,
          deps: [HttpClient],
        },
        fallbackLang: 'en',
      })
    ),
  ],
};

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SHARED_IMPORTS } from '@shared/imports';
import { ArrowLeft, LucideAngularModule, LucideIconProvider } from 'lucide-angular';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [SHARED_IMPORTS, RouterModule, LucideAngularModule, TranslateModule],
  providers: [{ provide: LucideIconProvider, useValue: new LucideIconProvider({ ArrowLeft }) }],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.scss',
})
export class PageNotFound {}

import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { ProjectCard } from '@shared/components/project-card/project-card';
import { SHARED_IMPORTS } from '@shared/imports';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [SHARED_IMPORTS, ProjectCard],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  animations: [
    trigger('scrollReveal', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(
          '0.6s cubic-bezier(0.35, 0, 0.25, 1)',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('listAnimation', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(50px)' }),
            stagger('150ms', [
              animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class Projects implements OnInit {
  projectsList: any[] = [];
  private destroyRef = inject(DestroyRef);
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.loadProjects();

    this.translate.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.loadProjects());
  }

  private loadProjects() {
    this.translate
      .get('PROJECTS.ITEMS')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((translations) => {
        if (translations) {
          this.projectsList = Object.keys(translations).map((key) => ({
            ...translations[key],
            id: key,
          }));
        }
      });
  }
}

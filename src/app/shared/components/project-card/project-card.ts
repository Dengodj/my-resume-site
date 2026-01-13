import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, OnInit, signal } from '@angular/core';
import type { Project } from '@core/models/project.interface';
import { SHARED_IMPORTS } from '@shared/imports';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [SHARED_IMPORTS],
  animations: [
    trigger('scrollReveal', [
      state(
        'hidden',
        style({
          opacity: 0,
          transform: 'translateY(40px) scale(0.95)',
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
          transform: 'translateY(0) scale(1)',
        })
      ),
      transition('hidden => visible', [animate('0.8s cubic-bezier(0.35, 0, 0.25, 1)')]),
    ]),
  ],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  @Input({ required: true }) project!: Project;

  protected revealState = signal<'hidden' | 'visible'>('hidden');

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.createObserver();
  }

  private createObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.revealState.set('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(this.el.nativeElement);
  }

  get iconClasses(): string {
    return this.project.id % 2 === 0 ? 'project-card--reverse' : '';
  }
}

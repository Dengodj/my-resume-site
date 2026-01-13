import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'Denys Goida | Frontend Developer',
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    title: 'About Me | Denys Goida',
  },
  {
    path: 'contacts',
    loadComponent: () => import('./pages/contacts/contacts').then((m) => m.Contacts),
    title: 'Contact Me | Denys Goida',
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects').then((m) => m.Projects),
    title: 'My Projects | Denys Goida',
  },
  {
    path: 'skills',
    loadComponent: () => import('./pages/skills/skills').then((m) => m.Skills),
    title: 'My Skills | Denys Goida',
  },
  {
    path: 'cv',
    loadComponent: () => import('./pages/cv-print/cv-print').then((m) => m.CvPrint),
    title: 'CV | Denys Goida',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/page-not-found/page-not-found').then((m) => m.PageNotFound),
    title: 'Page Not Found',
  },
];

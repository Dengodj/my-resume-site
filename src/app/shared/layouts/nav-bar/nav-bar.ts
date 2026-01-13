import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  navLinks = [
    { path: '/about', label: 'NAV.ABOUT' },
    { path: '/skills', label: 'NAV.SKILLS' },
    { path: '/projects', label: 'NAV.PROJECTS' },
    { path: '/contacts', label: 'NAV.CONTACTS' },
  ];
}

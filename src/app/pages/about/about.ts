import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ScrollRevealDirective } from 'src/app/directives/scroll-reveal.directive';
import { SHARED_IMPORTS } from '../../shared/imports';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SHARED_IMPORTS, ScrollRevealDirective, LucideAngularModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  openCertificate(): void {
    const certPath = 'assets/pdf/Certificate-FE.pdf';
    window.open(certPath, '_blank');
  }

  getExperienceYears(): number {
    const startYear = 2020;
    return new Date().getFullYear() - startYear;
  }
}

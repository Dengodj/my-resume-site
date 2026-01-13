import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SHARED_IMPORTS } from '@shared/imports';
import { LucideAngularModule } from 'lucide-angular';

import { HARD_SKILLS, LANGUAGES, MY_INFO, SOFT_SKILLS } from '@shared/data/skills-data';

@Component({
  selector: 'app-cv-print',
  standalone: true,
  imports: [SHARED_IMPORTS, TranslateModule, LucideAngularModule],
  templateUrl: './cv-print.html',
  styleUrl: './cv-print.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvPrint {
  public readonly myInfo = MY_INFO;
  public readonly hardSkills = HARD_SKILLS;
  public readonly softSkills = SOFT_SKILLS;
  public readonly languages = LANGUAGES;

  public downloadPDF(): void {
    window.print();
  }
}

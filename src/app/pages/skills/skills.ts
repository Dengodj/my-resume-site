import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Skill } from '@core/models/skill.interface';
import { LucideAngularModule } from 'lucide-angular';
import { ScrollRevealDirective } from 'src/app/directives/scroll-reveal.directive';
import { SkillBar } from '../../shared/components/skill-bar/skill-bar';
import { SHARED_IMPORTS } from '../../shared/imports';

import { HARD_SKILLS, LANGUAGES, LEARNING_TECH, SOFT_SKILLS } from '../../shared/data/skills-data';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SkillBar, NgFor, SHARED_IMPORTS, ScrollRevealDirective, LucideAngularModule],
  templateUrl: './skills.html',
  styleUrls: ['./skills.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills {
  public readonly softSkills = SOFT_SKILLS;
  public readonly learningTech = LEARNING_TECH;
  public readonly languages = LANGUAGES;

  public getSkillsByCategory(category: 'frontend' | 'tools'): Skill[] {
    const categoryData = HARD_SKILLS.find((cat) =>
      category === 'frontend' ? cat.titleKey.includes('FRONTEND') : cat.titleKey.includes('TOOLS')
    );

    if (!categoryData) return [];

    return categoryData.skills.map((s) => ({
      name: s.name,
      level: this.mapLevelToPercent(s.levelKey),
      levelKey: s.levelKey?.split('.').pop() || '',
      category: category,
    }));
  }

  private mapLevelToPercent(levelKey: string | undefined): number {
    if (levelKey?.includes('EXPERT')) return 95;
    if (levelKey?.includes('ADVANCED')) return 85;
    if (levelKey?.includes('INTERMEDIATE')) return 70;
    return 50;
  }
}

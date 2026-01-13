import { Component, Input, OnInit } from '@angular/core';
import type { Skill } from '@core/models/skill.interface';
import { SHARED_IMPORTS } from '@shared/imports';
@Component({
  selector: 'app-skill-bar',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './skill-bar.html',
  styleUrl: './skill-bar.scss',
})
export class SkillBar implements OnInit {
  @Input({ required: true }) skill!: Skill;

  ngOnInit(): void {
    this.skill.level = Math.max(0, Math.min(100, this.skill.level));
  }

  public get skillLevelKey(): string {
    const level = this.skill.level;
    if (level >= 90) return 'EXPERT';
    if (level >= 75) return 'ADVANCED';
    if (level >= 50) return 'INTERMEDIATE';
    return 'BASIC';
  }
}

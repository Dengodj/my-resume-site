import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '@shared/imports';
import { Skills } from '../skills/skills';

import { NgxParticlesModule } from '@tsparticles/angular';
import { Engine } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SHARED_IMPORTS, Skills, NgxParticlesModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  public name = 'Денис Гойда';
  public title = 'Frontend Developer';

  async particlesInit(engine: Engine): Promise<void> {
    await loadSlim(engine);
  }
}

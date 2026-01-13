export interface SkillItem {
  name: string;
  levelKey?: string;
}

export interface SkillCategory {
  titleKey: string;
  icon: string;
  skills: SkillItem[];
}

export interface LanguageItem {
  nameKey: string;
  levelKey: string;
  percent: number;
  flag: string;
}

// Main info
export const MY_INFO = {
  nameKey: 'HERO.NAME',
  roleKey: 'HERO.TITLE',
  email: 'itdev.step@gmail.com',
  location: 'Ukraine',
  github: 'https://github.com/dengodj',
  linkedin: 'https://www.linkedin.com/in/denis-goida-4b481a3a1/',
};

// Hard skills (Frontend & Tools)
export const HARD_SKILLS: SkillCategory[] = [
  {
    titleKey: 'SKILLS.CATEGORIES.FRONTEND',
    icon: 'code-xml',
    skills: [
      { name: 'Angular', levelKey: 'SKILLS.LEVELS.EXPERT' },
      { name: 'TypeScript', levelKey: 'SKILLS.LEVELS.EXPERT' },
      { name: 'SCSS / Sass', levelKey: 'SKILLS.LEVELS.ADVANCED' },
      { name: 'RxJS', levelKey: 'SKILLS.LEVELS.ADVANCED' },
      { name: 'HTML5 / CSS3', levelKey: 'SKILLS.LEVELS.EXPERT' },
    ],
  },
  {
    titleKey: 'SKILLS.CATEGORIES.TOOLS',
    icon: 'cpu',
    skills: [
      { name: 'Git / GitHub', levelKey: 'SKILLS.LEVELS.EXPERT' },
      { name: 'NPM / Yarn', levelKey: 'SKILLS.LEVELS.ADVANCED' },
      { name: 'Webpack / Vite', levelKey: 'SKILLS.LEVELS.INTERMEDIATE' },
      { name: 'Figma', levelKey: 'SKILLS.LEVELS.INTERMEDIATE' },
    ],
  },
];

// Soft skills
export const SOFT_SKILLS = [
  { nameKey: 'SKILLS.SOFT.TEAMWORK', icon: 'users' },
  { nameKey: 'SKILLS.SOFT.PROBLEM_SOLVING', icon: 'lightbulb' },
  { nameKey: 'SKILLS.SOFT.MENTORING', icon: 'award' },
  { nameKey: 'SKILLS.SOFT.ADAPTABILITY', icon: 'rocket' },
];

// Languages
export const LANGUAGES: LanguageItem[] = [
  {
    nameKey: 'SKILLS.LANG.EN',
    levelKey: 'SKILLS.LEVELS.UPPER_INTERMEDIATE',
    percent: 80,
    flag: '🇬🇧',
  },
  {
    nameKey: 'SKILLS.LANG.UA',
    levelKey: 'SKILLS.LEVELS.NATIVE',
    percent: 100,
    flag: '🇺🇦',
  },
  {
    nameKey: 'SKILLS.LANG.RU',
    levelKey: 'SKILLS.LEVELS.NATIVE',
    percent: 100,
    flag: '🇷🇺',
  },
];

// Education / Interests
export const LEARNING_TECH = [
  { name: 'Node.js / NestJS', statusKey: 'SKILLS.STATUS.LEARNING' },
  { name: 'Docker / Kubernetes', statusKey: 'SKILLS.STATUS.PLANNING' },
  { name: 'Three.js / WebGL', statusKey: 'SKILLS.STATUS.INTEREST' },
  { name: 'Tailwind CSS', statusKey: 'SKILLS.STATUS.LEARNING' },
];

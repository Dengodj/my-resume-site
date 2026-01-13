export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  extraLinks?: ProjectLink[];
  status: 'active' | 'completed' | 'development';
}

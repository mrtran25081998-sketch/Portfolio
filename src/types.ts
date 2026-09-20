export type ZoneId = 'about' | 'experience' | 'work' | 'explore' | 'contact' | 'cv' | 'cx';

export interface ZoneConfig {
  id: ZoneId;
  title: string;
  signText: string;
  position: [number, number, number];
  targetPosition: [number, number, number]; // where character can stand
  cameraOffset: [number, number, number]; // cinematic camera angle when focusing
  interactionRadius: number;
  highlightColor: number;
}

export interface CoreCompetency {
  id: string;
  title: string;
  description: string;
  iconName: 'product-design' | 'strategy' | 'design-system';
}

export interface AboutData {
  greeting: string;
  name: string;
  role: string;
  tagline: string;
  bio: string[];
  competencies: CoreCompetency[];
  skills: { category: string; items: string[] }[];
  tools: { name: string; level: number; icon: string }[];
  funFacts: string[];
  cvUrl: string;
}

export interface ExperienceItem {
  id: string;
  orderNumber: number;
  company: string;
  companySubtitle?: string;
  logoType: 'mb' | 'kienlong' | 'agiletech';
  role: string;
  period: string;
  location: string;
  description?: string;
  bullets: string[];
  responsibilities?: string[];
  achievements?: string[];
  skills: string[];
  badgeColor: string;
  isCurrent?: boolean;
}

export interface ProjectScreen {
  title: string;
  type: 'ui' | 'game' | 'web' | 'mobile';
  color: string;
  accent: string;
  iconName: string;
}

export interface CaseStudyDetailed {
  problem: string;
  solution: string;
  deliverables: string[];
  background?: string;
  targetAudience?: string;
  painPoints?: { title: string; desc: string }[];
  processSteps?: { step: string; title: string; desc: string }[];
  keySolutions?: { title: string; desc: string; highlight?: string }[];
  beforeAfter?: { metric: string; before: string; after: string; note?: string }[];
  learnings?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  badge?: string;
  category: string;
  role: string;
  owner: string; // Chủ dự án, e.g. "BIZ MBBank 2.0"
  imageUrl?: string;
  summary: string;
  impact?: string;
  tags: string[];
  screens: ProjectScreen[];
  previewColor: string;
  accentColor: string;
  metrics: { label: string; value: string }[];
  demoUrl?: string;
  caseStudy: CaseStudyDetailed;
}

export interface ContactInfo {
  phone: string;
  email: string;
  linkedin: string;
  behance: string;
  facebook: string;
  github?: string;
  dribbble?: string;
  location: string;
  availability: string;
  dropboxCvUrl: string;
}

export interface GameSettings {
  soundEnabled: boolean;
  graphicsQuality: 'high' | 'medium' | 'low';
}

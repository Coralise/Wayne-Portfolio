export type VideoOrientation = 'landscape' | 'portrait'

export interface PortfolioVideo {
  /** YouTube video id */
  id: string
  /** Human readable title, used for captions and accessible labels */
  title: string
  /** Drives the slide width inside the variable-width carousel */
  orientation: VideoOrientation
}

export interface PortfolioCategory {
  name: string
  description: string
  videos: PortfolioVideo[]
}

export type ProjectCategory = 'Web App' | 'Game' | 'Plugin' | 'Mobile App' | 'Systems'

/** A tech badge. `icon` is a key into the icon map in `components/tag.js`. */
export interface ProjectTech {
  name: string
  icon?: string
}

export type ProjectLinkKind = 'website' | 'source' | 'play'

export interface ProjectLink {
  kind: ProjectLinkKind
  label: string
  url: string
}

export type ProjectMedia =
  | { type: 'image'; src: string; alt?: string }
  | { type: 'youtube'; id: string; title?: string }

/** A headline number, e.g. `{ value: '22,000+', label: 'Downloads' }`. */
export interface ProjectStat {
  value: string
  label: string
}

export interface ProgrammingProject {
  /** URL hash used for deep links (`/programming-portfolio#<slug>`). */
  slug: string
  title: string
  tagline: string
  category: ProjectCategory
  /** Free-form month/year strings; `end` may be `'Present'`. */
  period: { start: string; end: string }
  /** Short intro paragraph — plain text, no markdown. */
  summary: string
  stats?: ProjectStat[]
  /** Key features of the project itself. */
  features?: string[]
  /** Skills picked up along the way. */
  learnings: string[]
  tech: ProjectTech[]
  links: ProjectLink[]
  /** The first entry doubles as the card cover. */
  media: ProjectMedia[]
}

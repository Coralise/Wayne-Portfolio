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

import type { PortfolioCategory } from '../types/portfolio'

/**
 * Motion graphics portfolio content.
 *
 * `orientation` controls how wide each slide renders in the variable-width
 * carousel — landscape videos get a 16:9 frame, portrait ones a 9:16 frame.
 * Orientation is per video, so a single category can freely mix both.
 */
export const motionGraphicsPortfolio: PortfolioCategory[] = [
  {
    name: 'Motion Graphics',
    description: 'Motion graphics, title sequences, and transitions.',
    videos: [
      { id: 'B_udJ2XtBHQ', title: 'Motion Graphics 01', orientation: 'landscape' },
      { id: 'VItqafidTkw', title: 'Motion Graphics 02', orientation: 'landscape' },
      { id: '8N9WE9SxUfU', title: 'Motion Graphics 03', orientation: 'landscape' },
      { id: 'X3OOeMxlEDw', title: 'Motion Graphics 04', orientation: 'landscape' },
      { id: 'ynktyH9hB1E', title: 'Motion Graphics Showreel', orientation: 'landscape' },
      { id: 'sDvYGHHAJEE', title: 'Motion Graphics 06', orientation: 'landscape' },
      { id: 'DzBUnDz5UH4', title: 'Motion Graphics 07', orientation: 'landscape' },
      { id: 'cyrsH8-NMrg', title: 'Motion Graphics 08', orientation: 'landscape' },
      { id: 'aWqJJERwu1U', title: 'Motion Graphics 09', orientation: 'landscape' },
      { id: 'kbbCIw8d8oU', title: 'Motion Graphics 10', orientation: 'landscape' },
      { id: 'IgQwSgag86Q', title: 'Motion Graphics 11', orientation: 'landscape' },
      { id: 'As6X9toDt6w', title: 'Motion Graphics 12', orientation: 'landscape' },
      { id: 'hR4_TzwpCcA', title: 'Motion Graphics 13', orientation: 'landscape' },
      { id: 'eqU7JKVeU5U', title: 'Motion Graphics 14', orientation: 'landscape' },
      { id: 'ui6JVVRI1So', title: 'Motion Graphics 15', orientation: 'landscape' },
      { id: 'QK7hS403h3I', title: 'Motion Graphics 16', orientation: 'landscape' },
      { id: 'sSkqzXzUq5U', title: 'Motion Graphics 17', orientation: 'landscape' },
    ],
  },
  {
    name: 'Short Form Videos',
    description: 'Short-form edits, reels, and quick promos.',
    videos: [
      { id: 'WzQCc9uHwOI', title: 'Short Form 01', orientation: 'portrait' },
      { id: 'pSvT0Jf3s8Q', title: 'Short Form 02', orientation: 'portrait' },
      { id: '6Arekf4_H5k', title: 'Short Form 03', orientation: 'portrait' },
      { id: 'HrWWPvRlEpY', title: 'Short Form 04', orientation: 'portrait' },
      { id: 'p-3Ydou9PP0', title: 'Short Form 05', orientation: 'portrait' },
      { id: 'I3JCRhSF4lI', title: 'Short Form 06', orientation: 'portrait' },
      { id: 'MMrjXzy7xEU', title: 'Short Form 07', orientation: 'portrait' },
      { id: 'FAwZTJd_pXw', title: 'Short Form 08', orientation: 'portrait' },
      { id: 'R_d9dBCknB8', title: 'Short Form 09', orientation: 'landscape' },
      { id: 'PgcDejAV15k', title: 'Short Form 10', orientation: 'landscape' },
    ],
  },
  {
    name: 'Long Form Videos',
    description: 'Documentaries, narratives, and storytelling videos.',
    videos: [
      { id: 'z30aSnz-bwE', title: 'Long Form 01', orientation: 'landscape' },
      { id: 'HZscxnmbfmc', title: 'Long Form 02', orientation: 'landscape' },
      { id: '7QrRismrarE', title: 'Long Form 03', orientation: 'landscape' },
    ],
  },
  {
    name: 'Typography',
    description: 'Animated typography and kinetic lettering.',
    videos: [
      { id: 'XU4ZbQjpGdU', title: 'Typography Animation', orientation: 'landscape' },
      { id: '79SyE7yd9mE', title: 'Typography 02', orientation: 'landscape' },
      { id: 'j6s48dbW5Dk', title: 'Typography 03', orientation: 'landscape' },
    ],
  },
  {
    name: 'Logo Animations',
    description: 'Logo reveals and brand identity motion.',
    videos: [
      { id: '9PwLL1MZO8Q', title: 'Logo Animation', orientation: 'landscape' },
      { id: '9xHGInEkYes', title: 'Logo Animation 02', orientation: 'landscape' },
      { id: 'OKvLbq18TNI', title: 'Logo Animation 03', orientation: 'landscape' },
      { id: 'IMpfr0vpAN0', title: 'Logo Animation 04', orientation: 'landscape' },
      { id: 'oSDykWQFJUI', title: 'Logo Animation 05', orientation: 'landscape' },
      { id: 'ZARWFrZa_4o', title: 'Logo Animation 06', orientation: 'landscape' },
      { id: 'O_oO2Cj5Ye4', title: 'Logo Animation 07', orientation: 'landscape' },
      { id: 'HYrbda-tzPI', title: 'Logo Animation 08', orientation: 'landscape' },
      { id: 'dPAB-aj7OTw', title: 'Logo Animation 09', orientation: 'landscape' },
    ],
  },
]

export function toId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

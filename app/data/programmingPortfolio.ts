import type { ProgrammingProject, ProjectCategory } from '../types/portfolio'

/**
 * Programming portfolio content, in display order.
 *
 * Each project is broken into small fields instead of one markdown body, so
 * the page can lay them out as stats, feature lists, tech badges and buttons.
 * The first `media` entry is used as the cover image.
 */
export const programmingPortfolio: ProgrammingProject[] = [
  {
    slug: 'bridgewatch-server-browser',
    title: 'Bridgewatch Server Browser',
    tagline: 'Discord server discovery platform with real-time member tracking',
    category: 'Web App',
    period: { start: 'February 2026', end: 'April 2026' },
    summary:
      'A modern Discord server discovery platform that helps users find and join Bridgewatch community servers organized by region. It tracks live server activity and member counts behind an animated, responsive interface.',
    features: [
      'Region-based filtering of community servers',
      'Real-time server activity and member count tracking',
      'Activity scoring to surface the liveliest servers',
      'One-click Discord join flow',
    ],
    learnings: [
      'Building responsive discovery platforms with Next.js and TypeScript',
      'Designing polished UI components with Tailwind CSS and Framer Motion',
      'Implementing real-time data enrichment and webhooks for analytics',
      'Creating region-based filtering and activity scoring algorithms',
      'Optimizing performance when displaying server metrics and status',
      'Building seamless Discord integration experiences',
    ],
    tech: [
      { icon: 'nextjs', name: 'Next.js' },
      { icon: 'typescript', name: 'TypeScript' },
      { icon: 'react', name: 'React' },
      { icon: 'tailwindcss', name: 'Tailwind CSS' },
      { icon: 'framer-motion', name: 'Framer Motion' },
    ],
    links: [
      { kind: 'website', label: 'Visit Website', url: 'https://bridgewatch.online' },
      { kind: 'source', label: 'Source Code', url: 'https://github.com/Wayne-Portfolio/bridgewatch-online' },
    ],
    media: [
      { type: 'image', src: '/images/bwo/BWO1.png' },
      { type: 'image', src: '/images/bwo/BWO2.png' },
      { type: 'image', src: '/images/bwo/BWO3.png' },
    ],
  },
  {
    slug: 'game-of-the-generals-online',
    title: 'Game of the Generals Online',
    tagline: 'Real-time multiplayer Filipino strategy game with WebRTC',
    category: 'Game',
    period: { start: 'January 2026', end: 'January 2026' },
    summary:
      'A real-time multiplayer take on the classic Filipino strategy board game Salpakan, with true peer-to-peer connectivity through WebRTC. Moves travel directly browser-to-browser for instant play.',
    features: [
      'Create or join a match with a 4-character room code',
      'Peer-to-peer moves over RTCDataChannel',
      'Supabase-powered signaling for SDP and ICE exchange',
      'Classic rules including spies and combat resolution',
    ],
    learnings: [
      'Implementing WebRTC peer-to-peer connections with RTCPeerConnection and RTCDataChannel',
      'Building real-time multiplayer game logic with Next.js and TypeScript',
      'Designing a responsive, glassmorphic UI with Tailwind CSS and Framer Motion',
      'Managing WebRTC signaling with Supabase',
      'Creating room-based matchmaking systems',
    ],
    tech: [
      { icon: 'supabase', name: 'Supabase' },
      { icon: 'nextjs', name: 'Next.js' },
      { icon: 'typescript', name: 'TypeScript' },
      { icon: 'react', name: 'React' },
      { icon: 'tailwindcss', name: 'Tailwind CSS' },
      { icon: 'webrtc', name: 'WebRTC' },
    ],
    links: [
      { kind: 'play', label: 'Play Game', url: 'https://gotg-online.vercel.app/' },
      { kind: 'source', label: 'Source Code', url: 'https://github.com/Wayne-Portfolio/game-of-the-generals-online' },
    ],
    media: [
      { type: 'image', src: '/images/gotg/gotg1.png' },
      { type: 'image', src: '/images/gotg/gotg2.png' },
      { type: 'image', src: '/images/gotg/gotg3.png' },
      { type: 'image', src: '/images/gotg/gotg4.png' },
    ],
  },
  {
    slug: 'roblox-roleplay-game',
    title: 'Philippine Marine Corps RP',
    tagline: 'Military roleplay experience on Roblox',
    category: 'Game',
    period: { start: 'August 2025', end: 'December 2025' },
    summary:
      'An immersive roleplaying experience on Roblox where players enlist in the Philippine Marine Corps, undergo training, and take part in military operations and missions within a dynamic virtual world.',
    stats: [{ value: '23,000+', label: 'Visits' }],
    features: [
      'Enlistment and player progression system',
      'Training flows and mission logic',
      'Custom in-game UI and HUD',
    ],
    learnings: [
      'Scripting complex gameplay systems in Lua',
      'Designing intuitive in-game UI and HUD elements',
      'Implementing networked multiplayer features and optimizing client-server performance',
      'Managing assets, animations, and visual effects for immersive feedback',
      'Using version control and collaborative workflows on a live game',
    ],
    tech: [
      { icon: 'lua', name: 'Lua' },
      { icon: 'gamedesign', name: 'Game Design' },
    ],
    links: [
      { kind: 'play', label: 'Play on Roblox', url: 'https://www.roblox.com/games/110533446843258/Philippine-Marine-Corps-RP#!/about' },
    ],
    media: [
      { type: 'image', src: '/images/pmc/pmc1.png' },
      { type: 'image', src: '/images/pmc/pmc2.png' },
      { type: 'image', src: '/images/pmc/pmc3.png' },
      { type: 'image', src: '/images/pmc/pmc4.png' },
      { type: 'image', src: '/images/pmc/pmc5.png' },
    ],
  },
  {
    slug: 'jedis',
    title: 'Jedis',
    tagline: 'Redis-like datastore made in Java',
    category: 'Systems',
    period: { start: 'January 2025', end: 'February 2025' },
    summary:
      'Jedis (Java Redis) is my attempt at replicating Redis in Java — data persistence, in-memory caching and pub/sub messaging, built from scratch with a focus on performance and thread safety.',
    features: [
      'Strings, hashes, lists and sets',
      'In-memory caching with persistence',
      'Pub/sub messaging',
      'Thread-safe concurrent operations',
    ],
    learnings: [
      'Implementing common Redis data structures',
      'Designing a lightweight in-memory database',
      'Developing pub/sub messaging for real-time communication',
      'Ensuring thread-safe design for concurrent operations',
      'Optimizing performance in distributed systems',
    ],
    tech: [{ icon: 'java', name: 'Java' }],
    links: [
      { kind: 'source', label: 'Source Code', url: 'https://github.com/Coralise/Java-Redis' },
    ],
    media: [{ type: 'image', src: '/images/jedis.jpg' }],
  },
  {
    slug: 'bean-s-spelling-bee-helper',
    title: "Bean's Spelling Bee Helper",
    tagline: "Practice tool and random-word API for Roblox Bean's Spelling Bee",
    category: 'Web App',
    period: { start: 'February 2025', end: 'September 2025' },
    summary:
      'A spelling and typing practice tool for the Roblox game "Spelling Bee". It pairs a random-word API with custom word lists and a WPM tracker, for both casual practice and competitive preparation.',
    features: [
      'Random-word API',
      'Custom word lists',
      'Live WPM tracker',
      'reCAPTCHA v3 protection',
    ],
    learnings: [
      'Building modern web applications with Next.js and TypeScript',
      'Designing secure APIs with reCAPTCHA integration',
      'Creating responsive, user-friendly interfaces with Tailwind CSS',
      'Implementing real-time WPM tracking for user feedback',
    ],
    tech: [
      { icon: 'nextjs', name: 'Next.js' },
      { icon: 'typescript', name: 'TypeScript' },
      { icon: 'react', name: 'React' },
      { icon: 'tailwindcss', name: 'Tailwind CSS' },
    ],
    links: [
      { kind: 'website', label: 'Visit Website', url: 'https://robloxspellingbee.vercel.app/' },
    ],
    media: [
      { type: 'image', src: '/images/rsb/rsb1.png' },
      { type: 'image', src: '/images/rsb/rsb2.png' },
      { type: 'image', src: '/images/rsb/rsb3.png' },
      { type: 'image', src: '/images/rsb/rsb4.png' },
      { type: 'image', src: '/images/rsb/rsb5.png' },
    ],
  },
  {
    slug: 'custom-bans-plus',
    title: 'Custom Bans Plus',
    tagline: 'Advanced ban management for Minecraft servers',
    category: 'Plugin',
    period: { start: 'February 2020', end: 'Present' },
    summary:
      'A Minecraft server plugin with advanced tools for bans, kicks and player moderation. It has become a trusted solution for server administrators who want efficiency and customization.',
    stats: [{ value: '22,000+', label: 'Downloads' }],
    features: [
      'In-game GUIs for managing bans and kicks',
      'Customizable ban messages and durations',
      'MySQL storage for multi-server setups',
    ],
    learnings: [
      'Developing intuitive GUIs for managing bans and kicks',
      'Integrating MySQL for scalable data storage',
      'Leveraging the Spigot API for seamless server integration',
      'Strengthening Java skills for plugin development',
    ],
    tech: [
      { icon: 'java', name: 'Java' },
      { icon: 'mysql', name: 'MySQL' },
      { icon: 'mcspigotapi', name: 'MC Spigot API' },
    ],
    links: [
      { kind: 'source', label: 'Source Code', url: 'https://github.com/Coralise/Custom-Bans-Plus' },
    ],
    media: [
      { type: 'image', src: '/images/cbp/CBP_Intro.gif' },
      { type: 'youtube', id: 'fxvxKAw0tWI', title: 'Custom Bans Plus showcase' },
      { type: 'image', src: '/images/cbp/ss1.jpeg' },
      { type: 'image', src: '/images/cbp/ss2.jpeg' },
      { type: 'image', src: '/images/cbp/ss3.jpeg' },
      { type: 'image', src: '/images/cbp/ss4.jpeg' },
      { type: 'image', src: '/images/cbp/ss5.jpeg' },
    ],
  },
  {
    slug: 'tiktok-wordle',
    title: 'TikTok Wordle',
    tagline: 'Interactive Wordle game with TikTok Live integration',
    category: 'Web App',
    period: { start: 'May 2025', end: 'May 2025' },
    summary:
      'A Wordle game that plugs straight into TikTok Live. Viewers guess words in real time through the live chat, turning a solo puzzle into a social game.',
    features: [
      'Guesses read live from TikTok chat',
      'Real-time board updates over Socket.IO',
    ],
    learnings: [
      'Implementing real-time multiplayer functionality with Socket.IO',
      'Designing responsive, user-friendly interfaces with React',
      'Integrating third-party APIs for live streaming platforms',
      'Building scalable, performant applications with Next.js',
    ],
    tech: [
      { icon: 'typescript', name: 'TypeScript' },
      { icon: 'react', name: 'React' },
      { icon: 'socket.io', name: 'Socket.IO' },
      { icon: 'nextjs', name: 'Next.js' },
    ],
    links: [
      { kind: 'source', label: 'Source Code', url: 'https://github.com/Coralise/TikTok-Wordle' },
    ],
    media: [
      { type: 'image', src: '/images/ttw/ttw.png' },
      { type: 'image', src: '/images/ttw/ttw2.png' },
    ],
  },
  {
    slug: 'mandog-driving',
    title: 'Mandog Driving',
    tagline: "Driver's license exam reviewer for Japan",
    category: 'Web App',
    period: { start: 'March 2024', end: 'March 2024' },
    summary:
      "An online platform that helps users prepare for Japan's driver's license exam, with interactive practice tests, instant feedback and cloud-synced progress.",
    features: [
      'Interactive practice tests',
      'Instant answer feedback',
      'Cloud-synced progress via Firebase',
    ],
    learnings: [
      'Building cross-platform applications with Flutter',
      'Integrating Google Firebase for real-time data storage',
      'Designing interactive practice tests with instant feedback',
      'Optimizing mobile interfaces for educational tools',
    ],
    tech: [
      { icon: 'flutter', name: 'Flutter' },
      { icon: 'dart', name: 'Dart' },
      { icon: 'googlefirebase', name: 'Google Firebase' },
    ],
    links: [
      { kind: 'website', label: 'Visit Website', url: 'https://mandog-driving.web.app/' },
    ],
    media: [
      { type: 'image', src: '/images/mandog-driving/g1.png' },
      { type: 'image', src: '/images/mandog-driving/g2.png' },
      { type: 'image', src: '/images/mandog-driving/g3.png' },
      { type: 'image', src: '/images/mandog-driving/g4.png' },
      { type: 'image', src: '/images/mandog-driving/g5.png' },
      { type: 'image', src: '/images/mandog-driving/g6.png' },
      { type: 'image', src: '/images/mandog-driving/g7.png' },
      { type: 'image', src: '/images/mandog-driving/g8.png' },
    ],
  },
  {
    slug: 'mystore',
    title: 'MyStore',
    tagline: 'Sari-sari store mobile point-of-sale and inventory system',
    category: 'Mobile App',
    period: { start: 'November 2022', end: 'December 2023' },
    summary:
      'A mobile POS and inventory system tailored for sari-sari (local convenience) store owners. It streamlines stock management and uses OCR to automate receipt scanning.',
    features: [
      'Point-of-sale and inventory tracking',
      'OCR receipt scanning',
      'Fully offline with SQLite',
    ],
    learnings: [
      'Developing mobile applications with Flutter',
      'Implementing OCR for receipt scanning and automation',
      'Managing offline data storage with SQLite',
      'Creating user-friendly interfaces for small business owners',
    ],
    tech: [
      { icon: 'flutter', name: 'Flutter' },
      { icon: 'dart', name: 'Dart' },
      { icon: 'sqlite', name: 'SQLite' },
      { icon: 'ocr', name: 'OCR' },
    ],
    links: [],
    media: [
      { type: 'image', src: '/images/mystore/mystore.png' },
      { type: 'image', src: '/images/mystore/1.png' },
      { type: 'image', src: '/images/mystore/2.png' },
      { type: 'image', src: '/images/mystore/3.png' },
      { type: 'image', src: '/images/mystore/4.png' },
      { type: 'image', src: '/images/mystore/5.png' },
      { type: 'image', src: '/images/mystore/6.png' },
      { type: 'image', src: '/images/mystore/7.png' },
      { type: 'image', src: '/images/mystore/8.png' },
    ],
  },
  {
    slug: 'ui-jobs',
    title: 'UI Jobs',
    tagline: 'Interactive jobs economy plugin for Minecraft',
    category: 'Plugin',
    period: { start: 'February 2022', end: 'March 2022' },
    summary:
      'A Minecraft plugin that reworks in-game economies with interactive jobs and anti-cheat measures — fair and engaging for players, simple to manage for server admins.',
    features: [
      'Interactive job system with rewards',
      'Anti-cheat measures for fair play',
      'Configurable jobs for diverse gameplay',
      'MySQL or SQLite storage',
    ],
    learnings: [
      'Designing interactive job systems with rewards',
      'Implementing anti-cheat mechanisms for fair play',
      'Integrating MySQL and SQLite for flexible data storage',
      'Strengthening Java skills for game plugins',
    ],
    tech: [
      { icon: 'java', name: 'Java' },
      { icon: 'mysql', name: 'MySQL' },
      { icon: 'sqlite', name: 'SQLite' },
    ],
    links: [
      { kind: 'source', label: 'Source Code', url: 'https://github.com/Coralise/UI-Jobs' },
    ],
    media: [
      { type: 'image', src: '/images/uij/uij.png' },
      { type: 'image', src: '/images/uij/uij1.gif' },
      { type: 'image', src: '/images/uij/uij2.gif' },
      { type: 'image', src: '/images/uij/uij3.gif' },
      { type: 'image', src: '/images/uij/uij4.gif' },
      { type: 'image', src: '/images/uij/uij5.gif' },
      { type: 'image', src: '/images/uij/uij6.gif' },
    ],
  },
]

/** Accent colour per category, used for pills, tags and hover glows. */
export const categoryColors: Record<ProjectCategory, string> = {
  'Web App': '#ff3b3f',
  Game: '#ff3b3f',
  Plugin: '#ff3b3f',
  'Mobile App': '#ff3b3f',
  Systems: '#ff3b3f',
}

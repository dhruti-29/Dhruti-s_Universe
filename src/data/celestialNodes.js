/**
 * Configuration for the celestial navigation nodes in
 * "DHRUTI — The Living Intelligence Universe".
 * The Projects node is strictly locked to protect confidential in-progress work.
 */
export const CELESTIAL_NODES = [
  {
    id: 'about',
    title: 'About',
    color: '#38bdf8', // Cyan
    position: [-2.7, 0.9, 0.8],
    description: 'Background, personal direction, and the living intelligence philosophy.',
    locked: false,
  },
  {
    id: 'skills',
    title: 'Skills',
    color: '#818cf8', // Indigo/Violet
    position: [2.5, 1.2, -0.6],
    description: 'Core computer science capabilities and technical proficiencies.',
    locked: false,
  },
  {
    id: 'journey',
    title: 'Journey',
    fullTitle: 'Learning Journey',
    color: '#c084fc', // Lavender / Purple Starlight
    position: [-0.7, 2.1, 1.8],
    description: 'Foundations in C/C++, web standards, introductory Java, and active learning in DSA & Python.',
    locked: false,
  },
  {
    id: 'achievements',
    title: 'Achievements',
    color: '#f59e0b', // Amber Starlight
    position: [-1.3, -1.9, 1.7],
    description: 'Academic highlights and verified milestones.',
    locked: false,
  },
  {
    id: 'contact',
    title: 'Contact',
    color: '#34d399', // Emerald
    position: [2.2, -1.5, 1.2],
    description: 'Transmission channels and direct communication.',
    locked: false,
  },
  {
    id: 'projects',
    title: 'Projects',
    color: '#94a3b8', // Slate (locked)
    position: [0.3, 2.8, -0.5],
    description: 'Confidential engineering experiments. Kept private until ready.',
    locked: true,
  },
]

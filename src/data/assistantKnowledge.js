/**
 * Predefined Knowledge Base for "Ask Dhruti's Universe"
 *
 * Strict Rules:
 * 1. 100% local predefined structured Q&A. Zero external AI APIs, backends, or paid services.
 * 2. Only contains verified, authorized information confirmed by Dhruti.
 * 3. Never invents job titles, years, or exaggerated achievements.
 * 4. Strictly protects project privacy: zero project names, repos, or details.
 * 5. Returns question-specific structured data models for crisp, human-like responses.
 */

export const ASSISTANT_WELCOME = {
  greeting: 'Hey, cosmic explorer! What would you like to discover about Dhruti?',
  subtext: 'I am your cosmic guide through Dhruti’s Living Intelligence Universe. Choose a suggested inquiry or type your message!',
}

export const CONFIRMED_DATA = {
  education: {
    degree: 'B.Tech in Computer Science and Engineering (CSE)',
    status: 'Current Student',
    tagline: 'ALWAYS IN PROGRESS',
    detail:
      'Currently pursuing her undergraduate degree in Computer Science and Engineering, focusing on core programming foundations, algorithmic thinking, and practical implementation.',
  },

  skillsCompleted: [
    { name: 'C', status: 'Completed', detail: 'Procedural programming, memory principles, and pointers' },
    { name: 'C++', status: 'Completed', detail: 'Object-oriented programming and STL problem solving' },
    { name: 'HTML', status: 'Completed', detail: 'Semantic document structure and web accessibility standards' },
    { name: 'CSS', status: 'Completed', detail: 'Modern layouts, Flexbox, Grid, and responsive styling' },
    { name: 'Java', status: 'Basic Introduction', detail: 'Introductory OOP concepts and standard syntax' },
  ],

  skillsLearning: [
    { name: 'Data Structures & Algorithms (DSA)', status: 'Ongoing', detail: 'Linear and non-linear data structures, searching, sorting, and algorithmic problem solving' },
    { name: 'Python', status: 'Ongoing', detail: 'Language fundamentals, computational logic, syntax exercises, and scripting' },
    { name: 'JavaScript', status: 'Ongoing', detail: 'Modern ES6+ syntax, asynchronous programming, DOM interactions, and modular dynamic logic' },
  ],

  achievements: [
    {
      title: 'CodeAlpha C Programming Internship',
      status: 'Completed',
      detail: 'Completed structured C programming internship focusing on practical coding and problem solving.',
    },
    {
      title: 'HackerRank Problem Solving',
      status: 'C++ 5-Star & C 4-Star',
      detail: 'Demonstrated consistent algorithmic practice and language proficiency on HackerRank.',
    },
    {
      title: 'SSIP Project Selection',
      status: 'Gujarat State Level Selection',
      detail: 'Project selected at the Gujarat State Level under the Student Startup & Innovation Policy.',
    },
    {
      title: 'Smart India Hackathon (SIH)',
      status: '1st & 2nd Year Selections',
      detail: 'College internal round selection in first year; University-level selection in second year.',
    },
    {
      title: 'Coursera Academic Coursework',
      status: 'Certified Coursework',
      detail: 'Completed certified academic coursework covering C++, Java, and Data Structures & Algorithms.',
    },
  ],

  journeyStages: [
    {
      step: '01',
      title: 'Core Programming Foundations',
      status: 'Completed',
      detail: 'Built strong foundations in C and C++, understanding memory principles, pointers, and object-oriented programming.',
    },
    {
      step: '02',
      title: 'Web Standards & Language Basics',
      status: 'Completed / Basic',
      detail: 'Explored web markup in semantic HTML, modern responsive CSS, and received an early introduction to Java.',
    },
    {
      step: '03',
      title: 'Active Growth & Modern Implementations',
      status: 'Ongoing / Learning',
      detail: 'Actively studying Data Structures & Algorithms (DSA), scripting with Python, and practicing JavaScript.',
    },
    {
      step: '04',
      title: 'Personal Evolution & Daily Orbit',
      status: 'Daily Orbit',
      detail: 'Improving every day, trying new implementations, helping people, and building an authentic identity in tech.',
    },
  ],

  interests: [
    'Learning and exploring technology with relentless curiosity.',
    'Trying new implementations and transforming theoretical ideas into functional code.',
    'Helping people, collaborating with peers, and sharing knowledge.',
    'Working on self-improvement, healthy daily habits, and steady personal growth.',
  ],

  careerPhilosophy: [
    'Working on myself and improving every single day.',
    'Building a genuine, meaningful identity in the technology landscape.',
    'Exploring different areas of computer science to discover where curiosity and skills align best.',
    'Working toward a balanced, fulfilling lifestyle while continuing steady growth.',
  ],

  contactChannels: [
    {
      platform: 'Email',
      label: 'dhrutiviradiya333@gmail.com',
      url: 'mailto:dhrutiviradiya333@gmail.com',
      badge: 'Primary Channel',
    },
    {
      platform: 'LinkedIn',
      label: 'dhruti-viradiya',
      url: 'https://www.linkedin.com/in/dhruti-viradiya-18b023377',
      badge: 'Professional Network',
    },
    {
      platform: 'GitHub',
      label: 'dhruti-29',
      url: 'https://github.com/dhruti-29',
      badge: 'Code & Profile',
    },
    {
      platform: 'Instagram',
      label: '@dhruti__33',
      url: 'https://www.instagram.com/dhruti__33?stkn=MXQ5ejI1b2d1dDZxOQ==',
      badge: 'Social',
    },
  ],
}

export const SUGGESTED_QUESTIONS = [
  {
    id: 'skills_completed',
    question: 'What skills does Dhruti know?',
    shortLabel: 'Known Skills',
  },
  {
    id: 'skills_learning',
    question: 'What is she learning now?',
    shortLabel: 'Learning Now',
  },
  {
    id: 'achievements',
    question: 'Tell me about her achievements.',
    shortLabel: 'Achievements',
  },
  {
    id: 'education',
    question: 'What is Dhruti studying?',
    shortLabel: 'Education',
  },
  {
    id: 'interests',
    question: 'What does she enjoy?',
    shortLabel: 'Interests',
  },
  {
    id: 'career',
    question: 'What is her career direction?',
    shortLabel: 'Career Direction',
  },
  {
    id: 'contact',
    question: 'How can I contact her?',
    shortLabel: 'Contact',
  },
]

/**
 * Normalize input string for safe, robust intent matching
 */
export function normalizeText(text) {
  if (!text || typeof text !== 'string') return ''
  return text
    .toLowerCase()
    .trim()
    .replace(/[’']/g, "'")
    .replace(/what's/g, 'what is')
    .replace(/she's/g, 'she is')
    .replace(/how's/g, 'how is')
    .replace(/i'm/g, 'i am')
    .replace(/[?!.,;:"()[\]{}]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Match user query with context-awareness and human conversational responses
 * @param {string} userQuery
 * @param {string|null} lastIntent
 * @returns {object} Structured response payload
 */
export function findAssistantAnswer(userQuery, lastIntent = null) {
  const norm = normalizeText(userQuery)

  if (!norm) {
    return {
      type: 'conversational',
      intent: 'empty',
      text: 'I’m here to help you explore Dhruti’s universe! Feel free to ask about her skills, achievements, education, or contact details.',
    }
  }

  // 1. GREETINGS
  const greetingWords = ['hello', 'hi', 'hey', 'good morning', 'good evening', 'good afternoon', 'greetings', 'howdy']
  if (greetingWords.some((w) => norm === w || norm.startsWith(w + ' '))) {
    const greetings = [
      'Hello, explorer! ✨ What would you like to discover about Dhruti today?',
      'Hey there! 🌌 I can guide you through Dhruti’s skills, journey, education, and achievements.',
      'Hello! Welcome to Dhruti’s universe. Feel free to ask any question or select a topic above.',
    ]
    return {
      type: 'conversational',
      intent: 'greetings',
      text: greetings[Math.floor(Math.random() * greetings.length)],
    }
  }

  // 2. COMPLIMENTS & POSITIVE FEEDBACK
  if (
    norm.includes('i liked this') ||
    norm.includes('i like this') ||
    norm === 'liked this' ||
    norm.includes('this is nice')
  ) {
    return {
      type: 'conversational',
      intent: 'compliments',
      text: 'Thank you! ✨ I’m glad you enjoyed exploring Dhruti’s universe.',
    }
  }

  if (
    norm.includes('this is beautiful') ||
    norm.includes('looks beautiful') ||
    norm.includes('so beautiful') ||
    norm.includes('very beautiful')
  ) {
    return {
      type: 'conversational',
      intent: 'compliments',
      text: 'Thank you! 🌌 The universe is designed to make exploring Dhruti’s journey a little more memorable.',
    }
  }

  if (
    norm.includes('nice portfolio') ||
    norm.includes('great portfolio') ||
    norm.includes('good portfolio') ||
    norm.includes('great work') ||
    norm.includes('awesome portfolio') ||
    norm.includes('love this') ||
    norm.includes('well done')
  ) {
    return {
      type: 'conversational',
      intent: 'compliments',
      text: 'Thank you! Dhruti built this celestial universe to share her learning path honestly and transparently.',
    }
  }

  if (norm.includes('that sounds interesting') || norm.includes('sounds interesting') || norm.includes('very interesting')) {
    return {
      type: 'conversational',
      intent: 'compliments',
      text: 'It really is! Dhruti loves exploring new implementations and turning theoretical ideas into working code.',
    }
  }

  // 3. ACKNOWLEDGMENTS / THANKS
  if (
    norm === 'thank you' ||
    norm === 'thanks' ||
    norm === 'thank u' ||
    norm.startsWith('thank you') ||
    norm.startsWith('thanks') ||
    norm.includes('appreciate it')
  ) {
    const thanksReplies = [
      'You’re welcome! Keep exploring ✨',
      'Glad to help! Feel free to ask anything else about Dhruti’s journey.',
      'You’re very welcome! Enjoy your cosmic voyage through her universe.',
    ]
    return {
      type: 'conversational',
      intent: 'acknowledgments',
      text: thanksReplies[Math.floor(Math.random() * thanksReplies.length)],
    }
  }

  // 4. CONTEXTUAL FOLLOW-UPS
  if (
    norm === 'tell me more' ||
    norm === 'tell me more about that' ||
    norm === 'explain that' ||
    norm === 'explain more' ||
    norm === 'more details' ||
    norm === 'can you explain that' ||
    norm.startsWith('tell me more')
  ) {
    if (lastIntent === 'skills_completed' || lastIntent === 'skills_learning' || lastIntent === 'skills_all') {
      return {
        type: 'conversational',
        intent: 'follow_up_skills',
        text: 'Dhruti focuses deeply on computer science principles: in C and C++, she practiced manual memory management, pointers, and OOP problem solving; in web standards, semantic markup and layouts; and in DSA, she is actively working on searching, sorting, and algorithmic efficiency.',
      }
    }
    if (lastIntent === 'achievements') {
      return {
        type: 'conversational',
        intent: 'follow_up_achievements',
        text: 'Among her achievements, her project selection at the Gujarat State Level under SSIP and her 1st and 2nd year selections in Smart India Hackathon highlight her collaborative problem-solving drive, complemented by 5-star C++ recognition on HackerRank.',
      }
    }
    if (lastIntent === 'journey') {
      return {
        type: 'conversational',
        intent: 'follow_up_journey',
        text: 'Her journey moves step by step: starting with procedural languages like C to master hardware-near fundamentals, expanding into modern languages, and maintaining daily habits of self-improvement and practical coding.',
      }
    }
    if (lastIntent === 'education') {
      return {
        type: 'conversational',
        intent: 'follow_up_education',
        text: 'As a B.Tech CSE student, she combines rigorous university curriculum with independent projects, practicing algorithms, exploring intelligent systems, and learning new tools every day.',
      }
    }
    if (lastIntent === 'interests' || lastIntent === 'career') {
      return {
        type: 'conversational',
        intent: 'follow_up_philosophy',
        text: 'Dhruti’s guiding philosophy is that small, disciplined daily orbits create vast astronomical progress over time. She values helping others and staying curious above all.',
      }
    }
    return {
      type: 'conversational',
      intent: 'clarification',
      text: 'What topic would you like to explore deeper—her technical skills, learning journey, education, or achievements?',
    }
  }

  if (norm === 'why' || norm === 'why is that' || norm === 'why so') {
    if (lastIntent === 'skills_completed' || lastIntent === 'journey') {
      return {
        type: 'conversational',
        intent: 'follow_up_why',
        text: 'Dhruti believes in building solid foundations first with C and C++ before branching into higher-level abstractions, ensuring she truly understands how memory and data structures work.',
      }
    }
    if (lastIntent === 'projects') {
      return {
        type: 'conversational',
        intent: 'follow_up_why',
        text: 'Her projects are kept private during active development on GitHub so they can be thoroughly tested, refined, and authentic before being shared publicly.',
      }
    }
    if (lastIntent === 'career' || lastIntent === 'interests') {
      return {
        type: 'conversational',
        intent: 'follow_up_why',
        text: 'She prefers steady daily self-improvement and genuine curiosity, letting her hands-on practice shape her career path naturally rather than adopting predefined titles.',
      }
    }
    return {
      type: 'conversational',
      intent: 'follow_up_why',
      text: 'Dhruti is driven by curiosity, steady daily learning, and a desire to build a meaningful, helpful identity in technology.',
    }
  }

  if (
    norm.includes('what about her other skills') ||
    norm.includes('what other skills') ||
    norm.includes('other skills')
  ) {
    if (lastIntent === 'skills_completed') {
      return {
        type: 'skills_learning',
        intent: 'skills_learning',
        intro: 'Beyond her completed foundations, Dhruti is actively learning and practicing these skills:',
        items: CONFIRMED_DATA.skillsLearning,
        note: 'These represent her active, day-to-day study areas.',
      }
    }
    return {
      type: 'skills_completed',
      intent: 'skills_completed',
      intro: 'Dhruti’s completed foundational skills include:',
      items: CONFIRMED_DATA.skillsCompleted,
      note: 'All skills are listed with honest learning statuses.',
    }
  }

  // 5. LOCKED PROJECTS
  if (
    norm.includes('project') ||
    norm.includes('repo') ||
    norm.includes('repository') ||
    norm.includes('what has she built') ||
    norm.includes('what has she made')
  ) {
    return {
      type: 'projects',
      intent: 'projects',
      intro: 'This part of Dhruti’s universe is currently locked.',
      note: 'Dhruti’s projects are currently under active private development on GitHub and remain strictly confidential until public release. Check back when it becomes available!',
      github: {
        label: 'Explore GitHub Profile (dhruti-29)',
        url: 'https://github.com/dhruti-29',
      },
    }
  }

  // 6. SKILLS: DISTINGUISH COMPLETED VS ONGOING
  const hasKnowWord = norm.includes('know') || norm.includes('known') || norm.includes('completed') || norm.includes('finished')
  const hasLearningNow = norm.includes('learning now') || norm.includes('currently learning') || norm.includes('practicing') || (norm.includes('learning') && norm.includes('now'))

  if (hasLearningNow) {
    return {
      type: 'skills_learning',
      intent: 'skills_learning',
      intro: 'Dhruti is currently learning and practicing these active skills:',
      items: CONFIRMED_DATA.skillsLearning,
      note: 'These represent her current hands-on practice areas.',
    }
  }

  if (hasKnowWord && (norm.includes('skill') || norm.includes('language') || norm.includes('what does she know') || norm.includes('what skills does dhruti know'))) {
    return {
      type: 'skills_completed',
      intent: 'skills_completed',
      intro: 'Dhruti has completed foundational learning in these skills:',
      items: CONFIRMED_DATA.skillsCompleted,
      note: 'All skills are presented with verified, honest statuses.',
    }
  }

  if (
    norm.includes('skill') ||
    norm.includes('skills') ||
    norm.includes('tech stack') ||
    norm.includes('coding languages') ||
    norm.includes('programming languages')
  ) {
    return {
      type: 'skills_all',
      intent: 'skills_all',
      intro: 'Dhruti’s skills are organized by verified learning stage:',
      completed: CONFIRMED_DATA.skillsCompleted,
      learning: CONFIRMED_DATA.skillsLearning,
      note: 'Honest learning stages. No arbitrary percentages, ratings, or expert claims.',
    }
  }

  // 7. ACHIEVEMENTS
  if (
    norm.includes('achievement') ||
    norm.includes('achievements') ||
    norm.includes('milestone') ||
    norm.includes('accomplish') ||
    norm.includes('hackerrank') ||
    norm.includes('codealpha') ||
    norm.includes('ssip') ||
    norm.includes('sih') ||
    norm.includes('hackathon') ||
    norm.includes('coursera')
  ) {
    return {
      type: 'achievements',
      intent: 'achievements',
      intro: 'Here are Dhruti’s confirmed academic milestones and competitive problem-solving highlights:',
      items: CONFIRMED_DATA.achievements,
    }
  }

  // 8. EDUCATION
  if (
    norm.includes('study') ||
    norm.includes('studying') ||
    norm.includes('education') ||
    norm.includes('degree') ||
    norm.includes('college') ||
    norm.includes('university') ||
    norm.includes('btech') ||
    norm.includes('cse') ||
    norm.includes('academic') ||
    norm.includes('student')
  ) {
    return {
      type: 'education',
      intent: 'education',
      intro: 'Dhruti is currently pursuing her undergraduate engineering studies:',
      degree: CONFIRMED_DATA.education.degree,
      status: CONFIRMED_DATA.education.status,
      tagline: CONFIRMED_DATA.education.tagline,
      detail: CONFIRMED_DATA.education.detail,
    }
  }

  // 9. LEARNING JOURNEY
  if (
    norm.includes('journey') ||
    norm.includes('timeline') ||
    norm.includes('evolution') ||
    norm.includes('learning path') ||
    norm.includes('how did she learn') ||
    norm.includes('roadmap')
  ) {
    return {
      type: 'journey',
      intent: 'journey',
      intro: 'Here is Dhruti’s chronological learning path and technical progression:',
      steps: CONFIRMED_DATA.journeyStages,
    }
  }

  // 10. CONTACT
  if (
    norm.includes('contact') ||
    norm.includes('email') ||
    norm.includes('reach') ||
    norm.includes('touch') ||
    norm.includes('message') ||
    norm.includes('linkedin') ||
    norm.includes('instagram') ||
    norm.includes('connect') ||
    norm.includes('social')
  ) {
    return {
      type: 'contact',
      intent: 'contact',
      intro: 'You can connect with Dhruti through these verified communication channels:',
      channels: CONFIRMED_DATA.contactChannels,
    }
  }

  // 11. INTERESTS / WHAT SHE ENJOYS
  if (
    norm.includes('enjoy') ||
    norm.includes('enjoys') ||
    norm.includes('interest') ||
    norm.includes('interests') ||
    norm.includes('hobby') ||
    norm.includes('hobbies') ||
    norm.includes('what does she like') ||
    norm.includes('passion')
  ) {
    return {
      type: 'interests',
      intent: 'interests',
      intro: 'Dhruti genuinely enjoys several key activities and values in technology:',
      points: CONFIRMED_DATA.interests,
    }
  }

  // 12. CAREER DIRECTION & PHILOSOPHY
  if (
    norm.includes('career') ||
    norm.includes('goal') ||
    norm.includes('goals') ||
    norm.includes('aim') ||
    norm.includes('future') ||
    norm.includes('aspire') ||
    norm.includes('aspiration') ||
    norm.includes('direction') ||
    norm.includes('job title') ||
    norm.includes('what does she want to become')
  ) {
    return {
      type: 'career',
      intent: 'career',
      intro: 'Dhruti’s personal direction and philosophy in tech:',
      points: CONFIRMED_DATA.careerPhilosophy,
      note: 'She is exploring technology with an open mind rather than pursuing a fixed job title.',
    }
  }

  // 13. AMBIGUOUS QUERIES
  const ambiguousQueries = ['dhruti', 'who is dhruti', 'about', 'tell me', 'information', 'who are you', 'what is this']
  if (ambiguousQueries.includes(norm) || norm.length < 4) {
    return {
      type: 'conversational',
      intent: 'ambiguous',
      text: 'I’m happy to guide you! Would you like to know about Dhruti’s technical skills, education, learning journey, achievements, or contact channels?',
    }
  }

  // 14. HONEST FALLBACK FOR OUTSIDE / UNSUPPORTED DATA
  return {
    type: 'unsupported',
    intent: 'unsupported',
    text: 'I don’t have that information in Dhruti’s portfolio yet. You can ask me about her skills, education, achievements, learning journey, or contact details.',
    suggestions: [
      'Known Skills',
      'Learning Now',
      'Achievements',
      'Education',
      'Contact',
    ],
  }
}

/**
 * Authentic Portfolio Data
 * “DHRUTI — The Living Intelligence Universe”
 *
 * Centralized, structured content for About, Skills, Achievements, and Contact.
 * Follows strict authenticity guidelines: zero invented dates, zero fake ratings/percentages,
 * zero simulated project links, and strict confidentiality for ongoing projects.
 */

export const PERSONAL_INFO = {
  name: 'Dhruti',
  education: 'B.Tech CSE Student',
  tagline: 'ALWAYS IN PROGRESS',
  email: 'dhrutiviradiya333@gmail.com',
  socialLinks: {
    github: 'https://github.com/dhruti-29',
    linkedIn: 'https://www.linkedin.com/in/dhruti-viradiya-18b023377',
    instagram: 'https://www.instagram.com/dhruti__33?stkn=MXQ5ejI1b2d1dDZxOQ==',
  },
  hasPhoto: false, // Professional photo placeholder active
  photoPlaceholderText: 'Professional photo coming soon',
  hasResume: false, // Resume completely absent until real resume is provided
}

export const ABOUT_CONTENT = {
  heading: 'About Me',
  subheading: 'Personal Direction & Learning Journey',
  paragraphs: [
    'I am Dhruti, a B.Tech Computer Science and Engineering student. I am working on myself and improving every day, approaching life and learning with an open mind and steady discipline.',
    'I genuinely enjoy learning and exploring technology. I like trying new implementations and applying what I learn, turning theoretical ideas into hands-on experiments and functional code.',
    'I like helping people whenever I can. I want to build a meaningful identity in tech while working toward a good lifestyle and continuing to grow step by step.',
  ],
  coreDirection: [
    {
      title: 'Self-Improvement',
      description: 'Working on myself and improving every day through consistent learning and positive daily habits.',
    },
    {
      title: 'Exploring Technology',
      description: 'Learning with curiosity, trying new implementations, and actively applying knowledge.',
    },
    {
      title: 'Helping People',
      description: 'Supporting peers, sharing understanding, and making a helpful contribution wherever possible.',
    },
    {
      title: 'Meaningful Identity',
      description: 'Building a genuine presence in tech while working toward a balanced, fulfilling lifestyle.',
    },
  ],
}

export const SKILLS_CONTENT = {
  heading: 'Skills & Knowledge Areas',
  subheading: 'Honest Status & In-Progress Learning',
  note: 'All skills are presented with honest status labels. No arbitrary percentages, ratings, progress bars, or expert claims.',
  categories: [
    {
      id: 'completed',
      name: 'COMPLETED',
      description: 'Core programming foundations, web markup, styling, and introductory language knowledge.',
      skills: [
        {
          id: 'c',
          name: 'C',
          status: 'Completed',
          statusType: 'completed',
          domain: 'Procedural Programming & Systems',
          description: 'Memory management, pointers, foundational algorithms, and structured procedural coding.',
        },
        {
          id: 'cpp',
          name: 'C++',
          status: 'Completed',
          statusType: 'completed',
          domain: 'Object-Oriented Programming',
          description: 'OOP principles, STL standard libraries, templates, and problem-solving practice.',
        },
        {
          id: 'html',
          name: 'HTML',
          status: 'Completed',
          statusType: 'completed',
          domain: 'Web Foundations',
          description: 'Semantic document structure, clean page markup, and web accessibility standards.',
        },
        {
          id: 'css',
          name: 'CSS',
          status: 'Completed',
          statusType: 'completed',
          domain: 'Styling & Layouts',
          description: 'Modern CSS, responsive layouts, Flexbox, Grid systems, and cosmic design styling.',
        },
        {
          id: 'java',
          name: 'Java',
          status: 'Basic Introduction',
          statusType: 'basic',
          domain: 'Core Languages',
          description: 'Basic introductory knowledge, standard syntax, and foundational object-oriented concepts.',
        },
      ],
    },
    {
      id: 'ongoing-learning',
      name: 'ONGOING / CURRENTLY LEARNING',
      description: 'Active study areas, data structures, scripting, and continuous skill development.',
      skills: [
        {
          id: 'dsa',
          name: 'Data Structures and Algorithms (DSA)',
          status: 'Ongoing',
          statusType: 'ongoing',
          domain: 'Core Computer Science',
          description: 'Linear & non-linear data structures, searching, sorting, and algorithmic problem solving.',
        },
        {
          id: 'python',
          name: 'Python',
          status: 'Ongoing',
          statusType: 'ongoing',
          domain: 'Scripting & Intelligent Systems',
          description: 'Language fundamentals, data processing, syntax exercises, and practical problem-solving.',
        },
        {
          id: 'javascript',
          name: 'JavaScript',
          status: 'Ongoing',
          statusType: 'ongoing',
          domain: 'Client-Side Scripting',
          description: 'ES6+ syntax, asynchronous programming, DOM interactions, and modular dynamic logic.',
        },
      ],
    },
  ],
}

export const LEARNING_JOURNEY_CONTENT = {
  heading: 'Learning Journey',
  subheading: 'Continuous Evolution, Foundations & Everyday Growth',
  quote: 'Always in progress: building foundational strength, exploring technologies, and improving step by step.',
  overview:
    'My journey in computer science is driven by steady daily effort, curiosity, and practical implementation. From core procedural fundamentals to intelligent algorithms and modern web technologies, each phase builds upon the last.',
  milestones: [
    {
      stage: '01',
      title: 'Core Programming Foundations',
      status: 'Completed',
      statusType: 'completed',
      summary: 'Solid foundations built in C and C++',
      description:
        'Established core computer science fundamentals through C and C++, focusing on memory principles, pointers, structured procedural logic, standard template libraries (STL), and object-oriented programming.',
      focusAreas: ['C Programming', 'C++ & OOP', 'Memory & Pointers', 'Procedural Logic'],
    },
    {
      stage: '02',
      title: 'Web Standards & Core Language Exploration',
      status: 'Completed / Basic',
      statusType: 'completed',
      summary: 'Web basics explored with HTML & CSS, early introduction to Java',
      description:
        'Explored the structure and visual styling of modern web interfaces using semantic HTML and responsive CSS layouts. Additionally received an early introduction to Java syntax and fundamental object-oriented structures.',
      focusAreas: ['Semantic HTML', 'Modern CSS Layouts', 'Java — Basic Introduction'],
    },
    {
      stage: '03',
      title: 'Active Growth & Modern Implementations',
      status: 'Ongoing / Learning',
      statusType: 'ongoing',
      summary: 'Current active focus on DSA, Python, and JavaScript',
      description:
        'Deepening problem-solving capabilities through Data Structures and Algorithms (DSA), building computational and scripting confidence with Python, and practicing dynamic client-side interactivity using modern JavaScript.',
      focusAreas: ['Data Structures & Algorithms (DSA)', 'Python Scripting', 'Modern JavaScript'],
    },
    {
      stage: '04',
      title: 'Personal Evolution & Identity in Tech',
      status: 'Daily Orbit',
      statusType: 'habit',
      summary: 'Improving every day, helping people, and exploring technology',
      description:
        'Dedicated to continuous self-improvement and learning every day. Approaching technology with curiosity, turning concepts into practical implementations, helping people along the way, and working toward a healthy, fulfilling lifestyle.',
      focusAreas: ['Daily Self-Improvement', 'Curiosity & Experimentation', 'Helping People', 'Meaningful Identity'],
    },
  ],
}

export const ACHIEVEMENTS_CONTENT = {
  heading: 'Achievements',
  subheading: 'Verified Academic Highlights & Problem Solving Milestones',
  note: 'Only confirmed milestones are displayed. No invented dates, certificate numbers, or extra achievements.',
  items: [
    {
      id: 'codealpha',
      title: 'CodeAlpha C Programming Internship',
      statusLabel: 'Completed',
      details: 'Completed structured C programming internship focusing on practical coding and problem solving.',
    },
    {
      id: 'hackerrank',
      title: 'HackerRank',
      statusLabel: 'C++ 5-star and C 4-star',
      details: 'Demonstrated consistent problem solving proficiency in C++ (5-star) and C (4-star).',
    },
    {
      id: 'ssip',
      title: 'SSIP Project',
      statusLabel: 'Selected at Gujarat State Level',
      details: 'Project selected at the Gujarat State Level under the Student Startup & Innovation Policy.',
    },
    {
      id: 'sih',
      title: 'Smart India Hackathon (SIH)',
      statusLabel: '1st & 2nd Year Selections',
      details: 'College internal round in first year; University-level selection in second year.',
    },
    {
      id: 'coursera',
      title: 'Coursera Certificates',
      statusLabel: 'Coursework in C++, Java, and DSA',
      details: 'Completed certified academic coursework covering C++, Java, and Data Structures & Algorithms.',
    },
  ],
}

export const CONTACT_CONTENT = {
  heading: 'Contact & Connect',
  subheading: 'Direct Inquiries & Verified Networks',
  email: 'dhrutiviradiya333@gmail.com',
  statement:
    'I welcome conversations regarding technology, learning opportunities, collaborative growth, or general feedback. Feel free to reach out directly via email or connect on social platforms.',
  channels: [
    {
      platform: 'Email',
      value: 'dhrutiviradiya333@gmail.com',
      href: 'mailto:dhrutiviradiya333@gmail.com',
      badge: 'Primary Channel',
      actionLabel: 'Send Email',
    },
    {
      platform: 'LinkedIn',
      value: 'dhruti-viradiya',
      href: 'https://www.linkedin.com/in/dhruti-viradiya-18b023377',
      badge: 'Professional Network',
      actionLabel: 'View Profile',
    },
    {
      platform: 'Instagram',
      value: '@dhruti__33',
      href: 'https://www.instagram.com/dhruti__33?stkn=MXQ5ejI1b2d1dDZxOQ==',
      badge: 'Social',
      actionLabel: 'View Profile',
    },
  ],
  note: 'Direct email and verified social networks are listed above. Contact messages can also be transmitted via the form above.',
}

export const PROJECTS_CONTENT = {
  heading: 'Projects',
  subheading: 'Private Development',
  isLocked: true,
  githubUrl: 'https://github.com/dhruti-29',
  githubButtonText: 'Explore My GitHub Profile',
  message: 'Projects are currently under private development and will be revealed when ready.',
  note: 'My active projects are under private development and not showcased publicly yet. You can visit my GitHub profile to connect and follow along as I progress.',
  confidentialityNotice:
    'Strict Privacy: All repositories, implementations, and demonstration materials are confidential and maintained in private repositories.',
}

export const EASTER_EGG_CONTENT = {
  title: 'Cosmic Transmission',
  subtitle: 'A subtle discovery from the celestial core',
  lines: [
    'Every star began as cosmic dust.',
    'Keep learning, keep experimenting, keep evolving.',
    'Always in progress.',
  ],
  author: '— Dhruti',
}

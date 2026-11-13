// Single source of site copy. `null` means "not confirmed yet": the UI renders a
// clearly marked placeholder instead. Never fill these with invented details.

const content = {
  name: 'Enrique Achacoso',
  shortName: 'E. Achacoso',
  avatar: { src: '/images/avatar.jpg', github: 'PacsCore' },

  navigation: [
    { label: 'Home', to: '/', end: true },
    { label: 'About', to: '/about' },
    { label: 'Work', to: '/work' },
    { label: 'Contact', to: '/contact' },
  ],

  home: {
    greeting: "Hello, I'm",
    firstName: 'Enrique',
    lastName: 'Achacoso',
    intro: 'A software engineer and creative developer who enjoys building thoughtful digital experiences.',
    currently: 'Currently building, learning, and designing.',
  },

  // Order here is the order on the page. Email renders only when `address` is set.
  socials: {
    github: { label: 'GitHub', handle: '@PacsCore', href: 'https://github.com/PacsCore' },
    x: { label: 'X', handle: '@PacsCore', href: 'https://x.com/PacsCore' },
    email: { label: 'Email', address: 'achacoso.enrique@gmail.com' },
  },

  about: {
    title: 'About',
    // EDIT ME: replace with your own words.
    intro: [
      "I'm Enrique — a student with a passion for software engineering and creative development who enjoys building thoughtful digital experiences.",
      'Most of what I make sits somewhere between code and design.',
    ],
    // EDIT ME: add files under public/images/about/ and set `src` + `alt`.
    photos: [
      { src: '/images/about/photo1.jpeg', alt: 'Photo 1', caption: 'a little bit about me' },
      { src: '/images/about/photo2.jpeg', alt: 'Photo 2', caption: 'wired in' },
      { src: '/images/about/photo3.jpeg', alt: 'Photo 3', caption: 'life outside the screen' },
    ],
    interests: [
      {
        title: 'Software engineering',
        text: 'Building things that are dependable underneath and simple on the surface.',
      },
      {
        title: 'Graphic design',
        text: 'Type, layout and composition — the small details that make something feel considered.',
      },
    ],
    // EDIT ME: real milestones only, newest first.
    timeline: [
      { year: null, title: null, text: null },
      { year: null, title: null, text: null },
      { year: null, title: null, text: null },
    ],
  },

  work: {
    title: 'Work',
    intro: 'A few things I have been building.',
    // EDIT ME: genuine details only. `href` is the live site or repository.
    projects: [
      { slug: 'swipeship', title: 'SwipeShip', description: null, role: null, stack: null, year: null, href: 'https://swipeship.vercel.app/' },
      { slug: 'daily-idea-mailer', title: 'Daily Idea Mailer', description: null, role: null, stack: null, year: null, href: 'https://github.com/PacsCore/daily-idea-mailer' },
      { slug: 'class-cloud', title: 'Class Cloud', description: null, role: null, stack: null, year: null, href: null },
      { slug: 'art-code-converter', title: 'Art Code Converter', description: null, role: null, stack: null, year: null, href: 'https://pacscore.github.io/code-art-converter/' },
      { slug: 'math-notes', title: 'Math Notes', description: null, role: null, stack: null, year: null, href: 'https://pacscore.github.io/math-notes/' },
    ],
  },

  contact: {
    title: 'Contact',
    heading: 'Say hello.',
    text: "Whether it's a project, an idea, or just a hello — I'd be glad to hear from you.",
  },

  footer: {
    note: 'Still a work in progress.',
  },

  ui: {
    navigationLabel: 'Main navigation',
    skipToContent: 'Skip to content',
    socialLinksLabel: 'Social links',
    themeToLight: 'Switch to light theme',
    themeToDark: 'Switch to dark theme',
    copyEmail: 'Copy',
    copied: 'Email copied',
    copyUnavailable: 'Copy unavailable',
  },
}

export function getProject(slug) {
  return content.work.projects.find((project) => project.slug === slug)
}

export default content

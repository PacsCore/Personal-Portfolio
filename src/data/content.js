// EDIT ME: Replace the placeholder copy below with your own text.
const content = {
  name: 'Enrique Achacoso',
  shortName: 'E. Achacoso',
  intro: 'Lorem ipsum…',
  aboutText: 'Lorem ipsum…',
  hero: {
    firstName: 'Enrique',
    lastName: 'Achacoso',
    index: '01',
    role: 'Software Engineer & Creative Developer',
    // EDIT ME: temporary intro. `emphasis` is set in the primary text color.
    intro: {
      lead: 'I build digital experiences at ',
      emphasis: 'the intersection of engineering, design',
      tail: ' and everyday curiosity.',
    },
    actions: {
      primary: { label: 'View Projects', to: '/projects' },
      secondary: { label: 'About Me', to: '/about' },
    },
    caption: 'Based in Vienna, AT',
    tags: ['Full-stack', 'AI', 'Design'],
    tagsLabel: 'Disciplines',
    code: {
      fileName: 'profile.ts',
      exportName: 'profile',
      timeZone: 'Europe/Vienna',
      value: {
        role: 'Software Engineer',
        focus: ['Engineering', 'Design'],
        location: 'Vienna, AT',
      },
    },
    // EDIT ME: hero photograph. While `src` is null the frame shows a neutral
    // stand-in. Add the file under public/images/hero/ and describe it in `alt`.
    image: {
      src: null,
      alt: '',
      position: '50% 50%',
    },
  },
  // ---- Homepage sections (M2) ----
  // `null` means "not confirmed yet": it renders as a dev-only placeholder and is
  // omitted from production builds. Never fill these with invented details.
  identity: {
    number: '02',
    label: 'Identity',
    intro: null, // EDIT ME: 2–3 sentences in your own words
    portrait: { src: null, alt: 'Portrait of Enrique Achacoso' }, // EDIT ME
    caption: 'Portrait — E. Achacoso',
    facts: [
      { term: 'Name', value: 'Enrique Achacoso' },
      { term: 'Role', value: 'Software Engineer & Creative Developer' },
      { term: 'Based', value: 'Vienna, AT' },
      { term: 'Focus', value: 'Engineering, Design' },
    ],
    link: { label: 'More about me', to: '/about' },
  },
  work: {
    number: '03',
    label: 'Selected work',
    allLink: { label: 'All projects', to: '/projects' },
    // EDIT ME: genuine projects only. Image: 16:10, at least 1600px wide.
    projects: [
      { title: 'SwipeShip', description: null, role: null, stack: null, year: null, href: null, image: { src: null, alt: '' } },
      { title: 'CoreBlog', description: null, role: null, stack: null, year: null, href: null, image: { src: null, alt: '' } },
    ],
  },
  process: {
    number: '04',
    label: 'Process',
    // Temporary copy, approved for now.
    steps: [
      { name: 'Observe', text: 'Understand the people, context and constraints.' },
      { name: 'Sketch', text: 'Explore directions on paper and in prototypes.' },
      { name: 'Build', text: 'Engineer it with care for detail.' },
      { name: 'Refine', text: 'Test, measure, polish.' },
      { name: 'Ship', text: 'Release, then keep learning.' },
    ],
  },
  contact: {
    number: '05',
    label: 'Contact',
    // Temporary copy, approved for now.
    heading: { lead: "Let's build something", accent: 'considered.' },
    // Email and profile URLs come from `socials` below (single source).
    profiles: ['github', 'x'],
    copyLabel: 'Copy email',
    copied: 'Email copied',
  },
  colophon: {
    label: 'Colophon',
    type: 'Set in Instrument Sans, Instrument Serif and IBM Plex Mono.',
    inksLabel: 'Two inks',
    built: 'Built with React and Vite.',
  },
  placeholders: {
    email: 'your-email@example.com',
  },
  ui: {
    navigationLabel: 'Main navigation',
    skipToContent: 'Skip to content',
    collageLabel: 'Three image placeholders',
    socialLinksLabel: 'Social links',
    technologyTagsLabel: 'Technology tags',
    projectLinkLabel: 'View',
    copySuccess: 'Copied!',
    copyUnavailable: 'Copy unavailable',
    themeToLight: 'Switch to light theme',
    themeToDark: 'Switch to dark theme',
    pageLabels: {
      about: '01 / About',
      timeline: '02 / Timeline',
      work: '03 / Work',
      projects: '01 / Work',
      contact: '01 / Contact',
    },
  },
  navigation: [
    { label: 'Home', to: '/', end: true },
    { label: 'About', to: '/about' },
    { label: 'Projects', to: '/projects' },
    { label: 'Contact', to: '/contact' },
  ],
  sectionTitles: {
    about: 'About',
    timeline: 'A few points in time',
    projects: 'Projects',
    selectedProjects: 'Selected projects',
    contact: 'Contact',
  },
  images: {
    collage: [
      { src: '/placeholder.svg', alt: 'About image placeholder 1' },
      { src: '/placeholder.svg', alt: 'About image placeholder 2' },
      { src: '/placeholder.svg', alt: 'About image placeholder 3' },
    ],
  },
  timeline: [
    {
      year: 'Year',
      title: 'Timeline title',
      description: 'Lorem ipsum…',
      tone: 'mint',
    },
    {
      year: 'Year',
      title: 'Timeline title',
      description: 'Lorem ipsum…',
      tone: 'coral',
    },
    {
      year: 'Year',
      title: 'Timeline title',
      description: 'Lorem ipsum…',
      tone: 'blue',
    },
  ],
  projects: [
    {
      title: 'Project title',
      description: 'Lorem ipsum…',
      tags: ['Tech tag', 'Tech tag'],
      href: '',
    },
    {
      title: 'Project title',
      description: 'Lorem ipsum…',
      tags: ['Tech tag', 'Tech tag'],
      href: '',
    },
    {
      title: 'Project title',
      description: 'Lorem ipsum…',
      tags: ['Tech tag', 'Tech tag'],
      href: '',
    },
  ],
  // EDIT ME: verified details only. Empty values are not rendered on the homepage.
  socials: {
    x: { href: '', label: 'X' },
    email: { address: '', label: 'Email' },
    github: { href: '', label: 'GitHub' },
    discord: {
      username: 'your-discord-username',
      label: 'Discord',
      ariaLabel: 'Copy Discord username',
    },
  },
  copyright: 'All rights reserved.',
}

export default content

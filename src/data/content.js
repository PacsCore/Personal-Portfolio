// EDIT ME: Replace the placeholder copy below with your own text.
const content = {
  name: 'Your Name',
  greeting: "Hi, I'm",
  tagline: 'Your tagline here',
  intro: 'Lorem ipsum…',
  aboutText: 'Lorem ipsum…',
  placeholders: {
    email: 'your-email@example.com',
  },
  ui: {
    navigationLabel: 'Main navigation',
    skipToContent: 'Skip to content',
    galleryLabel: 'Image gallery',
    collageLabel: 'Three image placeholders',
    socialLinksLabel: 'Social links',
    technologyTagsLabel: 'Technology tags',
    projectLinkLabel: 'View',
    copySuccess: 'Copied!',
    copyUnavailable: 'Copy unavailable',
    themeToLight: 'Switch to light theme',
    themeToDark: 'Switch to dark theme',
    pageLabels: {
      home: 'Portfolio',
      about: '01 / About',
      timeline: '02 / Timeline',
      work: '03 / Work',
      projects: '01 / Work',
      contact: '01 / Contact',
      aboutNote: 'A little more',
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
    hero: {
      src: '/placeholder.svg',
      alt: 'Hero image placeholder',
    },
    gallery: Array.from({ length: 4 }, (_, index) => ({
      src: '/placeholder.svg',
      alt: `Gallery image placeholder ${index + 1}`,
    })),
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
  // EDIT ME: Add your profile URLs, email address, and Discord username.
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

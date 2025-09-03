export type SocialLink = { label: string; href: string };
export type PortfolioData = {
  name: string;
  role: string;
  summary: string;
  skills: string[];
  email?: string;
  location?: string;
  socials: SocialLink[];
  githubUsername: string;
};

export const portfolio: PortfolioData = {
  name: 'Mearaj',
  role: 'Software Developer',
  summary:
    'Full-stack developer focused on TypeScript, React, and performant web apps. I enjoy building clean UIs and thoughtful DX.',
  skills: ['TypeScript', 'React', 'Vite', 'Material UI', 'Node.js', 'GraphQL', 'REST', 'Testing'],
  email: '', // ← optional: add your email if you want it shown (e.g. "you@domain.com")
  location: 'Remote / India',
  socials: [
    { label: 'GitHub', href: 'https://github.com/mearaj' }
    // Add more like { label: 'LinkedIn', href: 'https://linkedin.com/in/...' }
  ],
  githubUsername: 'mearaj'
};

import AboutContent from '@/components/sections/AboutContent';

export const metadata = {
  title: 'About — Jiabei Han | Finance & Computer Science',
  description:
    'Jiabei (Jacob) Han — BS Finance & Computer Science at WashU Olin Business School (May 2026). Capital Markets Summer Analyst at U.S. Bank. 4.00 GPA. NISA Investment Advisors Scholars Award, Beta Gamma Sigma. Seeking investment banking, capital markets, and corporate finance roles.',
  keywords: [
    'Jiabei Han about',
    'Jiabei Han WashU finance',
    'Jiabei Han U.S. Bank',
    'WashU finance computer science student',
    'finance computer science double major',
    'Beta Gamma Sigma WashU',
    'NISA Investment Advisors Scholars Award',
    'capital markets summer analyst',
  ],
  openGraph: {
    title: 'About Jiabei Han — Finance & Computer Science',
    description:
      'Capital Markets Summer Analyst at U.S. Bank. BS Finance & Computer Science at WashU. NISA Scholars Award · Beta Gamma Sigma. 4.00 GPA.',
  },
};

export default function AboutPage() {
  return <AboutContent />;
}

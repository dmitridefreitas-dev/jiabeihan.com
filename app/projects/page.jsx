import ProjectsContent from '@/components/sections/ProjectsContent';

export const metadata = {
  title: 'Projects & Experience — Jiabei Han | Finance & Capital Markets',
  description:
    'Finance projects and experience by Jiabei Han: U.S. Bank Capital Markets ABF deals, commercial banking underwriting, Z-Lab biophotonics ML research, WashU Racing business strategy. Excel, Python, MATLAB, Financial Modeling.',
  keywords: [
    'Jiabei Han projects',
    'Jiabei Han U.S. Bank capital markets',
    'Jiabei Han asset-based finance',
    'Jiabei Han WashU Racing',
    'capital markets analyst',
    'asset-based finance underwriting',
    'finance computer science projects',
    'biophotonics machine learning research',
    'FSAE business strategy',
    'finance student portfolio',
  ],
  openGraph: {
    title: 'Projects & Experience — Jiabei Han',
    description:
      'U.S. Bank Capital Markets ABF deals, commercial banking underwriting, Z-Lab biophotonics ML research, WashU Racing business strategy. Excel · Python · MATLAB.',
  },
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}

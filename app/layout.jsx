import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GridBackground from '@/components/effects/CosmicBackground';
import AtmosphericBlobs from '@/components/effects/AtmosphericBlobs';
import GrainOverlay from '@/components/effects/GrainOverlay';
import ClientShell from '@/components/layout/ClientShell';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata = {
  title: 'Xinshi Feng — Computer Science & Mathematics',
  description:
    'Portfolio of Xinshi Feng, double major in Computer Science and Mathematics at Washington University in St. Louis. Researcher in manifold theory, reinforcement learning, and machine learning. Available for Math PhD programs and research internships, Fall 2027.',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Xinshi Feng',
  jobTitle: 'Computer Science & Mathematics Student Researcher',
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Washington University in St. Louis' },
    { '@type': 'HighSchool', name: 'Culver Academies' },
  ],
  email: 'f.jerry@wustl.edu',
  telephone: '(949)-709-6611',
  sameAs: [
    'https://www.linkedin.com/in/xinshifeng/',
    'https://github.com/XinshiFeng',
    'https://arxiv.org/abs/2502.07537',
  ],
  knowsAbout: [
    'Differential Topology',
    'de Rham Cohomology',
    'Reinforcement Learning',
    'Machine Learning',
    'Game Theory',
    'Data Structures',
    'Algorithms',
    'Python',
    'Java',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <GridBackground />
        <AtmosphericBlobs />
        <GrainOverlay />

        <ClientShell>
          <div className="flex flex-col min-h-screen relative" style={{ zIndex: 10 }}>
            <Header />
            <main id="main-content" className="flex-grow">
              {children}
            </main>
            <Footer />
            <Toaster />
          </div>
        </ClientShell>
      </body>
    </html>
  );
}

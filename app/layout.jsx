import { Plus_Jakarta_Sans, Cormorant_Garamond, JetBrains_Mono } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AtmosphericBlobs from '@/components/effects/AtmosphericBlobs';
import ClientShell from '@/components/layout/ClientShell';

import { Toaster } from '@/components/ui/toaster';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://jiabeihan.com'),
  title: {
    default: 'Jiabei Han — Finance & Computer Science | WashU',
    template: '%s | Jiabei Han',
  },
  description:
    'Jiabei Han — Double Major in Finance and Computer Science at Washington University in St. Louis (May 2026). Capital Markets Summer Analyst at U.S. Bank Capital Markets. Software Engineering Research Assistant at Z-Lab for Biophotonics. Available for full-time roles.',
  keywords: [
    'Jiabei Han',
    'Jiabei Han U.S. Bank',
    'Jiabei Han WashU',
    'Jiabei Han finance computer science',
    'finance student',
    'Washington University in St. Louis finance',
    'WashU finance computer science',
    'U.S. Bank Capital Markets Summer Analyst 2025',
    'U.S. Bank Finance & Banking Intern',
    'Z-Lab Biophotonics Software Engineering Research Assistant',
    'capital markets analysis',
    'investment banking',
    'asset management',
    'quantitative finance',
    'financial modeling',
    'machine learning algorithms',
    'Beta Gamma Sigma WashU',
    'NISA Investment Advisors Scholars Award',
    'finance portfolio',
    'computer science portfolio',
  ],
  authors: [{ name: 'Jiabei Han', url: 'https://www.linkedin.com/in/jiabeihan12/' }],
  creator: 'Jiabei Han',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Jiabei Han — Finance & Computer Science',
    description:
      'Jiabei Han — Capital Markets Summer Analyst at U.S. Bank. Double Major in Finance and Computer Science at WashU. Software Engineering Research Assistant at Z-Lab for Biophotonics. Available for full-time roles.',
    siteName: 'Jiabei Han',
    url: 'https://jiabeihan.com',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jiabei Han — Finance & Computer Science',
    description:
      'Capital Markets Summer Analyst at U.S. Bank. Double Major in Finance and Computer Science at WashU. Software Engineering Research Assistant at Z-Lab for Biophotonics.',
    creator: '@jiabeihan',
  },
  alternates: {
    canonical: 'https://jiabeihan.com',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jiabei Han',
  givenName: 'Jiabei',
  familyName: 'Han',
  jobTitle: 'Finance and Computer Science Student & Capital Markets Summer Analyst',
  description:
    'Jiabei Han is a Finance and Computer Science student at Washington University in St. Louis, Capital Markets Summer Analyst at U.S. Bank Capital Markets, and Software Engineering Research Assistant at Z-Lab for Biophotonics. Available for full-time roles.',
  url: 'https://jiabeihan.com',
  image: 'https://jiabeihan.com/opengraph-image',
  email: 'jiabeihan01@gmail.com',
  telephone: '(314) 349-5729',
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Washington University in St. Louis',
      sameAs: 'https://wustl.edu',
    },
  ],
  worksFor: [
    {
      '@type': 'Organization',
      name: 'U.S. Bank Capital Markets',
      description: 'Capital Markets Summer Analyst 2025',
    },
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Finance and Computer Science Student',
    occupationLocation: { '@type': 'Country', name: 'United States' },
    skills:
      'Finance, Computer Science, Financial Accounting, Cash Flow Modeling, Valuation, Debt Capital Markets, Mergers and Acquisitions, Company and Industry Research, Calculus, Matrix/Linear Algebra, Probability Distributions, Multivariate Random Variables, Hypothesis Testing, Regression Analysis, Microsoft Office (Excel, PowerPoint, Word), Python, Java, Data Analytics (SQL, R), MATLAB, Machine Learning, Time Series Analysis, Data Structures, Leadership, Mentoring, Teaching, Community Outreach',
  },
  sameAs: [
    'https://www.linkedin.com/in/jiabeihan12/',
  ],
  knowsAbout: [
    'Finance',
    'Accounting',
    'Capital Markets',
    'Financial Modeling',
    'Investment Banking',
    'Asset Management',
    'Corporate Finance',
    'Machine Learning',
    'Data Analytics',
    'Valuation',
    'Mergers and Acquisitions',
    'Company and Industry Research',
    'Python',
    'Java',
    'R',
    'MATLAB',
    'Microsoft Office',
    'Leadership',
    'Mentoring',
    'Teaching',
    'Community Outreach',
  ],
  award: ['NISA Investment Advisors Scholars Award', 'Beta Gamma Sigma', 'Dean\'s List'],
  memberOf: [
    { '@type': 'Organization', name: 'NISA Investment Advisors Scholars Award' },
    { '@type': 'Organization', name: 'Beta Gamma Sigma' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${cormorant.variable} ${jetbrains.variable}`}
    >
      <head>
        {/* Dark mode: read localStorage before paint to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark');})();` }} />
        {/* Suppress Spline runtime onFrame error — patch rAF so the error never fires */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){
          var _raf = window.requestAnimationFrame;
          window.requestAnimationFrame = function(cb) {
            return _raf.call(window, function(ts) {
              try { cb(ts); } catch(e) {
                if (!e || !e.message || e.message.indexOf("reading 'position'") === -1) throw e;
              }
            });
          };
          window.onerror = function(msg,s,l,c,err) {
            var m = (err&&err.message)||msg||'';
            if (m.indexOf("reading 'position'") !== -1) return true;
          };
          window.addEventListener('error', function(e) {
            var m = (e.error&&e.error.message)||e.message||'';
            if (m.indexOf("reading 'position'") !== -1) { e.preventDefault(); e.stopImmediatePropagation(); }
          }, true);
        })();`}} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <AtmosphericBlobs />

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

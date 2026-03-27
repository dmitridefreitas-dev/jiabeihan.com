export const heroProjects = [
  {
    id: 'usbank-abf',
    title: 'U.S. Bank Asset-Based Finance',
    subtitle: 'Credit Memos · Borrowing Base Analysis · 6 Approved Deals',
    gradient: 'linear-gradient(135deg, #1e0f3a 0%, #0d0720 50%, #1e0f3a 100%)',
    image: null,
  },
  {
    id: 'usbank-cbb',
    title: 'U.S. Bank Commercial Banking',
    subtitle: '$1.2M Aerospace Credit · $30M Real Estate Underwriting',
    gradient: 'linear-gradient(135deg, #160928 0%, #08051a 50%, #160928 100%)',
    image: null,
  },
  {
    id: 'zlab-ml',
    title: 'Z-Lab Biophotonics ML Research',
    subtitle: 'Machine Learning · Cellular Pattern Detection · Python & MATLAB',
    gradient: 'linear-gradient(135deg, #0d0720 0%, #1e0f3a 50%, #0d0720 100%)',
    image: null,
  },
  {
    id: 'washu-racing',
    title: 'WashU Racing Business Strategy',
    subtitle: '$120K+ Budget · 30+ Sponsors · FSAE Competition',
    gradient: 'linear-gradient(135deg, #160928 0%, #0d0720 50%, #1e0f3a 100%)',
    image: null,
  },
];

export const featuredProjects = [
  {
    id: 'usbank-abf',
    title: 'U.S. Bank Asset-Based Finance',
    description: 'Credit memo drafting and financial modeling across 8 ABF deals in Retail, Industrials, Power & Utilities, and Energy.',
    category: 'Finance',
  },
  {
    id: 'usbank-cbb',
    title: 'U.S. Bank Commercial Banking',
    description: 'Credit product recommendations and underwriting analysis for aerospace and real estate clients.',
    category: 'Finance',
  },
  {
    id: 'zlab-ml',
    title: 'Z-Lab Biophotonics ML Research',
    description: 'Machine learning algorithms for detecting cellular movement patterns from microscopy data.',
    category: 'Research',
  },
  {
    id: 'washu-racing',
    title: 'WashU Racing Business Strategy',
    description: 'Sponsorship management, cost reporting, and FSAE business strategy competition.',
    category: 'Leadership',
  },
];

export const allProjects = [
  {
    id: 'usbank-abf',
    title: 'U.S. Bank Asset-Based Finance',
    category: 'Finance',
    date: 'Jun 2025 – Aug 2025',
    shortDescription: 'Drafted credit memos and developed financial models for 6+ approved ABF deals.',
    longDescription: 'Drafted key sections of 6 credit memos consisting of company and industry research, deal rationale, borrowing base collateral analysis, and financial analysis, leading to 6 approved ABF deals. Developed financial models using Excel to evaluate client performance across 8 ABF deals, including stress-testing client projections and analyzing borrowing base data (A/R, inventory, A/P). Pitched research and model findings to support final credit approval decisions in key industry sectors including Retail, Industrials, Power and Utilities, and Energy. Selected as semifinalist (top 20 of 120+) in firmwide AI-focused case competition.',
    tech: ['Excel', 'Financial Modeling', 'Credit Analysis', 'Borrowing Base Analysis'],
    metrics: [
      { label: 'ABF Deals Approved', value: '6' },
      { label: 'Deals Modeled', value: '8' },
      { label: 'AI Competition Rank', value: 'Top 20/120+' },
    ],
    dataSources: ['Client financials', 'Industry research', 'Borrowing base data'],
    codeLink: null,
    reportLink: null,
  },
  {
    id: 'usbank-cbb',
    title: 'U.S. Bank Commercial Banking',
    category: 'Finance',
    date: 'Jul 2024 – Aug 2024',
    shortDescription: 'Credit product recommendations for aerospace client and $30M real estate underwriting.',
    longDescription: 'Pitched credit product recommendations for aerospace client by analyzing 8 key financial statement components, allowing client to receive $1.2 million to expand manufacturing and storage facilities. Implemented case analysis for underwriting residential real estate project through financial modeling and market comps, supporting credit team\'s decision to approve $30 million loan.',
    tech: ['Excel', 'Financial Modeling', 'Market Comps', 'Credit Analysis'],
    metrics: [
      { label: 'Aerospace Credit', value: '$1.2M' },
      { label: 'Real Estate Loan', value: '$30M' },
      { label: 'Financial Components Analyzed', value: '8' },
    ],
    dataSources: ['Client financial statements', 'Market comparable data'],
    codeLink: null,
    reportLink: null,
  },
  {
    id: 'zlab-ml',
    title: 'Z-Lab Biophotonics ML Research',
    category: 'Research',
    date: 'Jun 2023 – Aug 2023',
    shortDescription: 'ML algorithms for detecting cellular movement patterns from microscopy data.',
    longDescription: 'Implemented 2 machine learning algorithms using Python and MATLAB to detect different cellular movement patterns from microscope data, resulting in discovery of 10+ new cellular structures from previous tissue samples. Prepared project advancement presentations and communicated research findings during weekly meetings with research team.',
    tech: ['Python', 'MATLAB', 'Machine Learning', 'Data Analysis'],
    metrics: [
      { label: 'ML Algorithms', value: '2' },
      { label: 'New Structures Discovered', value: '10+' },
    ],
    dataSources: ['Microscopy data', 'Tissue sample recordings'],
    codeLink: '#',
    reportLink: null,
  },
  {
    id: 'washu-racing',
    title: 'WashU Racing Business Strategy',
    category: 'Leadership',
    date: 'Sep 2022 – Present',
    shortDescription: 'Managed $120K+ sponsorship budget and led FSAE competition strategy.',
    longDescription: 'Managed sponsorship efforts by preparing marketing materials and building 30+ client relationships with external businesses, increasing team budget to over $120,000. Oversaw cost reporting for team\'s race car by collaborating with 7 internal teams to calculate transactions for 70+ race car materials, leading team to top 20 (out of 110+) placement in FSAE cost event competition. Implemented business strategy presentation for national case competition through constructing financial models and conducting industry research, leading team to top 40 (out of 110+) placement in FSAE presentation event competition.',
    tech: ['Excel', 'PowerPoint', 'Financial Modeling', 'Business Strategy'],
    metrics: [
      { label: 'Team Budget', value: '$120K+' },
      { label: 'Sponsor Relationships', value: '30+' },
      { label: 'FSAE Cost Rank', value: 'Top 20/110+' },
    ],
    dataSources: ['Sponsorship data', 'Cost reports', 'FSAE competition data'],
    codeLink: null,
    reportLink: null,
  },
];

export const projectCategories = ['All', 'Finance', 'Research', 'Leadership'];

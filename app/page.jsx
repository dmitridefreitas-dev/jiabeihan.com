import dynamic from 'next/dynamic';
const SplineHero = dynamic(() => import('@/components/sections/SplineHero'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '100vh', background: 'linear-gradient(135deg, #F0EDEA 0%, #E8E4E0 100%)' }} />
  ),
});
import InfoBanner from '@/components/sections/InfoBanner';
import AcademicTicker from '@/components/sections/FinanceTicker';
import SectionAtmosphere from '@/components/effects/SectionAtmosphere';

const KPIFullscreen = dynamic(() => import('@/components/sections/KPIFullscreen'));
const ProjectsShowcase = dynamic(() => import('@/components/sections/ProjectsShowcase'));
const DealFlowViz = dynamic(() => import('@/components/sections/DealFlowViz'));
const SkillsHorizontal = dynamic(() => import('@/components/sections/SkillsHorizontal'));
const CompetenciesSticky = dynamic(() => import('@/components/sections/CompetenciesSticky'));
const TimelineScroll = dynamic(() => import('@/components/sections/TimelineScroll'));
const CTASection = dynamic(() => import('@/components/sections/CTASection'));

export const metadata = {
  title: 'Jiabei Han — Finance & Computer Science',
  description:
    'Portfolio of Jiabei (Jacob) Han — Double Major in Finance and Computer Science at WashU Olin Business School. Capital Markets Summer Analyst at U.S. Bank. 4.00 GPA.',
};

export default function Home() {
  return (
    <>
      <SplineHero />
      <InfoBanner />
      <AcademicTicker />
      <SectionAtmosphere atmosphere="work">
        <KPIFullscreen />
      </SectionAtmosphere>
      <SectionAtmosphere atmosphere="work">
        <ProjectsShowcase />
      </SectionAtmosphere>
      <SectionAtmosphere atmosphere="work">
        <DealFlowViz />
      </SectionAtmosphere>
      <SectionAtmosphere atmosphere="skills">
        <SkillsHorizontal />
      </SectionAtmosphere>
      <SectionAtmosphere atmosphere="skills">
        <CompetenciesSticky />
      </SectionAtmosphere>
      <SectionAtmosphere atmosphere="timeline">
        <TimelineScroll />
      </SectionAtmosphere>
      <SectionAtmosphere atmosphere="cta">
        <CTASection />
      </SectionAtmosphere>
    </>
  );
}

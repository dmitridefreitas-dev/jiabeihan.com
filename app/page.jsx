import SplineHero from '@/components/sections/SplineHero';
import InfoBanner from '@/components/sections/InfoBanner';
import AcademicTicker from '@/components/sections/FinanceTicker';
import KPIFullscreen from '@/components/sections/KPIFullscreen';
import ProjectsShowcase from '@/components/sections/ProjectsShowcase';
import SkillsHorizontal from '@/components/sections/SkillsHorizontal';
import CompetenciesSticky from '@/components/sections/CompetenciesSticky';
import TimelineScroll from '@/components/sections/TimelineScroll';
import CTASection from '@/components/sections/CTASection';
import SectionAtmosphere from '@/components/effects/SectionAtmosphere';

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

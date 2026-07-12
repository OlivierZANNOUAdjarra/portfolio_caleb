import HeroSection from '@/components/HeroSection';
import StatsCounter from '@/components/StatsCounter';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import ToolsSection from '@/components/ToolsSection';
import FaqSection from '@/components/FaqSection';
import ContactSection from '@/components/ContactSection';
import CommentsSection from '@/components/CommentsSection';
import SectionDivider from '@/components/SectionDivider';
import ParallaxWrapper from '@/components/ParallaxWrapper';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <StatsCounter />
      <SectionDivider />
      <ParallaxWrapper>
        <AboutSection />
      </ParallaxWrapper>
      <SectionDivider />
      <ParallaxWrapper>
        <ServicesSection />
      </ParallaxWrapper>
      <SectionDivider />
      <ParallaxWrapper>
        <PortfolioSection />
      </ParallaxWrapper>
      <SectionDivider />
      <ParallaxWrapper>
        <ToolsSection />
      </ParallaxWrapper>
      <SectionDivider />
      <ParallaxWrapper>
        <FaqSection />
      </ParallaxWrapper>
      <SectionDivider />
      <ParallaxWrapper>
        <ContactSection />
      </ParallaxWrapper>
      <SectionDivider />
      <ParallaxWrapper>
        <CommentsSection />
      </ParallaxWrapper>
      <Footer />
    </main>
  );
}
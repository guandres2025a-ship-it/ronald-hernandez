import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import MuralesSection from '@/components/MuralesSection';
import BiografiaSection from '@/components/BiografiaSection';
import TimelineSection from '@/components/TimelineSection';

export default function Home() {
  return (
    <>
      <Hero />
      <Gallery />
      <MuralesSection />
      <BiografiaSection />
      <TimelineSection />
    </>
  );
}

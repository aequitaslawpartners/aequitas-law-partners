import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import PracticeAreas from '@/components/PracticeAreas'
import TeamSlider from '@/components/TeamSlider'
import Insights from '@/components/Insights'
import Footer from '@/components/Footer'
import Banner from '@/components/Banner'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Banner />
      <Header />
      <main>
        <Hero />
        <PracticeAreas />
        <TeamSlider />
        <Insights />
        <About />
      </main>
      <Footer />
    </div>
  );
}

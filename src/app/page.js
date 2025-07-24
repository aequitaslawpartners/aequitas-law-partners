import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import PracticeAreas from '@/components/PracticeAreas'
import Team from '@/components/Team'
import Insights from '@/components/Insights'
import Footer from '@/components/Footer'
import DisclaimerPopup from '@/components/DisclaimerPopup'
import Banner from '@/components/Banner'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <DisclaimerPopup />
      <Banner />
      <Header />
      <main>
        <Hero />
        <PracticeAreas />
        <Team />
        <Insights />
        <About />
      </main>
      <Footer />
    </div>
  );
}

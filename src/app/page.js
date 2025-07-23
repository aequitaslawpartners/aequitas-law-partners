import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import PracticeAreas from '@/components/PracticeAreas'
import Team from '@/components/Team'
import Insights from '@/components/Insights'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import DisclaimerPopup from '@/components/DisclaimerPopup'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <DisclaimerPopup />
      <Header />
      <main>
        <Hero />
        <About />
        <PracticeAreas />
        <Team />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

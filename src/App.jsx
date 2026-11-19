import { useEffect, useState } from 'react'
import { site } from './data/site.js'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Shooting from './components/Shooting.jsx'
import Reel from './components/Reel.jsx'
import CompCard from './components/CompCard.jsx'
import Booking from './components/Booking.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [solid, setSolid] = useState(false)

  // The header turns solid once the page is scrolled past the top.
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const hasReel = Boolean(site.reel.videoUrl)
  const hasCompCard = Boolean(site.compCard.pdfUrl)
  const hasBooking = Boolean(site.booking.calUrl)

  const links = [
    ['About', 'about'],
    ['Shooting', 'shooting'],
    hasReel && ['Reel', 'reel'],
    hasBooking && ['Book a call', 'book'],
    ['Contact', 'contact'],
  ].filter(Boolean)

  return (
    <>
      <Header links={links} solid={solid} />
      <main>
        <Hero />
        <About />
        <Shooting />
        {hasReel && <Reel />}
        {hasCompCard && <CompCard />}
        {hasBooking && <Booking />}
        <Contact />
      </main>
      <Footer />
    </>
  )
}

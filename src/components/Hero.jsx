import { useEffect, useState } from 'react'
import { site } from '../data/site.js'

const SLIDE_MS = 6500

export default function Hero() {
  const [index, setIndex] = useState(0)
  const slides = site.hero

  useEffect(() => {
    if (slides.length < 2) return undefined
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="hero" id="top" aria-label="Introduction">
      {slides.map((slide, i) => (
        <div key={slide.photo.src} className={`slide${i === index ? ' on' : ''}`} aria-hidden={i !== index}>
          <img
            src={slide.photo.src}
            alt={i === index ? slide.photo.alt : ''}
            style={{ objectPosition: slide.position }}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}
      <div className="wrap hero-in">
        <div className="hero-row">
          <div>
            <h1>
              {site.firstName}
              <br />
              {site.lastName}
            </h1>
            <p className="hero-sub">{site.tagline}</p>
          </div>
          {slides.length > 1 && (
            <div className="dots" role="group" aria-label="Choose photo">
              {slides.map((slide, i) => (
                <button
                  key={slide.photo.src}
                  type="button"
                  className={`dot${i === index ? ' on' : ''}`}
                  aria-label={`Photo ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

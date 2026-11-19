import { useEffect, useState } from 'react'
import { site } from '../data/site.js'
import Lightbox from './Lightbox.jsx'

// Millisecondi tra una foto e la successiva nelle copertine dei book.
const SLIDE_MS = 5000
// Ogni copertina parte con un piccolo ritardo, così non cambiano tutte insieme.
const STAGGER_MS = 1200

function BookCard({ book, delay, onOpen }) {
  const [n, setN] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = book.frames.length

  useEffect(() => {
    if (count < 2 || paused) return undefined
    let timer
    const start = setTimeout(() => {
      timer = setInterval(() => setN((v) => (v + 1) % count), SLIDE_MS)
    }, delay)
    return () => {
      clearTimeout(start)
      clearInterval(timer)
    }
  }, [count, paused, delay])

  return (
    <button
      type="button"
      className="card"
      onClick={() => onOpen(n)}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="card-ph">
        {book.frames.map((f, k) => (
          <img key={f.thumb} src={f.thumb} alt="" loading="lazy" className={k === n ? 'on' : undefined} />
        ))}
      </div>
      <div className="cap">
        <span className="cap-t">{book.title}</span>
        <span className="cap-m">{book.credit}</span>
      </div>
    </button>
  )
}

export default function Shooting() {
  const [bookIndex, setBookIndex] = useState(null)
  const [frame, setFrame] = useState(0)

  // Il book si apre sulla foto che si vedeva in quel momento nella copertina.
  const open = (i, startFrame) => {
    setFrame(startFrame)
    setBookIndex(i)
  }

  return (
    <section className="sec" id="shooting">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="label">Shooting</p>
            <h2>Books</h2>
          </div>
          <p>Selected work with photographers and brands. Open a book to see the full set.</p>
        </div>
        <div className="grid">
          {site.books.map((book, i) => (
            <BookCard
              key={book.title}
              book={book}
              delay={i * STAGGER_MS}
              onOpen={(startFrame) => open(i, startFrame)}
            />
          ))}
        </div>
      </div>
      {bookIndex !== null && (
        <Lightbox
          book={site.books[bookIndex]}
          index={frame}
          setIndex={setFrame}
          onClose={() => setBookIndex(null)}
        />
      )}
    </section>
  )
}

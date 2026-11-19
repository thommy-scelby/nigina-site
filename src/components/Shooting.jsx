import { useState } from 'react'
import { site } from '../data/site.js'
import Lightbox from './Lightbox.jsx'

export default function Shooting() {
  const [bookIndex, setBookIndex] = useState(null)
  const [frame, setFrame] = useState(0)

  const open = (i) => {
    setFrame(0)
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
            <button key={book.title} type="button" className="card" onClick={() => open(i)}>
              <div className="card-ph">
                <img src={book.frames[0].thumb} alt="" loading="lazy" />
              </div>
              <div className="cap">
                <span className="cap-t">{book.title}</span>
                <span className="cap-m">{book.credit}</span>
              </div>
            </button>
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

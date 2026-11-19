import { useEffect, useRef } from 'react'

const pad = (n) => String(n).padStart(2, '0')

export default function Lightbox({ book, index, setIndex, onClose }) {
  const total = book.frames.length
  const closeRef = useRef(null)
  const touchX = useRef(null)

  const next = () => setIndex((index + 1) % total)
  const prev = () => setIndex((index - 1 + total) % total)

  // Lock page scroll, move focus into the dialog, and give focus back on close.
  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      previousFocus?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (dx < -50) next()
    else if (dx > 50) prev()
  }

  const frame = book.frames[index]

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={`${book.title} book`}>
      <div className="wrap lb-bar">
        <span className="lb-title">{book.title}</span>
        <button type="button" className="txt-btn" ref={closeRef} onClick={onClose}>
          Close
        </button>
      </div>
      <div className="lb-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <img src={frame.src} alt={frame.alt} />
      </div>
      <div className="wrap lb-bar">
        <button type="button" className="txt-btn" onClick={prev}>
          Previous
        </button>
        <span className="lb-count">
          {pad(index + 1)} / {pad(total)}
        </span>
        <button type="button" className="txt-btn" onClick={next}>
          Next
        </button>
      </div>
    </div>
  )
}

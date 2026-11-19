import { useEffect, useState } from 'react'
import { site } from '../data/site.js'

export default function Header({ links, solid }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ block: 'start' })
  }

  const toTop = (e) => {
    e.preventDefault()
    setOpen(false)
    window.scrollTo({ top: 0 })
  }

  return (
    <>
      <header className={`hdr${solid || open ? ' solid' : ''}`}>
        <div className="wrap hdr-in">
          <a className="brand" href="#top" onClick={toTop}>
            {site.name}
          </a>
          <nav className="nav" aria-label="Main">
            {links.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={(e) => go(e, id)}>
                {label}
              </a>
            ))}
          </nav>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen(!open)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>
      {open && (
        <div id="menu" className="ovl">
          <div className="wrap">
            {links.map(([label, id]) => (
              <a key={id} className="ovl-link" href={`#${id}`} onClick={(e) => go(e, id)}>
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

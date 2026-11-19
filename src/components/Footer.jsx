import { site } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <span>
          &copy; {new Date().getFullYear()} {site.name}
        </span>
        <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      </div>
    </footer>
  )
}

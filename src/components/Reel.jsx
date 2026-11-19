import { useState } from 'react'
import { site, asset } from '../data/site.js'

const isVideoFile = (url) => /\.(mp4|webm)(\?.*)?$/i.test(url)

function Player({ url, poster }) {
  if (isVideoFile(url)) {
    return <video src={url} poster={poster} controls autoPlay playsInline />
  }
  // Vimeo or YouTube embed address.
  const src = `${url}${url.includes('?') ? '&' : '?'}autoplay=1`
  return (
    <iframe
      src={src}
      title="Reel"
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
    />
  )
}

export default function Reel() {
  const [playing, setPlaying] = useState(false)
  const { reel } = site

  return (
    <section className="sec" id="reel">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="label">Reel</p>
            <h2>In motion</h2>
          </div>
          <p>A short reel for casting directors. Walking, turning and a few expressions.</p>
        </div>
        <div className="reel">
          {playing ? (
            <Player url={asset(reel.videoUrl)} poster={reel.cover.src} />
          ) : (
            <>
              <img src={reel.cover.src} alt="Reel cover frame" style={{ objectPosition: reel.coverPosition }} />
              <button type="button" className="reel-play" aria-label="Play reel" onClick={() => setPlaying(true)} />
            </>
          )}
        </div>
        <div className="reel-meta">
          <span>Reel {new Date().getFullYear()}</span>
          <span>{reel.duration}</span>
        </div>
      </div>
    </section>
  )
}

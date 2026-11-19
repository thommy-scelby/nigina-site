import { site } from '../data/site.js'

export default function About() {
  const { about, specs } = site
  return (
    <section className="sec" id="about">
      <div className="wrap about">
        <img
          className="about-img"
          src={about.photo.src}
          alt={about.photo.alt}
          style={{ objectPosition: about.position }}
          loading="lazy"
        />
        <div>
          <p className="label">About</p>
          <h2>{about.heading}</h2>
          {about.paragraphs.map((text, i) => (
            <p key={text} className={i > 0 ? 'muted' : undefined}>
              {text}
            </p>
          ))}
          <dl className="specs">
            {specs.map(([label, value]) => (
              <div className="spec-row" key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

import { site, asset } from '../data/site.js'

export default function CompCard() {
  const { compCard, specs, name } = site
  const [main, second, third] = compCard.images
  const summary = specs
    .slice(0, 4)
    .map(([label, value]) => `${label} ${value}`)
    .join(' · ')

  return (
    <section className="sec" id="comp-card">
      <div className="wrap comp">
        <div className="cc" aria-hidden="true">
          <div className="cc-imgs">
            <img src={main.thumb} alt="" loading="lazy" />
            <img src={second.thumb} alt="" loading="lazy" />
            <img src={third.thumb} alt="" loading="lazy" />
          </div>
          <div className="cc-foot">
            <b>{name}</b>
            <span>{summary}</span>
          </div>
        </div>
        <div>
          <p className="label">Comp card</p>
          <h2>Everything on one page.</h2>
          <p>
            Download the comp card as a PDF with current photos, measurements and contact details, ready to send to a
            client or a casting.
          </p>
          <a className="btn" href={asset(compCard.pdfUrl)} download>
            Download comp card (PDF)
          </a>
        </div>
      </div>
    </section>
  )
}

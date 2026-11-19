import { site } from '../data/site.js'

export default function Booking() {
  const { booking } = site

  return (
    <section className="sec" id="book">
      <div className="wrap book">
        <div>
          <p className="label">Book a call</p>
          <h2>Let us talk it through.</h2>
          <p>Pick a time that suits you. You get a Google Meet link and a calendar invite straight away.</p>
          <ul className="facts">
            <li>{booking.duration}</li>
            <li>Times follow Nigina&rsquo;s real availability</li>
            <li>Shown in your time zone</li>
          </ul>
          <p className="note">
            <a href={booking.calUrl} target="_blank" rel="noopener noreferrer">
              Open the booking page in a new tab
            </a>
          </p>
        </div>
        <div className="bk">
          {/* Cal.com inline booking page. Test it once the link is set: if it does not load,
              remove this iframe and keep the link above. */}
          <iframe src={booking.calUrl} title={`Book: ${booking.title}`} loading="lazy" />
        </div>
      </div>
    </section>
  )
}

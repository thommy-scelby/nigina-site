import { useState } from 'react'
import { site } from '../data/site.js'

function Field({ id, label, full, children }) {
  return (
    <div className={`fld${full ? ' full' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  )
}

export default function Contact() {
  // idle | sending | sent | error | offline
  const [status, setStatus] = useState('idle')
  const { contact, email, instagram, representation } = site

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    // Spam trap: real visitors never see or fill this field.
    if (data._gotcha) return

    if (!contact.formEndpoint) {
      setStatus('offline')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(contact.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...contact.formExtraFields, ...data }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok || body.success === false) throw new Error('Request failed')
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="sec" id="contact">
      <div className="wrap contact">
        <div>
          <p className="label">Contact</p>
          <h2>Work with me.</h2>
          <p>For bookings, campaigns and collaborations, send a few details about your project.</p>
          <div className="lines">
            <div>
              <span>Email</span>
              {email}
            </div>
            <div>
              <span>Instagram</span>
              <a href={instagram.url} target="_blank" rel="noopener noreferrer">
                {instagram.handle}
              </a>
            </div>
            {representation && (
              <div>
                <span>Representation</span>
                {representation}
              </div>
            )}
          </div>
        </div>

        {status === 'sent' ? (
          <div className="sent" role="status">
            <h3>Thank you.</h3>
            <p>Your message has been sent. I will get back to you as soon as possible.</p>
            <button type="button" className="btn btn-ghost" onClick={() => setStatus('idle')}>
              Write another message
            </button>
          </div>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            <Field id="f-name" label="Name">
              <input id="f-name" name="name" type="text" required autoComplete="name" />
            </Field>
            <Field id="f-email" label="Email">
              <input id="f-email" name="email" type="email" required autoComplete="email" />
            </Field>
            <Field id="f-company" label="Company or agency">
              <input id="f-company" name="company" type="text" autoComplete="organization" />
            </Field>
            <Field id="f-type" label="Project type">
              <select id="f-type" name="project_type" defaultValue={contact.projectTypes[0]}>
                {contact.projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="f-date" label="Date or period">
              <input id="f-date" name="date" type="text" placeholder="For example, March 2027" />
            </Field>
            <Field id="f-budget" label="Budget (optional)">
              <input id="f-budget" name="budget" type="text" />
            </Field>
            <Field id="f-msg" label="Message" full>
              <textarea id="f-msg" name="message" required />
            </Field>
            <input className="trap" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="full">
              <button type="submit" className="btn" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              {status === 'error' && (
                <p className="note err" role="alert">
                  The message could not be sent. Please try again, or write to {email}.
                </p>
              )}
              {status === 'offline' && (
                <p className="note" role="status">
                  This form is not connected yet. Please write to {email}.
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  )
}

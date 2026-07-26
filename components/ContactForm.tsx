'use client'

import { useState } from 'react'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    const payload = Object.fromEntries(new FormData(form))
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('bad status')
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <label className="field">
        <span className="label">Name</span>
        <input type="text" name="name" required autoComplete="name" />
      </label>
      <label className="field">
        <span className="label">Email</span>
        <input type="email" name="email" required autoComplete="email" />
      </label>
      <label className="field">
        <span className="label">Message</span>
        <textarea name="message" rows={5} required />
      </label>

      <div className="form-foot">
        <button type="submit" className="cta" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send'}
        </button>
        {status === 'sent' && (
          <span className="form-note">Thanks — I’ll be in touch.</span>
        )}
        {status === 'error' && (
          <span className="form-note is-error">
            Something went wrong. Try emailing directly.
          </span>
        )}
      </div>
    </form>
  )
}

import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contact } from '@/lib/content'

/* Contact endpoint. Validates the submission and delivers it via Resend.
   Configure with env vars:
     RESEND_API_KEY   – required to actually send (get one at resend.com)
     CONTACT_FROM     – verified sender, e.g. "Portfolio <hello@yourdomain.com>"
                        (defaults to Resend's onboarding sender for testing)
     CONTACT_TO       – where submissions land (defaults to contact.email) */
export async function POST(req: Request) {
  const data = await req.json().catch(() => null)

  const name = typeof data?.name === 'string' ? data.name.trim() : ''
  const email = typeof data?.email === 'string' ? data.email.trim() : ''
  const message = typeof data?.message === 'string' ? data.message.trim() : ''

  if (!email || !message) {
    return NextResponse.json(
      { error: 'Email and message are required.' },
      { status: 400 },
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM ?? 'Portfolio <onboarding@resend.dev>'
  const to = process.env.CONTACT_TO ?? contact.email

  // No key configured (e.g. local dev) — log and accept so the form still works.
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set — logging submission instead of sending.')
    console.log('Contact submission:', { name, email, message })
    return NextResponse.json({ ok: true })
  }

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio enquiry from ${name || email}`,
      text: `Name: ${name || '(not given)'}\nEmail: ${email}\n\n${message}`,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Could not send.' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact send failed:', err)
    return NextResponse.json({ error: 'Could not send.' }, { status: 500 })
  }
}

import { contact } from '@/lib/content'
import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <div className="content contact">
      <p className="label">Contact</p>
      <p className="contact-intro">{contact.intro}</p>

      <a className="contact-email" href={`mailto:${contact.email}`}>
        {contact.email}
      </a>

      <ul className="contact-links">
        {contact.links.map((l) => (
          <li key={l.href}>
            <a href={l.href} target="_blank" rel="noreferrer">
              <span>{l.label}</span>
              <span className="handle">{l.handle}</span>
            </a>
          </li>
        ))}
      </ul>

      <ContactForm />
    </div>
  )
}

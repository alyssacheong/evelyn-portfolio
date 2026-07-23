import { contact } from '../content'

export default function Contact() {
  return (
    <>
      <section className="contact">
        <p className="eyebrow">Contact</p>
        <p className="contact-intro lede">{contact.intro}</p>

        <a className="contact-email" href={`mailto:${contact.email}`}>
          {contact.email}
        </a>

        <ul className="contact-links">
          {contact.links.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noreferrer noopener">
                <span>{l.label}</span>
                <span className="handle">{l.handle}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

import { useState } from 'react'
import { CONTACT_CONTENT } from '../../data/portfolioContent'
import ContactForm from '../ContactForm'
import { playCosmicClick } from '../../utils/proceduralCosmicAudio'

/**
 * ContactPanelContent Component
 * Displays secure transmission contact form and direct channels.
 */
export default function ContactPanelContent() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    playCosmicClick()
    try {
      await navigator.clipboard.writeText(CONTACT_CONTENT.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback
    }
  }

  return (
    <div className="panel-content-layout">
      <div className="contact-statement-box">
        <p className="contact-statement-text">{CONTACT_CONTENT.statement}</p>
      </div>

      {/* Real Contact Transmission Form */}
      <ContactForm />

      {/* Primary Email Card */}
      <div className="contact-primary-card">
        <div className="contact-channel-info">
          <span className="contact-channel-type">Primary Channel</span>
          <h4 className="contact-channel-value">{CONTACT_CONTENT.email}</h4>
        </div>

        <div className="contact-channel-actions">
          <button
            type="button"
            className="contact-action-btn copy-btn"
            onClick={handleCopyEmail}
            aria-label="Copy email address to clipboard"
          >
            {copied ? '✓ Copied to Clipboard' : 'Copy Email Address'}
          </button>
          <a
            href={`mailto:${CONTACT_CONTENT.email}`}
            className="contact-action-btn mail-link-btn"
            aria-label="Send email via mail client"
          >
            Open Mail Client ↗
          </a>
        </div>
      </div>

      {/* Social & Professional Connections */}
      <div className="contact-networks-grid">
        {CONTACT_CONTENT.channels
          .filter((c) => c.platform !== 'Email')
          .map((channel) => (
            <div key={channel.platform} className="contact-network-card">
              <div className="network-card-header">
                <span className="network-platform-name">{channel.platform}</span>
                <span className="network-badge">{channel.badge}</span>
              </div>
              <div className="network-handle">{channel.value}</div>
              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="network-external-link"
                aria-label={`Visit ${channel.platform} profile (opens in new tab)`}
              >
                {channel.actionLabel} ↗
              </a>
            </div>
          ))}
      </div>

      {/* Transparent Status Note */}
      <div className="contact-footer-note">
        <strong>Direct Channels Only:</strong> {CONTACT_CONTENT.note}
      </div>
    </div>
  )
}

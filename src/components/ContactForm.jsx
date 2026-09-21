import { useState } from 'react'
import { sendContactMessage, VALIDATION_LIMITS } from '../services/contactService'
import { playCosmicClick } from '../utils/proceduralCosmicAudio'

/**
 * ContactForm Component
 * An accessible, secure contact transmission form with live validation,
 * spam prevention honeypot, rate limiting, and delivery status alerts.
 */
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    botField: '',
  })
  const [fieldErrors, setFieldErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionResult, setSubmissionResult] = useState(null)

  const isConfigured = Boolean(
    import.meta.env.VITE_CONTACT_FORM_ENDPOINT || import.meta.env.VITE_CONTACT_API_ENDPOINT
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error on edit
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    playCosmicClick()
    setSubmissionResult(null)
    setIsSubmitting(true)

    const result = await sendContactMessage(formData)
    setIsSubmitting(false)

    if (result.success) {
      setSubmissionResult({ type: 'success', message: result.message })
      setFormData({ name: '', email: '', message: '', botField: '' })
      setFieldErrors({})
    } else {
      if (result.errors) {
        setFieldErrors(result.errors)
      }
      setSubmissionResult({
        type: result.status === 'unconfigured' ? 'info' : 'error',
        message: result.message,
      })
    }
  }

  return (
    <div className="contact-form-container" role="region" aria-label="Direct Transmission Form">
      <div className="form-header-box">
        <h4 className="form-section-title">
          <span>✉️</span> Direct Transmission Form
        </h4>
        <p className="form-section-desc">
          Sends your message directly to <strong>dhrutiviradiya333@gmail.com</strong>.
        </p>

        {!isConfigured && (
          <div className="backend-unconfigured-badge">
            <span className="unconfigured-dot" aria-hidden="true" />
            <span>
              Backend Endpoint Unconfigured in <code>.env.local</code>. Submissions will notify configuration status.
            </span>
          </div>
        )}
      </div>

      {/* Success Notification Alert */}
      {submissionResult?.type === 'success' && (
        <div className="form-alert-box alert-success" role="alert" aria-live="polite">
          <span className="alert-icon" aria-hidden="true">✓</span>
          <div className="alert-content">
            <h5 className="alert-title">Message Sent Successfully</h5>
            <p className="alert-desc">{submissionResult.message}</p>
          </div>
          <button
            type="button"
            className="alert-dismiss-btn"
            onClick={() => {
              playCosmicClick()
              setSubmissionResult(null)
            }}
          >
            Send Another
          </button>
        </div>
      )}

      {/* Error or Info Alert */}
      {submissionResult && submissionResult.type !== 'success' && (
        <div
          className={`form-alert-box ${
            submissionResult.type === 'info' ? 'alert-info' : 'alert-error'
          }`}
          role="alert"
          aria-live="polite"
        >
          <span className="alert-icon" aria-hidden="true">
            {submissionResult.type === 'info' ? 'ℹ' : '⚠'}
          </span>
          <div className="alert-content">
            <h5 className="alert-title">
              {submissionResult.type === 'info' ? 'Configuration Notice' : 'Transmission Failed'}
            </h5>
            <p className="alert-desc">{submissionResult.message}</p>
          </div>
          <button
            type="button"
            className="alert-dismiss-btn"
            onClick={() => {
              playCosmicClick()
              setSubmissionResult(null)
            }}
          >
            ✕
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form" noValidate>
        {/* Hidden Honeypot Field for Automated Bot Filtering */}
        <div style={{ display: 'none' }} aria-hidden="true">
          <label htmlFor="form-bot-field">Do not fill this field</label>
          <input
            id="form-bot-field"
            type="text"
            name="botField"
            tabIndex={-1}
            autoComplete="off"
            value={formData.botField}
            onChange={handleChange}
          />
        </div>

        {/* Name Input */}
        <div className="form-field-group">
          <div className="field-label-row">
            <label htmlFor="contact-name" className="field-label">
              Your Name <span className="required-star">*</span>
            </label>
            <span className="field-char-count">
              {formData.name.length}/{VALIDATION_LIMITS.name.max}
            </span>
          </div>
          <input
            id="contact-name"
            type="text"
            name="name"
            className={`form-input ${fieldErrors.name ? 'is-invalid' : ''}`}
            placeholder="e.g. Alex Mercer"
            value={formData.name}
            onChange={handleChange}
            maxLength={VALIDATION_LIMITS.name.max}
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? 'name-error' : undefined}
          />
          {fieldErrors.name && (
            <span id="name-error" className="field-error-msg" role="alert">
              {fieldErrors.name}
            </span>
          )}
        </div>

        {/* Email Input */}
        <div className="form-field-group">
          <div className="field-label-row">
            <label htmlFor="contact-email" className="field-label">
              Your Email Address <span className="required-star">*</span>
            </label>
            <span className="field-char-count">
              {formData.email.length}/{VALIDATION_LIMITS.email.max}
            </span>
          </div>
          <input
            id="contact-email"
            type="email"
            name="email"
            className={`form-input ${fieldErrors.email ? 'is-invalid' : ''}`}
            placeholder="e.g. alex@example.com"
            value={formData.email}
            onChange={handleChange}
            maxLength={VALIDATION_LIMITS.email.max}
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
          />
          {fieldErrors.email && (
            <span id="email-error" className="field-error-msg" role="alert">
              {fieldErrors.email}
            </span>
          )}
        </div>

        {/* Message Input */}
        <div className="form-field-group">
          <div className="field-label-row">
            <label htmlFor="contact-message" className="field-label">
              Your Message <span className="required-star">*</span>
            </label>
            <span className="field-char-count">
              {formData.message.length}/{VALIDATION_LIMITS.message.max}
            </span>
          </div>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            className={`form-textarea ${fieldErrors.message ? 'is-invalid' : ''}`}
            placeholder="Write your transmission, feedback, or inquiry..."
            value={formData.message}
            onChange={handleChange}
            maxLength={VALIDATION_LIMITS.message.max}
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? 'message-error' : undefined}
          />
          {fieldErrors.message && (
            <span id="message-error" className="field-error-msg" role="alert">
              {fieldErrors.message}
            </span>
          )}
        </div>

        {/* Submit Controls */}
        <div className="form-actions-row">
          <button
            type="submit"
            className="form-submit-btn"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="submit-spinner" aria-hidden="true" />
                <span>Transmitting...</span>
              </>
            ) : (
              <>
                <span>Send Transmission</span>
                <span className="submit-arrow" aria-hidden="true">→</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

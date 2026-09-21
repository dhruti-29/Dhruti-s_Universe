/**
 * Contact Form Service
 * “DHRUTI — The Living Intelligence Universe”
 *
 * Handles client-side validation, spam honeypot filtering, rate limiting,
 * and secure delivery to dhrutiviradiya333@gmail.com via configured form endpoint.
 *
 * Security:
 * - Zero SMTP passwords or private tokens in frontend code.
 * - Confirms successful delivery before displaying success state.
 * - Throttles duplicate submissions with client-side rate limiting.
 */

const RATE_LIMIT_STORAGE_KEY = 'dhruti_last_contact_submission_ts'
const MIN_SUBMISSION_INTERVAL_MS = 25000 // 25 seconds cooldown between messages

export const VALIDATION_LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 100 },
  message: { min: 10, max: 2000 },
}

/**
 * Validates form input fields client-side.
 */
export function validateContactForm({ name, email, message, botField }) {
  const errors = {}

  // 1. Spam Honeypot Check
  if (botField && botField.trim().length > 0) {
    return { isValid: false, errors: { form: 'Spam submission detected.' } }
  }

  // 2. Name Validation
  const trimmedName = (name || '').trim()
  if (!trimmedName) {
    errors.name = 'Please provide your name.'
  } else if (trimmedName.length < VALIDATION_LIMITS.name.min) {
    errors.name = `Name must be at least ${VALIDATION_LIMITS.name.min} characters.`
  } else if (trimmedName.length > VALIDATION_LIMITS.name.max) {
    errors.name = `Name cannot exceed ${VALIDATION_LIMITS.name.max} characters.`
  }

  // 3. Email Validation
  const trimmedEmail = (email || '').trim()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!trimmedEmail) {
    errors.email = 'Please provide your email address.'
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please provide a valid email address (e.g. name@domain.com).'
  } else if (trimmedEmail.length > VALIDATION_LIMITS.email.max) {
    errors.email = `Email cannot exceed ${VALIDATION_LIMITS.email.max} characters.`
  }

  // 4. Message Validation
  const trimmedMessage = (message || '').trim()
  if (!trimmedMessage) {
    errors.message = 'Please enter your message.'
  } else if (trimmedMessage.length < VALIDATION_LIMITS.message.min) {
    errors.message = `Message must be at least ${VALIDATION_LIMITS.message.min} characters.`
  } else if (trimmedMessage.length > VALIDATION_LIMITS.message.max) {
    errors.message = `Message cannot exceed ${VALIDATION_LIMITS.message.max} characters.`
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Submits the validated contact message to the secure backend endpoint.
 */
export async function sendContactMessage({ name, email, message, botField }) {
  // 1. Validate fields
  const validation = validateContactForm({ name, email, message, botField })
  if (!validation.isValid) {
    return {
      success: false,
      status: 'validation_error',
      errors: validation.errors,
      message: 'Please resolve the highlighted errors before submitting.',
    }
  }

  // 2. Client-side Rate Limiting
  try {
    const lastSubmitTs = sessionStorage.getItem(RATE_LIMIT_STORAGE_KEY)
    if (lastSubmitTs) {
      const elapsed = Date.now() - Number(lastSubmitTs)
      if (elapsed < MIN_SUBMISSION_INTERVAL_MS) {
        const remainingSeconds = Math.ceil((MIN_SUBMISSION_INTERVAL_MS - elapsed) / 1000)
        return {
          success: false,
          status: 'rate_limited',
          message: `Please wait ${remainingSeconds} seconds before sending another transmission.`,
        }
      }
    }
  } catch {
    // Ignore storage restriction
  }

  // 3. Check endpoint configuration
  const endpoint =
    import.meta.env.VITE_CONTACT_FORM_ENDPOINT || import.meta.env.VITE_CONTACT_API_ENDPOINT
  const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

  if (!endpoint) {
    return {
      success: false,
      status: 'unconfigured',
      message:
        'Contact form backend is awaiting endpoint configuration in .env.local. You can reach Dhruti directly via dhrutiviradiya333@gmail.com.',
    }
  }

  // 4. Prepare payload
  const payload = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    _subject: `New Transmission from Portfolio: ${name.trim()}`,
    _replyto: email.trim(),
    _gotcha: botField || '',
    recipient: 'dhrutiviradiya333@gmail.com',
  }

  if (web3FormsKey) {
    payload.access_key = web3FormsKey
  }

  // 5. Send POST request
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json().catch(() => ({}))

    if (response.ok && (data.success === undefined || data.success === true)) {
      // Record rate limit timestamp
      try {
        sessionStorage.setItem(RATE_LIMIT_STORAGE_KEY, String(Date.now()))
      } catch {
        // Ignore
      }

      return {
        success: true,
        status: 'delivered',
        message:
          'Message sent successfully! Dhruti will receive your transmission at dhrutiviradiya333@gmail.com.',
      }
    }

    return {
      success: false,
      status: 'backend_error',
      message:
        data.message ||
        data.error ||
        `Delivery failed with status ${response.status}. Please send directly to dhrutiviradiya333@gmail.com.`,
    }
  } catch (err) {
    return {
      success: false,
      status: 'network_error',
      message:
        err?.message ||
        'Network error during transmission. Please check your connection or reach out directly at dhrutiviradiya333@gmail.com.',
    }
  }
}

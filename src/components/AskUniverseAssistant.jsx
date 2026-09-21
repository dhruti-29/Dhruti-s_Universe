import { useState, useRef, useEffect, useCallback } from 'react'
import {
  ASSISTANT_WELCOME,
  SUGGESTED_QUESTIONS,
  findAssistantAnswer,
} from '../data/assistantKnowledge'
import useModalFocus from '../hooks/useModalFocus'
import { playCosmicClick } from '../utils/proceduralCosmicAudio'

/**
 * AskUniverseAssistant Component
 * “Ask Dhruti’s Universe”
 *
 * A thoughtful, friendly cosmic assistant that provides authentic, verified answers
 * about Dhruti's skills, learning journey, achievements, education, interests,
 * career direction, and transmission channels.
 *
 * Privacy & Security:
 * - 100% client-side predefined structured knowledge base.
 * - Zero Firebase, external AI APIs, or network tracking.
 * - Strictly protects in-progress projects (confidential on GitHub).
 * - Full keyboard accessibility (Enter submit, Esc dismissal, focus trapping).
 * - Contextual follow-up understanding.
 */
export default function AskUniverseAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(() => [
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: ASSISTANT_WELCOME.greeting,
      subtext: ASSISTANT_WELCOME.subtext,
    },
  ])
  const [inputText, setInputText] = useState('')

  const lastIntentRef = useRef(null)
  const closeBtnRef = useRef(null)
  const messagesEndRef = useRef(null)
  const inputFieldRef = useRef(null)

  const handleOpen = useCallback(() => {
    playCosmicClick()
    setIsOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    playCosmicClick()
    setIsOpen(false)
  }, [])

  const modalDialogRef = useModalFocus(isOpen, handleClose, closeBtnRef)

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen && inputFieldRef.current) {
      inputFieldRef.current.focus()
    }
  }, [isOpen])

  // Scroll messages to bottom smoothly on update
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  const handleSendQuery = useCallback((queryText) => {
    const trimmed = queryText?.trim()
    if (!trimmed) return

    playCosmicClick()

    const userMessageId = `user-${Date.now()}`
    const result = findAssistantAnswer(trimmed, lastIntentRef.current)
    lastIntentRef.current = result.intent || null
    const assistantMessageId = `assistant-${Date.now() + 1}`

    setMessages((prev) => [
      ...prev,
      {
        id: userMessageId,
        sender: 'user',
        text: trimmed,
      },
      {
        id: assistantMessageId,
        sender: 'assistant',
        data: result,
      },
    ])

    setInputText('')
  }, [])

  const handleFormSubmit = (e) => {
    e.preventDefault()
    handleSendQuery(inputText)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendQuery(inputText)
    }
  }

  const handleSelectSuggested = (suggested) => {
    handleSendQuery(suggested.question)
  }

  const handleResetChat = () => {
    playCosmicClick()
    lastIntentRef.current = null
    setMessages([
      {
        id: `msg-welcome-${Date.now()}`,
        sender: 'assistant',
        text: ASSISTANT_WELCOME.greeting,
        subtext: ASSISTANT_WELCOME.subtext,
      },
    ])
    setInputText('')
    if (inputFieldRef.current) {
      inputFieldRef.current.focus()
    }
  }

  // Render question-specific structured data or conversational messages
  const renderAssistantContent = (data) => {
    if (!data) return null

    switch (data.type) {
      case 'conversational':
        return <p className="bubble-text">{data.text}</p>

      case 'skills_completed':
      case 'skills_learning':
        return (
          <div className="assistant-structured-skills">
            <p className="bubble-intro-text">{data.intro}</p>
            <div className="assistant-skills-items-list">
              {data.items.map((item) => (
                <div key={item.name} className="assistant-skill-item-card">
                  <div className="skill-item-name-row">
                    <strong className="skill-item-name">{item.name}</strong>
                    <span
                      className={`assistant-skill-pill ${
                        data.type === 'skills_completed' ? 'status-completed' : 'status-ongoing'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="skill-item-detail">{item.detail}</p>
                </div>
              ))}
            </div>
            {data.note && <div className="assistant-bubble-note">✦ {data.note}</div>}
          </div>
        )

      case 'skills_all':
        return (
          <div className="assistant-structured-skills">
            <p className="bubble-intro-text">{data.intro}</p>
            <div className="assistant-skills-groups">
              <div className="assistant-skill-group">
                <div className="assistant-group-header">
                  <span className="assistant-group-title">COMPLETED</span>
                </div>
                <div className="assistant-pills-row">
                  {data.completed.map((item) => (
                    <span key={item.name} className="assistant-skill-pill status-completed">
                      <span className="pill-name">{item.name}</span>
                      <span className="pill-status">({item.status})</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="assistant-skill-group">
                <div className="assistant-group-header">
                  <span className="assistant-group-title">ONGOING / CURRENTLY LEARNING</span>
                </div>
                <div className="assistant-pills-row">
                  {data.learning.map((item) => (
                    <span key={item.name} className="assistant-skill-pill status-ongoing">
                      <span className="pill-name">{item.name}</span>
                      <span className="pill-status">({item.status})</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {data.note && <div className="assistant-bubble-note">✦ {data.note}</div>}
          </div>
        )

      case 'achievements':
        return (
          <div className="assistant-structured-achievements">
            <p className="bubble-intro-text">{data.intro}</p>
            <div className="assistant-achievements-list">
              {data.items.map((item) => (
                <div key={item.title} className="assistant-achievement-item">
                  <div className="achievement-item-header">
                    <span className="achievement-spark" aria-hidden="true">🏆</span>
                    <strong className="achievement-title">{item.title}</strong>
                    <span className="achievement-status-badge">{item.status}</span>
                  </div>
                  <p className="achievement-detail">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case 'education':
        return (
          <div className="assistant-structured-education">
            <p className="bubble-intro-text">{data.intro}</p>
            <div className="assistant-education-card">
              <div className="edu-card-badge">
                <span className="edu-spark" aria-hidden="true">🎓</span>
                <span className="edu-degree">{data.degree}</span>
              </div>
              <div className="edu-card-meta">
                <span className="edu-status-pill">{data.status}</span>
                <span className="edu-tagline-pill">{data.tagline}</span>
              </div>
              <p className="edu-detail-text">{data.detail}</p>
            </div>
          </div>
        )

      case 'journey':
        return (
          <div className="assistant-structured-journey">
            <p className="bubble-intro-text">{data.intro}</p>
            <div className="assistant-journey-steps">
              {data.steps.map((step) => (
                <div key={step.step} className="assistant-step-card">
                  <div className="step-badge-col">
                    <span className="step-num">{step.step}</span>
                  </div>
                  <div className="step-text-col">
                    <div className="step-header">
                      <strong className="step-title">{step.title}</strong>
                      <span className="step-status">{step.status}</span>
                    </div>
                    <p className="step-desc">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'contact':
        return (
          <div className="assistant-structured-contact">
            <p className="bubble-intro-text">{data.intro}</p>
            <div className="assistant-contact-grid">
              {data.channels.map((ch) => (
                <a
                  key={ch.platform}
                  href={ch.url}
                  target={ch.url.startsWith('mailto:') ? undefined : '_blank'}
                  rel={ch.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="assistant-contact-link"
                  aria-label={`${ch.platform} (${ch.label})`}
                >
                  <div className="contact-link-left">
                    <span className="contact-platform">{ch.platform}</span>
                    <span className="contact-label">{ch.label}</span>
                  </div>
                  <div className="contact-link-right">
                    <span className="contact-badge">{ch.badge}</span>
                    <span className="contact-arrow" aria-hidden="true">↗</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )

      case 'interests':
      case 'career':
        return (
          <div className="assistant-structured-points">
            <p className="bubble-intro-text">{data.intro}</p>
            <ul className="assistant-points-list">
              {data.points.map((pt, i) => (
                <li key={i} className="assistant-point-item">
                  <span className="point-spark" aria-hidden="true">✦</span>
                  <span className="point-text">{pt}</span>
                </li>
              ))}
            </ul>
            {data.note && <div className="assistant-bubble-note">✦ {data.note}</div>}
          </div>
        )

      case 'projects':
        return (
          <div className="assistant-structured-projects">
            <div className="projects-locked-badge">
              <span className="locked-icon" aria-hidden="true">🔒</span>
              <strong className="locked-heading">{data.intro}</strong>
            </div>
            <p className="projects-locked-note">{data.note}</p>
            {data.github && (
              <a
                href={data.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="assistant-github-btn"
                aria-label="Visit GitHub Profile (opens in a new tab)"
              >
                <span>{data.github.label}</span>
                <span className="btn-arrow" aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        )

      case 'unsupported':
      default:
        return (
          <div className="assistant-structured-fallback">
            <p className="bubble-text">{data.text}</p>
            {data.suggestions && (
              <div className="fallback-topics-wrap">
                <span className="fallback-label">Confirmed Inquiries:</span>
                <div className="fallback-pills">
                  {data.suggestions.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      className="fallback-topic-pill"
                      onClick={() => handleSendQuery(topic)}
                    >
                      ✦ {topic}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
    }
  }

  return (
    <>
      {/* Floating Futuristic Cosmic Assistant Button */}
      <button
        type="button"
        className="ask-universe-floating-trigger"
        onClick={handleOpen}
        aria-label="Open Ask Dhruti's Universe assistant"
        title="Ask Dhruti's Universe — Cosmic Assistant"
      >
        <div className="assistant-orb-core">
          <span className="assistant-orb-spark" aria-hidden="true">✦</span>
          <span className="assistant-orb-ring" aria-hidden="true" />
        </div>
        <span className="assistant-btn-label">Ask Universe</span>
      </button>

      {/* Holographic Assistant Chat Panel */}
      {isOpen && (
        <div
          className="modal-backdrop assistant-modal-backdrop"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="assistant-panel-title"
        >
          <div
            ref={modalDialogRef}
            className="modal-dialog assistant-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Holographic Scanline & Aesthetic Corners */}
            <div className="hologram-scanline" aria-hidden="true" />
            <div className="hologram-corner corner-tl" aria-hidden="true" />
            <div className="hologram-corner corner-tr" aria-hidden="true" />
            <div className="hologram-corner corner-bl" aria-hidden="true" />
            <div className="hologram-corner corner-br" aria-hidden="true" />

            {/* Header */}
            <div className="modal-header assistant-header">
              <div className="assistant-title-group">
                <div className="assistant-avatar-badge" aria-hidden="true">
                  <span className="assistant-starlight">✦</span>
                </div>
                <div>
                  <h3 id="assistant-panel-title" className="assistant-modal-title">
                    Ask Dhruti’s Universe
                  </h3>
                  <p className="assistant-modal-subtitle">
                    Cosmic Portfolio Companion • Structured Knowledge
                  </p>
                </div>
              </div>

              <div className="assistant-header-actions">
                <button
                  type="button"
                  className="assistant-reset-btn"
                  onClick={handleResetChat}
                  title="Reset conversation history"
                  aria-label="Reset conversation"
                >
                  ↺ Reset
                </button>
                <button
                  ref={closeBtnRef}
                  type="button"
                  className="modal-close-btn"
                  onClick={handleClose}
                  aria-label="Close assistant"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Suggested Questions Bar */}
            <div className="assistant-suggested-bar" role="region" aria-label="Suggested inquiries">
              <span className="suggested-heading">Inquiries:</span>
              <div className="suggested-pills-wrap">
                {SUGGESTED_QUESTIONS.map((sq) => (
                  <button
                    key={sq.id}
                    type="button"
                    className="suggested-question-pill"
                    onClick={() => handleSelectSuggested(sq)}
                    aria-label={`Ask: ${sq.question}`}
                  >
                    <span>✦</span> {sq.shortLabel}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="assistant-messages-container" role="log" aria-live="polite">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`assistant-chat-bubble ${
                    msg.sender === 'user' ? 'bubble-user' : 'bubble-assistant'
                  }`}
                >
                  <div className="bubble-header-row">
                    <span className="bubble-sender-name">
                      {msg.sender === 'user' ? 'Explorer' : '✦ Dhruti’s Universe'}
                    </span>
                  </div>

                  {/* Standard initial welcome text */}
                  {msg.text && (
                    <>
                      <p className="bubble-text">{msg.text}</p>
                      {msg.subtext && <p className="bubble-subtext">{msg.subtext}</p>}
                    </>
                  )}

                  {/* Question-specific structured response */}
                  {msg.data && renderAssistantContent(msg.data)}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input & Send Form */}
            <form onSubmit={handleFormSubmit} className="assistant-input-bar">
              <input
                ref={inputFieldRef}
                type="text"
                className="assistant-text-input"
                placeholder="Ask about skills, journey, education, achievements, or say hello..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                maxLength={200}
                aria-label="Ask a question about Dhruti"
              />
              <button
                type="submit"
                className="assistant-send-btn"
                disabled={!inputText.trim()}
                aria-label="Send query"
              >
                <span>Ask</span>
                <span className="send-arrow" aria-hidden="true">→</span>
              </button>
            </form>

            {/* Privacy & Transparency Disclaimer */}
            <div className="assistant-disclaimer">
              <span>✦ 100% client-side predefined knowledge. Zero external AI APIs or tracking.</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

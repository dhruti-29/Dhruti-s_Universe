import { PERSONAL_INFO, ABOUT_CONTENT } from '../../data/portfolioContent'
import ProfilePhoto from '../ProfilePhoto'

/**
 * AboutPanelContent Component
 * Renders authentic narrative, confirmed personal direction, verified social links,
 * and a premium temporary photo placeholder via ProfilePhoto.
 * Strictly free of role exaggeration, career claims, or fake resume links.
 */
export default function AboutPanelContent() {
  return (
    <div className="panel-content-layout">
      {/* Profile Header & Modular Profile Photo / Placeholder */}
      <div className="about-identity-header">
        <ProfilePhoto
          photoUrl={PERSONAL_INFO.hasPhoto ? PERSONAL_INFO.photoUrl : null}
          name={PERSONAL_INFO.name}
          placeholderText={PERSONAL_INFO.photoPlaceholderText}
        />

        <div className="about-identity-details">
          <div className="about-name-row">
            <h3 className="about-person-name">{PERSONAL_INFO.name}</h3>
            <span className="about-education-badge">{PERSONAL_INFO.education}</span>
          </div>
          <div className="about-tagline-text">{PERSONAL_INFO.tagline}</div>
          <span className="photo-placeholder-note">
            ✦ {PERSONAL_INFO.photoPlaceholderText}
          </span>

          {/* Verified Social & Technical Links */}
          <div className="about-quick-links" aria-label="Social and professional links">
            {PERSONAL_INFO.socialLinks.github && (
              <a
                href={PERSONAL_INFO.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="about-social-chip"
                aria-label="GitHub profile (opens in a new tab)"
              >
                <span>GitHub</span>
                <span className="chip-arrow" aria-hidden="true">↗</span>
              </a>
            )}
            <a
              href={PERSONAL_INFO.socialLinks.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="about-social-chip"
              aria-label="LinkedIn profile (opens in a new tab)"
            >
              <span>LinkedIn</span>
              <span className="chip-arrow" aria-hidden="true">↗</span>
            </a>
            <a
              href={PERSONAL_INFO.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="about-social-chip"
              aria-label="Instagram profile (opens in a new tab)"
            >
              <span>Instagram</span>
              <span className="chip-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Narrative Bio */}
      <div className="about-narrative-section">
        {ABOUT_CONTENT.paragraphs.map((para, idx) => (
          <p key={idx} className="about-paragraph">
            {para}
          </p>
        ))}
      </div>

      {/* Core Direction Grid */}
      <div className="about-pillars-container">
        <h4 className="section-mini-heading">Personal Direction & Values</h4>
        <div className="about-pillars-grid">
          {ABOUT_CONTENT.coreDirection.map((item) => (
            <div key={item.title} className="about-pillar-card">
              <span className="pillar-spark" aria-hidden="true">✦</span>
              <h5 className="pillar-title">{item.title}</h5>
              <p className="pillar-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

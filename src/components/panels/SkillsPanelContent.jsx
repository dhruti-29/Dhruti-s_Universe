import { SKILLS_CONTENT } from '../../data/portfolioContent'

/**
 * SkillsPanelContent Component
 * Displays skills with honest status labels:
 * - C: Status: Learning / Practicing
 * - C++: Status: Learning / Practicing
 * - HTML: Status: Learning / Practicing
 * - CSS: Status: Learning / Practicing
 * - JavaScript: Status: Learning / Practicing
 * - DSA: Status: Learning / Practicing
 * - Java: Status: Introductory knowledge
 * - Python: Status: Currently learning
 * Completely free of percentages, progress bars, star ratings, or expert claims.
 */
export default function SkillsPanelContent() {
  const getStatusBadgeClass = (statusType) => {
    switch (statusType) {
      case 'completed':
        return 'status-completed'
      case 'ongoing':
      case 'learning':
        return 'status-ongoing'
      case 'basic':
      case 'introductory':
        return 'status-basic'
      case 'practicing':
      default:
        return 'status-learning-practicing'
    }
  }

  return (
    <div className="panel-content-layout">
      <div className="skills-intro-bar">
        <p className="skills-intro-text">
          Technical skills and knowledge areas organized by learning stage with verified, honest status labels reflecting current hands-on practice.
        </p>
      </div>

      <div className="skills-categories-container">
        {SKILLS_CONTENT.categories.map((category) => (
          <div key={category.id} className="skills-category-section">
            <div className="skills-category-header">
              <div className="skills-category-title-wrap">
                <span className="skills-category-dot" aria-hidden="true" />
                <h4 className="skills-category-title">{category.name}</h4>
              </div>
              <span className="skills-category-desc">{category.description}</span>
            </div>

            <div className="skills-cards-grid">
              {category.skills.map((skill) => (
                <div key={skill.id} className="skill-item-card">
                  <div className="skill-card-top">
                    <span className="skill-name">{skill.name}</span>
                    <span className={`skill-tag-pill ${getStatusBadgeClass(skill.statusType)}`}>
                      <span className="pill-status-prefix">Status:</span> {skill.status}
                    </span>
                  </div>
                  <div className="skill-domain-label">{skill.domain}</div>
                  <p className="skill-detail-text">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Transparency Guarantee */}
      <div className="skills-transparency-note">
        <strong>Transparency Guarantee:</strong> Every proficiency label reflects genuine current learning stages.
        No artificial percentage gauges, progress bars, star ratings, or professional titles are applied.
      </div>
    </div>
  )
}

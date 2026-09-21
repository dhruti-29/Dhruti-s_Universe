import { LEARNING_JOURNEY_CONTENT } from '../../data/portfolioContent'

/**
 * LearningJourneyPanelContent Component
 * Renders Dhruti's continuous learning path from foundational C/C++
 * to web markup, introductory Java, active growth in DSA & Python/JS,
 * and daily habits of self-improvement and exploration.
 * Strictly adheres to verified facts; zero invented milestones or exaggerated titles.
 */
export default function LearningJourneyPanelContent() {
  const getStatusBadgeClass = (statusType) => {
    switch (statusType) {
      case 'completed':
        return 'journey-status-completed'
      case 'ongoing':
        return 'journey-status-ongoing'
      case 'habit':
        return 'journey-status-habit'
      default:
        return 'journey-status-default'
    }
  }

  return (
    <div className="panel-content-layout learning-journey-panel">
      {/* Journey Philosophy Banner */}
      <div className="journey-intro-banner">
        <div className="journey-spark-icon" aria-hidden="true">✦</div>
        <div className="journey-intro-text-wrap">
          <p className="journey-quote">"{LEARNING_JOURNEY_CONTENT.quote}"</p>
          <p className="journey-overview">{LEARNING_JOURNEY_CONTENT.overview}</p>
        </div>
      </div>

      {/* Structured Chronological Milestones Timeline */}
      <div className="journey-timeline" role="list" aria-label="Learning Journey Timeline">
        {LEARNING_JOURNEY_CONTENT.milestones.map((milestone, idx) => (
          <div
            key={milestone.stage}
            className="journey-milestone-card"
            role="listitem"
            style={{ animationDelay: `${idx * 0.08}s` }}
          >
            {/* Stage Indicator Orb */}
            <div className="milestone-orbital-wrap">
              <div className="milestone-orb">
                <span className="milestone-stage-number">{milestone.stage}</span>
              </div>
              {idx < LEARNING_JOURNEY_CONTENT.milestones.length - 1 && (
                <div className="milestone-connector-line" aria-hidden="true" />
              )}
            </div>

            {/* Milestone Body */}
            <div className="milestone-content">
              <div className="milestone-header-row">
                <div className="milestone-title-group">
                  <h4 className="milestone-title">{milestone.title}</h4>
                  <span className="milestone-summary">{milestone.summary}</span>
                </div>
                <span className={`milestone-status-badge ${getStatusBadgeClass(milestone.statusType)}`}>
                  {milestone.status}
                </span>
              </div>

              <p className="milestone-description">{milestone.description}</p>

              {/* Focus tags */}
              <div className="milestone-focus-tags" aria-label="Key learning areas">
                {milestone.focusAreas.map((tag) => (
                  <span key={tag} className="milestone-focus-tag">
                    <span className="tag-spark" aria-hidden="true">✦</span> {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Honest Commitment Footer */}
      <div className="journey-commitment-footer">
        <span className="journey-footer-spark" aria-hidden="true">✦</span>
        <span>
          <strong>Everyday Orbit:</strong> Moving forward through curiosity, consistent study, and hands-on coding.
          Engineering projects remain strictly in private development on GitHub.
        </span>
      </div>
    </div>
  )
}

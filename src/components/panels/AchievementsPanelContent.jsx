import { ACHIEVEMENTS_CONTENT } from '../../data/portfolioContent'

/**
 * AchievementsPanelContent Component
 * Renders verified milestones:
 * 1. CodeAlpha C Programming Internship (Status: Completed)
 * 2. HackerRank (C++ 5-star and C 4-star)
 * 3. SSIP Project (Selected at Gujarat State Level)
 * 4. Smart India Hackathon (SIH) (College internal round in 1st year, University-level in 2nd year)
 * 5. Coursera Certificates (Coursework in C++, Java, and DSA)
 * Strictly free of invented dates, rankings, companies, or extra awards.
 */
export default function AchievementsPanelContent() {
  return (
    <div className="panel-content-layout">
      <div className="achievements-intro-bar">
        <p className="achievements-intro-text">
          A genuine record of verified problem solving milestones, academic hackathons, practical internships, and coursework.
        </p>
      </div>

      <div className="achievements-cards-grid">
        {ACHIEVEMENTS_CONTENT.items.map((item, index) => (
          <div key={item.id} className="achievement-card">
            <div className="achievement-card-header">
              <span className="achievement-index-tag">0{index + 1} // Milestone</span>
              <span className="achievement-badge">{item.statusLabel}</span>
            </div>

            <h4 className="achievement-title">{item.title}</h4>
            <p className="achievement-desc">{item.details}</p>
          </div>
        ))}
      </div>

      <div className="achievements-footer-note">
        <span>✦ All milestones reflect confirmed academic, competitive, and practical participation.</span>
      </div>
    </div>
  )
}

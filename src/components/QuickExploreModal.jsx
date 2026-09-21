import { useRef } from 'react'
import useModalFocus from '../hooks/useModalFocus'

/**
 * QuickExploreModal Component
 * Provides an honest directory of the portfolio roadmap.
 * Transparently indicates which sections are live and which are upcoming,
 * strictly upholding project confidentiality without misleading promises.
 * Uses useModalFocus for accessible keyboard navigation and focus restoration.
 */
export default function QuickExploreModal({
  isOpen,
  onClose,
  currentView = 'welcome',
  onNavigateView,
  onOpenNode,
  onDiscoverBeacon,
}) {
  const closeButtonRef = useRef(null)
  const dialogRef = useModalFocus(isOpen, onClose, closeButtonRef)

  if (!isOpen) return null

  const navigationItems = [
    {
      id: '01',
      name: 'Welcome Portal & Starfield',
      type: 'view',
      target: 'welcome',
      status: 'Active',
      isCurrent: currentView === 'welcome',
      description: 'Luminous cosmic entrance, identity, and personal philosophy.',
      actionLabel: 'Enter Portal',
    },
    {
      id: '02',
      name: '3D Celestial Living Universe',
      type: 'view',
      target: 'universe',
      status: 'Active',
      isCurrent: currentView === 'universe',
      description: 'Interactive celestial sphere, glowing navigation nodes, and orbital camera.',
      actionLabel: 'Explore 3D',
    },
    {
      id: '03',
      name: 'About Me',
      type: 'node',
      target: 'about',
      status: 'Live Panel',
      isCurrent: false,
      description: 'Personal direction, values, philosophy, and authentic journey.',
      actionLabel: 'Open Hologram',
    },
    {
      id: '04',
      name: 'Skills & Knowledge Areas',
      type: 'node',
      target: 'skills',
      status: 'Live Panel',
      isCurrent: false,
      description: 'Honest learning stages in C, C++, DSA, Python, Java, and Web Development.',
      actionLabel: 'Open Hologram',
    },
    {
      id: '05',
      name: 'Learning Journey',
      type: 'node',
      target: 'journey',
      status: 'Live Panel',
      isCurrent: false,
      description: 'Chronological path from C/C++ foundations to web standards, Java, and active learning in DSA & Python.',
      actionLabel: 'Open Hologram',
    },
    {
      id: '06',
      name: 'Achievements & Milestones',
      type: 'node',
      target: 'achievements',
      status: 'Live Panel',
      isCurrent: false,
      description: 'Verified academic highlights, CodeAlpha internship, HackerRank, SSIP, and SIH.',
      actionLabel: 'Open Hologram',
    },
    {
      id: '07',
      name: 'Contact & Connect',
      type: 'node',
      target: 'contact',
      status: 'Live Panel',
      isCurrent: false,
      description: 'Direct email channel, verified social networks, and live transmission form.',
      actionLabel: 'Open Hologram',
    },
    {
      id: '08',
      name: 'Projects (Private Development)',
      type: 'node',
      target: 'projects',
      status: 'Confidential',
      isCurrent: false,
      description: 'Strictly confidential in-progress engineering experiments and GitHub profile link.',
      actionLabel: 'View Status',
    },
    {
      id: '09',
      name: 'Celestial Core Beacon (Easter Egg)',
      type: 'beacon',
      target: 'beacon',
      status: 'Discovery',
      isCurrent: false,
      description: 'Cosmic transmission and philosophy hidden inside the sphere core.',
      actionLabel: 'Connect Beacon',
    },
  ]

  const handleItemClick = (item) => {
    onClose()
    if (item.type === 'view') {
      if (onNavigateView) onNavigateView(item.target)
    } else if (item.type === 'node') {
      if (onOpenNode) onOpenNode(item.target)
    } else if (item.type === 'beacon') {
      if (onDiscoverBeacon) onDiscoverBeacon()
    }
  }

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-explore-title"
    >
      <div
        ref={dialogRef}
        className="modal-dialog quick-explore-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2 id="quick-explore-title" className="modal-title">
              <span>✦</span> Quick Explore & Directory
            </h2>
            <p className="modal-subtitle">
              Interactive Navigation — “DHRUTI: The Living Intelligence Universe”
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close directory modal"
          >
            ✕
          </button>
        </div>

        <div className="modal-roadmap-list" role="list">
          {navigationItems.map((sec) => (
            <button
              key={sec.id}
              type="button"
              className={`roadmap-item roadmap-item-btn ${sec.isCurrent ? 'is-current' : ''}`}
              role="listitem"
              onClick={() => handleItemClick(sec)}
              aria-label={`Navigate to ${sec.name}`}
            >
              <div className="roadmap-item-info">
                <span className="roadmap-index">{sec.id}</span>
                <div className="roadmap-text-group">
                  <div className="roadmap-name-row">
                    <span className="roadmap-name">{sec.name}</span>
                    {sec.isCurrent && <span className="roadmap-current-badge">Current View</span>}
                  </div>
                  <div className="roadmap-desc">
                    {sec.description}
                  </div>
                </div>
              </div>

              <div className="roadmap-item-action">
                <span
                  className={`roadmap-status-pill ${
                    sec.status === 'Active' || sec.status === 'Live Panel'
                      ? 'status-active'
                      : sec.status === 'Confidential'
                      ? 'status-confidential'
                      : 'status-discovery'
                  }`}
                >
                  {sec.status}
                </span>
                <span className="roadmap-action-arrow" aria-hidden="true">→</span>
              </div>
            </button>
          ))}
        </div>

        <div className="modal-note">
          <strong>Direct Navigation:</strong> Click any section above to jump straight to its 3D hologram panel or portal view.
          Engineering projects remain strictly confidential in private development on GitHub.
        </div>
      </div>
    </div>
  )
}

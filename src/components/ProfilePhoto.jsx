import { useState } from 'react'

/**
 * ProfilePhoto Component
 * Displays a clean, responsive profile photo with futuristic cosmic accents.
 * If no photo is provided or if the image fails to load, seamlessly displays
 * an authentic monogram placeholder with zero layout shift.
 * Fully prepared for future real image drop-in (e.g. /profile.jpg or external URL).
 */
export default function ProfilePhoto({
  photoUrl = null,
  name = 'Dhruti',
  placeholderText = 'Professional photo coming soon',
}) {
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const showRealPhoto = Boolean(photoUrl) && !hasError

  return (
    <div
      className="profile-photo-wrapper"
      role="img"
      aria-label={showRealPhoto ? `${name}'s Profile Photo` : placeholderText}
    >
      {showRealPhoto ? (
        <div className="profile-photo-image-container">
          <img
            src={photoUrl}
            alt={`${name}`}
            className={`profile-photo-img ${isLoaded ? 'is-loaded' : 'is-loading'}`}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            loading="lazy"
          />
          <span className="avatar-orbit" aria-hidden="true" />
          <span className="avatar-pulse-glow" aria-hidden="true" />
        </div>
      ) : (
        <div className="about-avatar-placeholder" aria-label="Professional photo placeholder">
          <span className="avatar-monogram">{name ? name.charAt(0) : 'D'}</span>
          <span className="avatar-orbit" aria-hidden="true" />
          <span className="avatar-pulse-glow" aria-hidden="true" />
        </div>
      )}
    </div>
  )
}

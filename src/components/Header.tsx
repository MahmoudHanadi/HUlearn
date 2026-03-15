import type { Track } from '../content/types'
import type { Route } from '../lib/app-state'
import hulearnLogo from '../assets/hulearn-logo.svg'

interface HeaderProps {
  currentTrack?: Track
  route: Route
  onHome: () => void
  onCurated: () => void
  onAbout: () => void
}

export function Header({
  currentTrack,
  route,
  onHome,
  onCurated,
  onAbout,
}: HeaderProps) {
  return (
    <header className="topbar">
      <div className="topbar-main">
        <button className="brand-block" onClick={onHome} type="button">
          <span className="brand-mark">
            <img
              alt=""
              aria-hidden="true"
              className="brand-mark-logo"
              src={hulearnLogo}
            />
          </span>
          <span>
            <strong>HUlearn</strong>
            <small>Hungarian practice portal</small>
          </span>
        </button>

        <nav className="topbar-nav" aria-label="Primary">
          <button
            className={`nav-button ${route.view === 'home' ? 'nav-button-active' : ''}`}
            onClick={onHome}
            type="button"
          >
            Library
          </button>
          <button
            className={`nav-button ${route.view === 'curated' ? 'nav-button-active' : ''}`}
            onClick={onCurated}
            type="button"
          >
            Curated Learning
          </button>
          <button
            className={`nav-button ${route.view === 'about' ? 'nav-button-active' : ''}`}
            onClick={onAbout}
            type="button"
          >
            About
          </button>
        </nav>
      </div>

      <div className="topbar-meta">
        {currentTrack ? (
          <span className={`subtle-pill track-pill track-${currentTrack.id}`}>
            {currentTrack.name}
          </span>
        ) : null}
      </div>
    </header>
  )
}

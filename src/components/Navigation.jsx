import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navigation.css'

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lang, setLang] = useState('EN')

  const toggleLang = () => setLang(lang === 'EN' ? 'CZ' : 'EN')

  return (
    <nav className="nav">
      <div className="nav-lang" onClick={toggleLang}>
        {lang === 'EN' ? 'CZ / EN' : 'EN / CZ'}
      </div>

      <button
        className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav-menu ${menuOpen ? 'visible' : ''}`}>
        <Link to="/gallery" onClick={() => setMenuOpen(false)}>
          {lang === 'EN' ? 'Gallery' : 'Galerie'}
        </Link>
        <Link to="/pricing" onClick={() => setMenuOpen(false)}>
          {lang === 'EN' ? 'Pricing' : 'Ceník'}
        </Link>
        <Link to="/bio" onClick={() => setMenuOpen(false)}>
          Bio
        </Link>
      </div>
    </nav>
  )
}
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../components/Navigation'
import './Bio.css'

export default function Bio() {
  const [lang, setLang] = useState('EN')

  return (
    <div className="bio-page">
      <Navigation lang={lang} setLang={setLang} />

      <header className="bio-header">
        <h1>Bio</h1>
      </header>

      <main className="bio-content">
        <div className="bio-photo">
          <div className="bio-photo-placeholder">📷</div>
        </div>

        <div className="bio-text">
          <h2>{lang === 'EN' ? 'About me' : 'O mně'}</h2>
          <p>
            {lang === 'EN'
              ? 'Hi, my name is Luděk. I have been painting miniatures for many years. I actively play Warhammer Underworlds, Kill Team and Old World. My other hobbies include...'
              : 'Ahoj, jmenuji se Luděk. Maluji miniatury již mnoho let. Aktivně hraji Warhammer Underworlds, Kill Team a Old World. Mezi moje další koníčky patří...'}
          </p>
          <ul className="bio-games">
            <li>Warhammer Underworlds</li>
            <li>Kill Team</li>
            <li>Old World</li>
          </ul>
        </div>
      </main>

      <footer className="bio-footer">
        <Link to="/" className="footer-home">
          {lang === 'EN' ? '← Home' : '← Domů'}
        </Link>
      </footer>
    </div>
  )
}

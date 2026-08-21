import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import Navigation from '../components/Navigation'
import './Bio.css'

export default function Bio() {
  const [lang, setLang] = useState('EN')
  const [bio, setBio] = useState(null)

  useEffect(() => {
    fetchBio()
  }, [])

  const fetchBio = async () => {
    const { data } = await supabase
      .from('am_bio')
      .select('*')
      .single()
    if (data) setBio(data)
  }

  return (
    <div className="bio-page">
      <Navigation lang={lang} setLang={setLang} />

      <header className="bio-header">
        <h1>Bio</h1>
      </header>

      <main className="bio-content">
        <div className="bio-photo">
          {bio?.photo_url
            ? <img src={bio.photo_url} alt="Luděk" />
            : <div className="bio-photo-placeholder">📷</div>
          }
        </div>

        <div className="bio-text">
          <h2>{lang === 'EN' ? 'About me' : 'O mně'}</h2>
          <p>
            {bio
              ? (lang === 'EN' ? bio.text_en : bio.text_cz)
              : (lang === 'EN' ? 'Loading...' : 'Načítám...')}
          </p>
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
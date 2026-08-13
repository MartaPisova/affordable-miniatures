import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import Navigation from '../components/Navigation'
import './Gallery.css'

export default function Gallery() {
  const [lang, setLang] = useState('EN')
  const [galleries, setGalleries] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetchGalleries()
  }, [])

  const fetchGalleries = async () => {
    const { data } = await supabase
      .from('am_gallery')
      .select('*')
      .order('sort_order')
    if (data) setGalleries(data)
  }

  const fetchPhotos = async (galleryId) => {
    const { data } = await supabase
      .from('am_gallery_photos')
      .select('*')
      .eq('gallery_id', galleryId)
      .order('sort_order')
    return data || []
  }

  const handleSelect = async (item) => {
    const photos = await fetchPhotos(item.id)
    setSelected({ ...item, photos })
  }

  return (
    <div className="gallery-page">
      <Navigation lang={lang} setLang={setLang} />

      <header className="gallery-header">
        <h1>{lang === 'EN' ? 'Gallery' : 'Galerie'}</h1>
      </header>

      <main className="gallery-grid">
        {galleries.map(item => (
          <div
            key={item.id}
            className="gallery-card"
            onClick={() => handleSelect(item)}
          >
            <div className="gallery-card-photo">
              {item.flag_photo_url
                ? <img src={item.flag_photo_url} alt={item.title_en} />
                : <div className="gallery-card-placeholder">{lang === 'EN' ? item.title_en : item.title_cz}</div>
              }
            </div>
            <div className="gallery-card-title">
              {lang === 'EN' ? item.title_en : item.title_cz}
            </div>
          </div>
        ))}
        {galleries.length === 0 && (
          <p style={{ color: 'var(--color-text-muted)' }}>
            {lang === 'EN' ? 'No galleries yet.' : 'Zatím žádné galerie.'}
          </p>
        )}
      </main>

      {selected && (
        <div className="gallery-lightbox" onClick={() => setSelected(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelected(null)}>✕</button>

            <h2>{lang === 'EN' ? selected.title_en : selected.title_cz}</h2>
            <p className="lightbox-desc">
              {lang === 'EN' ? selected.description_en : selected.description_cz}
            </p>

            <div className="lightbox-photos">
              {selected.flag_photo_url && (
                <div className="lightbox-photo">
                  <img src={selected.flag_photo_url} alt={selected.title_en} />
                </div>
              )}
              {selected.photos && selected.photos.map((photo, i) => (
                <div key={i} className="lightbox-photo">
                  <img src={photo.photo_url} alt={`foto ${i + 1}`} />
                </div>
              ))}
            </div>

            {selected.price_category_slug && (
              <Link
                to={`/pricing/${selected.price_category_slug}`}
                className="lightbox-link"
                onClick={() => setSelected(null)}
              >
                {lang === 'EN' ? '→ See pricing' : '→ Zobrazit ceník'}
              </Link>
            )}
          </div>
        </div>
      )}

      <footer className="gallery-footer">
        <Link to="/" className="footer-home">
          {lang === 'EN' ? '← Home' : '← Domů'}
        </Link>
      </footer>
    </div>
  )
}
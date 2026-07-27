import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../components/Navigation'
import './Gallery.css'

const PLACEHOLDER_GALLERIES = [
  { id: 1, title_en: 'Stormcast Eternals', title_cz: 'Stormcast Eternals', description_en: 'A golden warrior host of Sigmar.', description_cz: 'Zlatá armáda Sigmara.', price_category_slug: 'army', photos: ['Foto A1', 'Foto A2', 'Foto A3'] },
  { id: 2, title_en: 'Nighthaunt Gang', title_cz: 'Noční přízraky', description_en: 'Ghostly undead warband.', description_cz: 'Přízračná banda nemrtvých.', price_category_slug: 'gang', photos: ['Foto B1', 'Foto B2'] },
  { id: 3, title_en: 'Skaven Warlord', title_cz: 'Skaven válečník', description_en: 'Single display miniature.', description_cz: 'Jednotlivá výstavní miniatura.', price_category_slug: 'single-miniature', photos: ['Foto C1', 'Foto C2', 'Foto C3', 'Foto C4'] },
  { id: 4, title_en: 'Orruk Warband', title_cz: 'Orruk banda', description_en: 'Fight warband commission.', description_cz: 'Bojová banda na zakázku.', price_category_slug: 'fight-warband', photos: ['Foto D1', 'Foto D2'] },
  { id: 5, title_en: 'Chaos Warriors', title_cz: 'Chaos válečníci', description_en: 'Display piece with scenic base.', description_cz: 'Výstavní kus se scénickým podstavcem.', price_category_slug: 'display-piece', photos: ['Foto E1', 'Foto E2', 'Foto E3'] },
  { id: 6, title_en: 'Sylvaneth Grove', title_cz: 'Sylvaneth háj', description_en: 'Army commission with custom basing.', description_cz: 'Armáda na zakázku s vlastními podstavci.', price_category_slug: 'army', photos: ['Foto F1', 'Foto F2'] },
]

export default function Gallery() {
  const [lang, setLang] = useState('EN')
  const [selected, setSelected] = useState(null)

  return (
    <div className="gallery-page">
      <Navigation lang={lang} setLang={setLang} />

      <header className="gallery-header">
        <h1>{lang === 'EN' ? 'Gallery' : 'Galerie'}</h1>
      </header>

      <main className="gallery-grid">
        {PLACEHOLDER_GALLERIES.map(item => (
          <div
            key={item.id}
            className="gallery-card"
            onClick={() => setSelected(item)}
          >
            <div className="gallery-card-photo">
              <div className="gallery-card-placeholder">
                {lang === 'EN' ? item.title_en : item.title_cz}
              </div>
            </div>
            <div className="gallery-card-title">
              {lang === 'EN' ? item.title_en : item.title_cz}
            </div>
          </div>
        ))}
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
              {selected.photos.map((photo, i) => (
                <div key={i} className="lightbox-photo">
                  <div className="lightbox-placeholder">{photo}</div>
                </div>
              ))}
            </div>

            <Link
              to={`/pricing/${selected.price_category_slug}`}
              className="lightbox-link"
              onClick={() => setSelected(null)}
            >
              {lang === 'EN' ? '→ See pricing' : '→ Zobrazit ceník'}
            </Link>
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

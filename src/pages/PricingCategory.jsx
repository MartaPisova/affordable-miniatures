import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navigation from '../components/Navigation'
import './PricingCategory.css'

const PLACEHOLDER_CATEGORIES = {
  'army': {
    name_en: 'Army',
    name_cz: 'Armáda',
    description_en: 'Paint a whole army. Standard price range: 150€/$+. This of course heavily depends on size of army, how detailed models should be, etc. Standard price is 10$ per miniature – clipping, glueing, priming, painting and basing.',
    description_cz: 'Celá armáda na zakázku. Standardní cenové rozmezí: 150€/$ a více. Závisí na velikosti armády, požadované detailnosti atd. Standardní cena je 10$ za miniaturu – střih, lepení, základování, lakování a podstavec.',
    photos: ['Foto 1', 'Foto 2', 'Foto 3', 'Foto 4', 'Foto 5', 'Foto 6'],
  },
  'gang': {
    name_en: 'Gang',
    name_cz: 'Gang',
    description_en: 'A smaller group of fighters. Priced individually based on complexity and number of models.',
    description_cz: 'Menší skupina bojovníků. Cena individuálně podle složitosti a počtu modelů.',
    photos: ['Foto 1', 'Foto 2', 'Foto 3', 'Foto 4'],
  },
  'fight-warband': {
    name_en: 'Fight Warband',
    name_cz: 'Bojová banda',
    description_en: 'Warbands for games like Warhammer Underworlds or Kill Team. Assembly, painting and basing included.',
    description_cz: 'Bandy pro hry jako Warhammer Underworlds nebo Kill Team. Zahrnuje sestavení, lakování a podstavec.',
    photos: ['Foto 1', 'Foto 2', 'Foto 3'],
  },
  'single-miniature': {
    name_en: 'Single Miniature',
    name_cz: 'Jednotlivá miniatura',
    description_en: 'A single model painted to a high standard. Great for heroes, leaders or special characters.',
    description_cz: 'Jednotlivý model lakovaný na vysoké úrovni. Skvělé pro hrdiny, velitele nebo speciální postavy.',
    photos: ['Foto 1', 'Foto 2', 'Foto 3', 'Foto 4'],
  },
  'display-piece': {
    name_en: 'Display Piece',
    name_cz: 'Výstavní kus',
    description_en: 'A showcase miniature painted to the highest level, with scenic basing and fine details.',
    description_cz: 'Výstavní miniatura lakovaná na nejvyšší úrovni, se scénickým podstavcem a jemnými detaily.',
    photos: ['Foto 1', 'Foto 2', 'Foto 3'],
  },
}

export default function PricingCategory() {
  const { slug } = useParams()
  const [lang, setLang] = useState('EN')
  const category = PLACEHOLDER_CATEGORIES[slug]

  if (!category) {
    return (
      <div className="pricing-category-page">
        <Navigation lang={lang} setLang={setLang} />
        <div className="category-not-found">
          <p>{lang === 'EN' ? 'Category not found.' : 'Kategorie nenalezena.'}</p>
          <Link to="/pricing">{lang === 'EN' ? '← Back to Pricing' : '← Zpět na ceník'}</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pricing-category-page">
      <Navigation lang={lang} setLang={setLang} />

      <header className="category-header">
        <h1>{lang === 'EN' ? category.name_en : category.name_cz}</h1>
        <p className="category-desc">
          {lang === 'EN' ? category.description_en : category.description_cz}
        </p>
      </header>

      <main className="category-photos">
        {category.photos.map((photo, index) => (
          <div key={index} className="category-photo">
            <div className="category-placeholder">{photo}</div>
          </div>
        ))}
      </main>

      <footer className="category-footer">
        <Link to="/pricing" className="footer-back">
          {lang === 'EN' ? '← Back to Pricing' : '← Zpět na ceník'}
        </Link>
      </footer>
    </div>
  )
}

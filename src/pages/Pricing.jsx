import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../components/Navigation'
import './Pricing.css'

const PLACEHOLDER_CATEGORIES = [
  {
    slug: 'army',
    name_en: 'Army',
    name_cz: 'Armáda',
    description_en: 'Paint a whole army. Standard price range: 150€/$+. This of course heavily depends on size of army, how detailed models should be, etc. Standard price is 10$ per miniature – clipping, glueing, priming, painting and basing.',
    description_cz: 'Celá armáda na zakázku. Standardní cenové rozmezí: 150€/$ a více. Závisí na velikosti armády, požadované detailnosti atd. Standardní cena je 10$ za miniaturu – střih, lepení, základování, lakování a podstavec.',
    icon: '⚔️',
  },
  {
    slug: 'gang',
    name_en: 'Gang',
    name_cz: 'Gang',
    description_en: 'A smaller group of fighters. Priced individually based on complexity and number of models.',
    description_cz: 'Menší skupina bojovníků. Cena individuálně podle složitosti a počtu modelů.',
    icon: '🗡️',
  },
  {
    slug: 'fight-warband',
    name_en: 'Fight Warband',
    name_cz: 'Bojová banda',
    description_en: 'Warbands for games like Warhammer Underworlds or Kill Team. Assembly, painting and basing included.',
    description_cz: 'Bandy pro hry jako Warhammer Underworlds nebo Kill Team. Zahrnuje sestavení, lakování a podstavec.',
    icon: '🛡️',
  },
  {
    slug: 'single-miniature',
    name_en: 'Single Miniature',
    name_cz: 'Jednotlivá miniatura',
    description_en: 'A single model painted to a high standard. Great for heroes, leaders or special characters.',
    description_cz: 'Jednotlivý model lakovaný na vysoké úrovni. Skvělé pro hrdiny, velitele nebo speciální postavy.',
    icon: '🧙',
  },
  {
    slug: 'display-piece',
    name_en: 'Display Piece',
    name_cz: 'Výstavní kus',
    description_en: 'A showcase miniature painted to the highest level, with scenic basing and fine details.',
    description_cz: 'Výstavní miniatura lakovaná na nejvyšší úrovni, se scénickým podstavcem a jemnými detaily.',
    icon: '👑',
  },
]

export default function Pricing() {
  const [lang, setLang] = useState('EN')

  return (
    <div className="pricing-page">
      <Navigation lang={lang} setLang={setLang} />

      <header className="pricing-header">
        <h1>{lang === 'EN' ? 'Pricing' : 'Ceník'}</h1>
        <p className="pricing-intro">
          {lang === 'EN'
            ? 'Each offer is valued separately and according to its individual complexity. Miniatures shown here are for assembly, painting and basing.'
            : 'Každá zakázka je oceněna samostatně podle její individuální složitosti. Miniatury zde jsou určeny pro sestavení, lakování a podstavec.'}
        </p>
      </header>

      <main className="pricing-list">
        {PLACEHOLDER_CATEGORIES.map(cat => (
          <Link
            to={`/pricing/${cat.slug}`}
            key={cat.slug}
            className="pricing-item"
          >
            <div className="pricing-item-photo">
              <div className="pricing-item-placeholder">{cat.icon}</div>
            </div>
            <div className="pricing-item-info">
              <h2>{lang === 'EN' ? cat.name_en : cat.name_cz}</h2>
              <p>{lang === 'EN' ? cat.description_en : cat.description_cz}</p>
            </div>
          </Link>
        ))}
      </main>

      <footer className="pricing-footer">
        <Link to="/" className="footer-home">
          {lang === 'EN' ? '← Home' : '← Domů'}
        </Link>
      </footer>
    </div>
  )
}
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import Navigation from '../components/Navigation'
import './Pricing.css'

export default function Pricing() {
  const [lang, setLang] = useState('EN')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('am_price_categories')
      .select('*')
      .order('sort_order')
    if (data) setCategories(data)
  }

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
        {categories.map(cat => (
          <Link
            to={`/pricing/${cat.slug}`}
            key={cat.slug}
            className="pricing-item"
          >
            <div className="pricing-item-photo">
              <div className="pricing-item-placeholder">⚔️</div>
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
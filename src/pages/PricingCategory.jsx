import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import Navigation from '../components/Navigation'
import './PricingCategory.css'

export default function PricingCategory() {
  const { slug } = useParams()
  const [lang, setLang] = useState('EN')
  const [category, setCategory] = useState(null)
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    fetchCategory()
  }, [slug])

  const fetchCategory = async () => {
    const { data } = await supabase
      .from('am_price_categories')
      .select('*')
      .eq('slug', slug)
      .single()
    if (data) {
      setCategory(data)
      fetchPhotos(data.id)
    }
  }

  const fetchPhotos = async (categoryId) => {
    const { data } = await supabase
      .from('am_price_photos')
      .select('*')
      .eq('category_id', categoryId)
      .order('sort_order')
    if (data) setPhotos(data)
  }

  if (!category) return <div style={{ padding: '3rem', color: 'var(--color-text-muted)' }}>Načítám...</div>

  return (
    <div className="pricing-category-page">
      <Navigation lang={lang} setLang={setLang} />

      <header className="category-header">
        <h1>{lang === 'EN' ? category.name_en : category.name_cz}</h1>
        <p className="category-desc">
          {lang === 'EN' ? category.description_en : category.description_cz}
        </p>
        {(category.price_info_en || category.price_info_cz) && (
          <p className="category-price-info">
            {lang === 'EN' ? category.price_info_en : category.price_info_cz}
          </p>
        )}
      </header>

      <main className="category-photos">
        {photos.map((photo, index) => (
          <div key={photo.id} className="category-photo">
            <img src={photo.photo_url} alt={`foto ${index + 1}`} />
          </div>
        ))}
        {photos.length === 0 && (
          <p style={{ color: 'var(--color-text-muted)' }}>
            {lang === 'EN' ? 'No photos yet.' : 'Zatím žádné fotky.'}
          </p>
        )}
      </main>

      <footer className="category-footer">
        <Link to="/pricing" className="footer-back">
          {lang === 'EN' ? '← Back to Pricing' : '← Zpět na ceník'}
        </Link>
      </footer>
    </div>
  )
}
import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import Navigation from '../components/Navigation'
import './Homepage.css'

export default function Homepage() {
  const [slides, setSlides] = useState([])
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    fetchSlides()
  }, [])

  useEffect(() => {
    if (slides.length === 0) return
    const timer = setInterval(() => {
      setOffset(prev => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [slides.length])

  const fetchSlides = async () => {
    const { data } = await supabase
      .from('am_slideshow')
      .select('*')
      .order('sort_order')
    if (data && data.length > 0) setSlides(data)
  }

  const getVisible = () => {
    if (slides.length === 0) return []
    return [0, 1, 2, 3].map(i => slides[(offset + i) % slides.length])
  }

  return (
    <div className="homepage">
      <Navigation />

      <header className="homepage-header">
        <h1 className="homepage-title">
          <span>Affordable</span>
          <span>Miniatures</span>
        </h1>
      </header>

      <main className="homepage-slideshow">
        <div className="slideshow-frame">
          {slides.length === 0 ? (
            <div className="slide">
              <div className="slide-placeholder">Slideshow</div>
            </div>
          ) : (
            getVisible().map((slide, index) => (
              <div key={`${slide.id}-${index}`} className="slide">
                <img src={slide.photo_url} alt={`Slide ${index + 1}`} />
              </div>
            ))
          )}
        </div>
      </main>

      <footer className="homepage-footer">
        <div className="footer-contact">
          <p>Luděk Pisa</p>
          <p>pisaludek@gmail.com</p>
          <p>IČO: </p>
        </div>
        <div className="footer-copy">
          © {new Date().getFullYear()} Affordable Miniatures
        </div>
      </footer>
    </div>
  )
}
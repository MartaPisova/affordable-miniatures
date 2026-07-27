import { useState, useEffect } from 'react'
import Navigation from '../components/Navigation'
import './Homepage.css'

const PLACEHOLDER_SLIDES = [
  { id: 1, label: 'Foto 1' },
  { id: 2, label: 'Foto 2' },
  { id: 3, label: 'Foto 3' },
  { id: 4, label: 'Foto 4' },
  { id: 5, label: 'Foto 5' },
]

export default function Homepage() {
  const [slides] = useState(PLACEHOLDER_SLIDES)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setOffset(prev => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [slides.length])

  const getVisible = () => {
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
          {getVisible().map((slide, index) => (
            <div key={`${slide.id}-${index}`} className="slide">
              {slide.photo_url ? (
                <img src={slide.photo_url} alt={slide.label} />
              ) : (
                <div className="slide-placeholder">{slide.label}</div>
              )}
            </div>
          ))}
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
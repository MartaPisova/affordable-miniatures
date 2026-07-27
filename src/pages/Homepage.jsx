import Navigation from '../components/Navigation'
import './Homepage.css'

export default function Homepage() {
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
          <div className="slideshow-placeholder">
            SLIDESHOW
          </div>
          <div className="slideshow-bar"></div>
        </div>
      </main>

      <footer className="homepage-footer">
        <div className="footer-contact">
          <p>Luděk Píša</p>
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
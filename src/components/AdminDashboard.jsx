import { useState } from 'react'
import AdminSlideshow from './AdminSlideshow'
import AdminGallery from './AdminGallery'
import AdminPricing from './AdminPricing'
import AdminBio from './AdminBio'
import './AdminDashboard.css'

const TABS = [
  { id: 'slideshow', label: 'Slideshow' },
  { id: 'gallery', label: 'Galerie' },
  { id: 'pricing', label: 'Ceník' },
  { id: 'bio', label: 'Bio' },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('slideshow')

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Admin</h1>
        <nav className="dashboard-tabs">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`dashboard-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="dashboard-content">
        {activeTab === 'slideshow' && <AdminSlideshow />}
        {activeTab === 'gallery' && <AdminGallery />}
        {activeTab === 'pricing' && <AdminPricing />}
        {activeTab === 'bio' && <AdminBio />}
      </main>
    </div>
  )
}
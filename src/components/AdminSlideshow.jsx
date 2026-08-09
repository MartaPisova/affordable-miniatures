import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export default function AdminSlideshow() {
  const [slides, setSlides] = useState([])
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchSlides()
  }, [])

  const fetchSlides = async () => {
    const { data } = await supabase
      .from('am_slideshow')
      .select('*')
      .order('sort_order')
    if (data) setSlides(data)
  }

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    setMessage('')

    const fileName = `slideshow/${Date.now()}_${file.name}`
    const { error: uploadError } = await supabase.storage
      .from('am-photos')
      .upload(fileName, file)

    if (uploadError) {
      setMessage('Chyba při nahrávání: ' + uploadError.message)
      setUploading(false)
      return
    }

    const { data: urlData } = supabase.storage
      .from('am-photos')
      .getPublicUrl(fileName)

    const { error: dbError } = await supabase
      .from('am_slideshow')
      .insert({ photo_url: urlData.publicUrl, sort_order: slides.length })

    if (dbError) {
      setMessage('Chyba při ukládání: ' + dbError.message)
    } else {
      setMessage('Fotka nahrána!')
      fetchSlides()
    }

    setUploading(false)
  }

  const handleDelete = async (id, photo_url) => {
    const fileName = photo_url.split('/am-photos/')[1]
    await supabase.storage.from('am-photos').remove([fileName])
    await supabase.from('am_slideshow').delete().eq('id', id)
    fetchSlides()
  }

  return (
    <div className="admin-section">
      <h2>Slideshow – Homepage</h2>
      <p className="admin-hint">Fotky se zobrazují na homepage v karuselu.</p>

      <label className="admin-upload-btn">
        {uploading ? 'Nahrávám...' : '+ Přidat fotku'}
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          style={{ display: 'none' }}
        />
      </label>

      {message && <p className="admin-message">{message}</p>}

      <div className="admin-photo-grid">
        {slides.map(slide => (
          <div key={slide.id} className="admin-photo-item">
            <img src={slide.photo_url} alt="slide" />
            <button
              className="admin-delete-btn"
              onClick={() => handleDelete(slide.id, slide.photo_url)}
            >
              Smazat
            </button>
          </div>
        ))}
        {slides.length === 0 && (
          <p className="admin-empty">Zatím žádné fotky.</p>
        )}
      </div>
    </div>
  )
}
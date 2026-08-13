import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import './AdminShared.css'

export default function AdminGallery() {
  const [galleries, setGalleries] = useState([])
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({
    title_en: '', title_cz: '',
    description_en: '', description_cz: '',
    price_category_slug: ''
  })
  const [flagPhoto, setFlagPhoto] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => { fetchGalleries() }, [])

  const fetchGalleries = async () => {
    const { data } = await supabase
      .from('am_gallery')
      .select('*')
      .order('sort_order')
    if (data) setGalleries(data)
  }

  const handleSave = async () => {
    setUploading(true)
    setMessage('')

    let flag_photo_url = selected?.flag_photo_url || ''

    if (flagPhoto) {
      const fileName = `gallery/flag_${Date.now()}_${flagPhoto.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
      const { error: uploadError } = await supabase.storage
        .from('am-photos')
        .upload(fileName, flagPhoto)

      if (uploadError) {
        setMessage('Chyba při nahrávání fotky: ' + uploadError.message)
        setUploading(false)
        return
      }

      const { data: urlData } = supabase.storage
        .from('am-photos')
        .getPublicUrl(fileName)
      flag_photo_url = urlData.publicUrl
    }

    if (selected) {
      await supabase.from('am_gallery').update({ ...form, flag_photo_url }).eq('id', selected.id)
      setMessage('Galerie uložena!')
    } else {
      await supabase.from('am_gallery').insert({ ...form, flag_photo_url, sort_order: galleries.length })
      setMessage('Galerie přidána!')
    }

    setSelected(null)
    setForm({ title_en: '', title_cz: '', description_en: '', description_cz: '', price_category_slug: '' })
    setFlagPhoto(null)
    fetchGalleries()
    setUploading(false)
  }

  const handleEdit = (gallery) => {
    setSelected(gallery)
    setForm({
      title_en: gallery.title_en,
      title_cz: gallery.title_cz,
      description_en: gallery.description_en || '',
      description_cz: gallery.description_cz || '',
      price_category_slug: gallery.price_category_slug || ''
    })
  }

  const handleDelete = async (id) => {
    await supabase.from('am_gallery').delete().eq('id', id)
    fetchGalleries()
  }

  return (
    <div className="admin-section">
      <h2>{selected ? 'Upravit galerii' : 'Přidat novou galerii'}</h2>

      <div className="admin-form">
        <input className="admin-input" placeholder="Název (EN)" value={form.title_en} onChange={e => setForm({ ...form, title_en: e.target.value })} />
        <input className="admin-input" placeholder="Název (CZ)" value={form.title_cz} onChange={e => setForm({ ...form, title_cz: e.target.value })} />
        <textarea className="admin-textarea" placeholder="Popis (EN)" value={form.description_en} onChange={e => setForm({ ...form, description_en: e.target.value })} />
        <textarea className="admin-textarea" placeholder="Popis (CZ)" value={form.description_cz} onChange={e => setForm({ ...form, description_cz: e.target.value })} />

        <select className="admin-input" value={form.price_category_slug} onChange={e => setForm({ ...form, price_category_slug: e.target.value })}>
          <option value="">-- Kategorie ceníku --</option>
          <option value="army">Army</option>
          <option value="gang">Gang</option>
          <option value="fight-warband">Fight Warband</option>
          <option value="single-miniature">Single Miniature</option>
          <option value="display-piece">Display Piece</option>
        </select>

        <label className="admin-upload-btn">
          {flagPhoto ? flagPhoto.name : 'Vybrat vlajkovou fotku'}
          <input type="file" accept="image/*" onChange={e => setFlagPhoto(e.target.files[0])} style={{ display: 'none' }} />
        </label>

        <button className="admin-save-btn" onClick={handleSave} disabled={uploading}>
          {uploading ? 'Ukládám...' : selected ? 'Uložit změny' : 'Přidat galerii'}
        </button>

        {selected && (
          <button className="admin-delete-btn" onClick={() => { setSelected(null); setForm({ title_en: '', title_cz: '', description_en: '', description_cz: '', price_category_slug: '' }) }}>
            Zrušit úpravy
          </button>
        )}
      </div>

      {message && <p className="admin-message">{message}</p>}

      <h2>Existující galerie</h2>
      <div className="admin-gallery-list">
        {galleries.map(g => (
          <div key={g.id} className="admin-gallery-item">
            {g.flag_photo_url && <img src={g.flag_photo_url} alt={g.title_en} />}
            <div className="admin-gallery-info">
              <strong>{g.title_en}</strong>
              <span>{g.title_cz}</span>
            </div>
            <div className="admin-gallery-actions">
              <button className="admin-save-btn" onClick={() => handleEdit(g)}>Upravit</button>
              <button className="admin-delete-btn" onClick={() => handleDelete(g.id)}>Smazat</button>
            </div>
          </div>
        ))}
        {galleries.length === 0 && <p className="admin-empty">Zatím žádné galerie.</p>}
      </div>
    </div>
  )
}
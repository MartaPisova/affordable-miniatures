import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import './AdminShared.css'

const CATEGORIES = [
  { slug: 'army', name: 'Army' },
  { slug: 'gang', name: 'Gang' },
  { slug: 'fight-warband', name: 'Fight Warband' },
  { slug: 'single-miniature', name: 'Single Miniature' },
  { slug: 'display-piece', name: 'Display Piece' },
]

export default function AdminPricing() {
  const [selected, setSelected] = useState(CATEGORIES[0].slug)
  const [form, setForm] = useState({ description_en: '', description_cz: '', price_info_en: '', price_info_cz: '' })
  const [photos, setPhotos] = useState([])
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchCategory()
    fetchPhotos()
  }, [selected])

  const fetchCategory = async () => {
    const { data } = await supabase
      .from('am_price_categories')
      .select('*')
      .eq('slug', selected)
      .single()
    if (data) setForm({
      description_en: data.description_en || '',
      description_cz: data.description_cz || '',
      price_info_en: data.price_info_en || '',
      price_info_cz: data.price_info_cz || '',
    })
  }

  const fetchPhotos = async () => {
    const { data: cat } = await supabase
      .from('am_price_categories')
      .select('id')
      .eq('slug', selected)
      .single()
    if (!cat) return
    const { data } = await supabase
      .from('am_price_photos')
      .select('*')
      .eq('category_id', cat.id)
      .order('sort_order')
    if (data) setPhotos(data)
  }

  const handleSave = async () => {
    setMessage('')
    await supabase
      .from('am_price_categories')
      .update(form)
      .eq('slug', selected)
    setMessage('Uloženo!')
  }

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    setMessage('')

    const fileName = `pricing/${selected}_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
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

    const { data: cat } = await supabase
      .from('am_price_categories')
      .select('id')
      .eq('slug', selected)
      .single()

    await supabase.from('am_price_photos').insert({
      category_id: cat.id,
      photo_url: urlData.publicUrl,
      sort_order: photos.length
    })

    setMessage('Fotka nahrána!')
    fetchPhotos()
    setUploading(false)
  }

  const handleDelete = async (id, photo_url) => {
    const fileName = photo_url.split('/am-photos/')[1]
    await supabase.storage.from('am-photos').remove([fileName])
    await supabase.from('am_price_photos').delete().eq('id', id)
    fetchPhotos()
  }

  return (
    <div className="admin-section">
      <h2>Ceník</h2>

      <div className="admin-category-tabs">
        {CATEGORIES.map(cat => (
          <button
            key={cat.slug}
            className={`dashboard-tab ${selected === cat.slug ? 'active' : ''}`}
            onClick={() => setSelected(cat.slug)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="admin-form">
        <textarea className="admin-textarea" placeholder="Popis (EN)" value={form.description_en} onChange={e => setForm({ ...form, description_en: e.target.value })} />
        <textarea className="admin-textarea" placeholder="Popis (CZ)" value={form.description_cz} onChange={e => setForm({ ...form, description_cz: e.target.value })} />
        <textarea className="admin-textarea" placeholder="Cenové informace (EN)" value={form.price_info_en} onChange={e => setForm({ ...form, price_info_en: e.target.value })} />
        <textarea className="admin-textarea" placeholder="Cenové informace (CZ)" value={form.price_info_cz} onChange={e => setForm({ ...form, price_info_cz: e.target.value })} />
        <button className="admin-save-btn" onClick={handleSave}>Uložit texty</button>
      </div>

      {message && <p className="admin-message">{message}</p>}

      <h3>Fotky kategorie</h3>
      <label className="admin-upload-btn">
        {uploading ? 'Nahrávám...' : '+ Přidat fotku'}
        <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} style={{ display: 'none' }} />
      </label>

      <div className="admin-photo-grid">
        {photos.map(photo => (
          <div key={photo.id} className="admin-photo-item">
            <img src={photo.photo_url} alt="pricing photo" />
            <button className="admin-delete-btn" onClick={() => handleDelete(photo.id, photo.photo_url)}>Smazat</button>
          </div>
        ))}
        {photos.length === 0 && <p className="admin-empty">Zatím žádné fotky.</p>}
      </div>
    </div>
  )
}
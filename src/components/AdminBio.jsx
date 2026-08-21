import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import './AdminShared.css'

export default function AdminBio() {
  const [form, setForm] = useState({ text_en: '', text_cz: '' })
  const [bioId, setBioId] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [currentPhoto, setCurrentPhoto] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchBio()
  }, [])

  const fetchBio = async () => {
    const { data } = await supabase
      .from('am_bio')
      .select('*')
      .single()
    if (data) {
      setBioId(data.id)
      setForm({ text_en: data.text_en || '', text_cz: data.text_cz || '' })
      setCurrentPhoto(data.photo_url)
    }
  }

  const handleSave = async () => {
    setUploading(true)
    setMessage('')

    let photo_url = currentPhoto

    if (photo) {
      const fileName = `bio/${Date.now()}_${photo.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
      const { error: uploadError } = await supabase.storage
        .from('am-photos')
        .upload(fileName, photo)

      if (uploadError) {
        setMessage('Chyba při nahrávání fotky: ' + uploadError.message)
        setUploading(false)
        return
      }

      const { data: urlData } = supabase.storage
        .from('am-photos')
        .getPublicUrl(fileName)
      photo_url = urlData.publicUrl
    }

    if (bioId) {
      await supabase.from('am_bio').update({ ...form, photo_url }).eq('id', bioId)
    } else {
      await supabase.from('am_bio').insert({ ...form, photo_url })
    }

    setMessage('Bio uloženo!')
    setCurrentPhoto(photo_url)
    setUploading(false)
    fetchBio()
  }

  return (
    <div className="admin-section">
      <h2>Bio</h2>

      {currentPhoto && (
        <div className="admin-bio-photo">
          <img src={currentPhoto} alt="bio" />
        </div>
      )}

      <div className="admin-form">
        <label className="admin-upload-btn">
          {photo ? photo.name : 'Vybrat fotku'}
          <input
            type="file"
            accept="image/*"
            onChange={e => setPhoto(e.target.files[0])}
            style={{ display: 'none' }}
          />
        </label>

        <textarea
          className="admin-textarea"
          placeholder="Text (EN)"
          value={form.text_en}
          onChange={e => setForm({ ...form, text_en: e.target.value })}
        />
        <textarea
          className="admin-textarea"
          placeholder="Text (CZ)"
          value={form.text_cz}
          onChange={e => setForm({ ...form, text_cz: e.target.value })}
        />

        <button className="admin-save-btn" onClick={handleSave} disabled={uploading}>
          {uploading ? 'Ukládám...' : 'Uložit bio'}
        </button>
      </div>

      {message && <p className="admin-message">{message}</p>}
    </div>
  )
}
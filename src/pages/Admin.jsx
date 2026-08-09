import { useState } from 'react'
import { supabase } from '../supabaseClient'
import AdminDashboard from '../components/AdminDashboard'
import './Admin.css'

export default function Admin() {
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

const handleLogin = async () => {
  setLoading(true)
  setError('')

  const { data, error } = await supabase
    .from('am_admin')
    .select('password_hash')
    .single()

  console.log('data:', data)
  console.log('error:', error)

  if (error || !data) {
    setError('Chyba při přihlášení.')
    setLoading(false)
    return
  }

  const bcrypt = await import('bcryptjs')
  const match = await bcrypt.compare(password, data.password_hash)
  console.log('match:', match)

  if (match) {
    setLoggedIn(true)
  } else {
    setError('Špatné heslo.')
  }

  setLoading(false)
}

  if (loggedIn) return <AdminDashboard />

  return (
    <div className="admin-login">
      <div className="admin-login-box">
        <h1>Admin</h1>
        <p>Zadej heslo pro přístup do administrace.</p>

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          placeholder="Heslo"
          className="admin-input"
        />

        {error && <p className="admin-error">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="admin-button"
        >
          {loading ? 'Přihlašuji...' : 'Přihlásit se'}
        </button>
      </div>
    </div>
  )
}

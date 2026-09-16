import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

function Dashboard() {
  const [user, setUser] = useState(null)
  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    supabase.from('subjects').select('*').then(({ data }) => {
      if (data) setSubjects(data)
    })
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>CEE Nexus</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {user && <p>Welcome, {user.email}</p>}

      <h2>Subjects</h2>

      {subjects.length === 0 ? (
        <p>No subjects yet.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {subjects.map(subject => (
            <div key={subject.id} style={{
              padding: '20px',
              border: '1px solid #444',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              <h3>{subject.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard
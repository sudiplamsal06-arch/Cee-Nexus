import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

function Dashboard() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <div style={{ padding: '40px' }}>
      <h1>Welcome to CEE Nexus</h1>
      {user && <p>Logged in as: {user.email}</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard
import { useState } from 'react'
import { supabase } from '../supabaseClient'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  async function handleAuth() {
    setLoading(true)
    setError('')
    setMessage('')

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      else setMessage('Check your email to confirm your account!')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
    }

    setLoading(false)
  }

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>CEE Nexus</h1>
      <p>Assam CEE Exam Preparation</p>

      <h2>{isSignUp ? 'Create Account' : 'Sign In'}</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', padding: '10px', width: '100%', marginBottom: '10px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', padding: '10px', width: '100%', marginBottom: '10px' }}
      />

      <button
        onClick={handleAuth}
        disabled={loading}
        style={{ padding: '10px 20px', marginBottom: '10px' }}
      >
        {loading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Sign In'}
      </button>

      <p>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
        >
          {isSignUp ? ' Sign In' : ' Sign Up'}
        </button>
      </p>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  )
}

export default Login
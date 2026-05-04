import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './MultiStepSignUp.css'

export default function MultiStepSignUp() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1: Account type, 2: Email, 3: Verification, 4: Details
  const [formData, setFormData] = useState({
    accountType: '',
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
  })
  
  // Specific state for the 6 digit verification code UI
  const [codeDigits, setCodeDigits] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef([])

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [cookieDismissed, setCookieDismissed] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  // Step 1: Select Account Type
  const handleAccountTypeSelect = (type) => {
    setFormData({ ...formData, accountType: type })
    setError('')
    setStep(2)
  }

  // Step 2: Send Verification Code
  const handleSendCode = async (e) => {
    e?.preventDefault()
    setError('')

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/auth/send-verification-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, accountType: formData.accountType }),
        credentials: 'include'
      })

      const data = await response.json()

      if (!data.success) {
        setError(data.message || 'Failed to send verification code')
        return
      }

      setStep(3)
    } catch (err) {
      setError(err.message || 'Error sending verification code')
    } finally {
      setLoading(false)
    }
  }

  // Manage individual digit boxes logic for Step 3
  const handleDigitChange = (index, value) => {
    // Only allow numbers
    const cleanValue = value.replace(/\D/g, '').slice(0, 1)
    
    const newDigits = [...codeDigits]
    newDigits[index] = cleanValue
    setCodeDigits(newDigits)

    // Auto-focus next input
    if (cleanValue && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleDigitKeyDown = (index, e) => {
    // Backspace logic to move focus to previous input
    if (e.key === 'Backspace' && !codeDigits[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  // Step 3: Verify Code
  const handleVerifyCode = async (e) => {
    e.preventDefault()
    setError('')
    
    const fullCode = codeDigits.join('')

    if (fullCode.length !== 6) {
      setError('Please properly enter the 6-digit code')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/auth/verify-email-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, code: fullCode }),
        credentials: 'include'
      })

      const data = await response.json()

      if (!data.success) {
        setError(data.message || 'Invalid verification code')
        return
      }
      setStep(4)
    } catch (err) {
      setError(err.message || 'Error verifying code')
    } finally {
      setLoading(false)
    }
  }

  // Step 4: Complete Signup
  const handleCompleteSignup = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.name || formData.name.trim().length < 2) {
      setError('Please enter a valid name')
      return
    }
    if (!formData.password || formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    const fullCode = codeDigits.join('')
    try {
      const response = await fetch(`${API_URL}/auth/complete-signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          code: fullCode,
          name: formData.name,
          password: formData.password,
          accountType: formData.accountType
        }),
        credentials: 'include'
      })

      const data = await response.json()

      if (!data.success) {
        setError(data.message || 'Error creating account')
        return
      }

      // Success, route to dashboard or home
      alert('🎉 Account created successfully! Redirecting you to your profile...')
      window.location.href = '/profile'
    } catch (err) {
      setError(err.message || 'Error completing signup')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="multi-step-signup">
      <div className="logo-header">C</div> {/* Optional Coinbase Logo Placeholder */}
      
      {/* Step 1: Account Type */}
      {step === 1 && (
        <div className="signup-container">
          <h1>What kind of account are you<br />creating?</h1>
          
          <div className="account-types">
            <div className="account-type-btn" onClick={() => handleAccountTypeSelect('personal')}>
              <div className="icon-box">
                <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </div>
              <div>
                <h3>Personal</h3>
                <p>Trade crypto as an individual.</p>
              </div>
            </div>

            <div className="account-type-btn" onClick={() => handleAccountTypeSelect('business')}>
              <div className="icon-box">
                <svg viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>
              </div>
              <div>
                <h3>Business</h3>
                <p>Manage teams and portfolios, accept crypto payments, access APIs, and more</p>
              </div>
            </div>

            <div className="account-type-btn" onClick={() => handleAccountTypeSelect('developer')}>
              <div className="icon-box">
                <svg viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
              </div>
              <div>
                <h3>Developer</h3>
                <p>Build onchain using developer tooling.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Email Input */}
      {step === 2 && (
        <div className="signup-container">
          <h1>Create your account</h1>
          <p>Access all that Coinbase has to offer with a single account.</p>

          <form onSubmit={handleSendCode}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Your email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={loading}
                autoFocus
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Processing...' : 'Continue'}
            </button>
          </form>

          <div className="separator">OR</div>

          <button type="button" className="btn btn-secondary" onClick={() => alert('Social Auth integrations are coming soon!')}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#fff" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg>
            Sign up with Google
          </button>
          
          <button type="button" className="btn btn-secondary" onClick={() => alert('Social Auth integrations are coming soon!')}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#fff" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.27-.72 3.59-.72 2.37.14 3.97 1.34 4.7 2.66-2.12 1.3-1.63 4.29.5 5.22-.5 1.58-1.28 2.87-2.64 4.14A17.9 17.9 0 0 1 17.05 20.28M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.02 4.1-3.74 4.25z"/></svg>
            Sign up with Apple
          </button>

          <div className="login-link">
            Already have an account? <Link to="/signin">Sign in</Link>
          </div>
          <div className="terms-text">
            By creating an account you certify that you are over the age of 18 and agree to our <a>Privacy Policy</a> and <a>Cookie Policy</a>.
          </div>
        </div>
      )}

      {/* Step 3: Verify Code */}
      {step === 3 && (
        <div className="signup-container" style={{ textAlign: "center" }}>
          <h1>Enter the code we emailed you</h1>
          <p>Check your email<br /><strong>{formData.email}</strong>. This helps us keep your account secure by verifying that it's really you.</p>

          <form onSubmit={handleVerifyCode} style={{ marginTop: '0' }}>
            <div style={{ textAlign: "left", fontSize: "14px", fontWeight: "600", color: "#fff", marginBottom: "-10px" }}>Enter 6-digit code</div>
            <div className="verification-code-container">
              {codeDigits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={el => inputRefs.current[idx] = el}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleDigitKeyDown(idx, e)}
                  disabled={loading}
                />
              ))}
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ display: 'none' }}>Verify</button>
            
            <button type="button" onClick={() => handleVerifyCode(new Event('submit'))} className="resend-btn" style={{ background: '#191A1D', color: '#a3a3a3', marginTop: '20px' }}>
              {loading ? 'Processing...' : 'Verify Code'}
            </button>
          </form>

          <div className="login-link" style={{ marginTop: '20px' }}>
            Can't access? <span className="link" onClick={() => setStep(2)}>Update your email</span>
          </div>
        </div>
      )}

      {/* Step 4: Complete Signup */}
      {step === 4 && (
        <div className="signup-container">
          <h1>Final Details</h1>
          <p>Create your password to secure your account.</p>

          <form onSubmit={handleCompleteSignup}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="First Last"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={loading}
                autoFocus
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                disabled={loading}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Creating account...' : 'Complete Profile'}
            </button>
          </form>
        </div>
      )}
      {/* Global Cookie Banner */}
      {!cookieDismissed && (
          <div className="cookie-banner" style={{position: 'fixed', bottom: 0, left: 0, width: '100%', backgroundColor: '#1A1B1D', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #333', zIndex: 1000, color: '#fff', fontSize: '14px', boxSizing: 'border-box'}}>
              <p style={{margin: 0, maxWidth: '800px', lineHeight: '1.5'}}>We use strictly necessary cookies to enable essential functions, such as security and authentication. For more information, see our <a href="#" style={{color: '#0052FF', textDecoration: 'none'}}>Cookie Policy</a>.</p>
              <button 
                onClick={() => setCookieDismissed(true)} 
                style={{backgroundColor: '#6C82FF', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '20px', fontWeight: '600', cursor: 'pointer', flexShrink: 0, marginLeft: '20px'}}>
                Dismiss
              </button>
          </div>
      )}
    </div>
  )
}

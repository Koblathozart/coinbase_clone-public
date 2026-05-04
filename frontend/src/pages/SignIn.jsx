import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import './SignIn.css'

function SignIn() {
	const navigate = useNavigate()
	const { login } = useContext(AuthContext)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	})
    const [cookieDismissed, setCookieDismissed] = useState(false)

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value
		}))
		setError(null)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!formData.email.includes('@')) {
			setError('Please enter a valid email')
			return
		}

		if (!formData.password) {
			setError('Please enter your password')
			return
		}

		setLoading(true)
		try {
			await login(formData.email, formData.password)
			navigate('/')
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<main className="signin-page">
            <div className="logo-header-signin">C</div>

			<div className="signin-container">
				<h1>Sign in to Coinbase</h1>
				<p>Access all that Coinbase has to offer with a single account.</p>

				<form onSubmit={handleSubmit}>
                    <div className="form-group-signin">
					    <label htmlFor="signin-email">Email</label>
					    <input
						    id="signin-email"
						    name="email"
						    type="email"
						    placeholder="Your email address"
						    value={formData.email}
						    onChange={handleChange}
						    disabled={loading}
					    />
                    </div>

                    <div className="form-group-signin">
					    <label htmlFor="signin-password">Password</label>
					    <input
						    id="signin-password"
						    name="password"
						    type="password"
						    placeholder="Your password"
						    value={formData.password}
						    onChange={handleChange}
						    disabled={loading}
					    />
                    </div>

                    {error && <div className="error-message-signin">{error}</div>}

					<button
						className="btn-primary-signin"
						disabled={loading}
						type="submit"
					>
						{loading ? 'Processing...' : 'Continue'}
					</button>
				</form>

                <div className="separator-signin">OR</div>

                <div className="oauth-buttons">
                    <button type="button" className="btn-secondary-signin">
                        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#fff" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg>
                        Sign in with Google
                    </button>
                    <button type="button" className="btn-secondary-signin">
                        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#fff" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.27-.72 3.59-.72 2.37.14 3.97 1.34 4.7 2.66-2.12 1.3-1.63 4.29.5 5.22-.5 1.58-1.28 2.87-2.64 4.14A17.9 17.9 0 0 1 17.05 20.28M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.02 4.1-3.74 4.25z"/></svg>
                        Sign in with Apple
                    </button>
                </div>
			</div>

            {/* Bottom Footer Writings */}
            <div className="signin-footer-links">
                <div className="signup-prompt">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
                <div className="device-prompt">
                    Not your device? Use a private window. See<br />our <a href="#">Privacy Policy</a> for more info.
                </div>
            </div>

            {/* Global Cookie Banner */}
            {!cookieDismissed && (
                <div className="cookie-banner">
                    <p>We use strictly necessary cookies to enable essential functions, such as security and authentication. For more information, see our <a href="#">Cookie Policy</a>.</p>
                    <button onClick={() => setCookieDismissed(true)}>Dismiss</button>
                </div>
            )}
		</main>
	)
}

export default SignIn

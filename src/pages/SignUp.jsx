import { Link } from 'react-router-dom'
import Button from '../components/common/Button'

function SignUp() {
	return (
		<main className="auth-page">
			<div className="auth-card">
				<h1>Create your Coinbase account</h1>
				<p>Get started in minutes with secure onboarding.</p>
				<label htmlFor="signup-email">Email</label>
				<input id="signup-email" type="email" placeholder="you@example.com" />
				<Button className="auth-btn">Create account</Button>
				<small>
					Already have an account? <Link to="/signin">Sign in</Link>
				</small>
			</div>
		</main>
	)
}

export default SignUp

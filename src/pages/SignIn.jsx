import { Link } from 'react-router-dom'
import Button from '../components/common/Button'

function SignIn() {
	return (
		<main className="auth-page">
			<div className="auth-card">
				<h1>Sign in to Coinbase</h1>
				<p>Welcome back. Enter your email to continue.</p>
				<label htmlFor="signin-email">Email</label>
				<input id="signin-email" type="email" placeholder="you@example.com" />
				<Button className="auth-btn">Continue</Button>
				<small>
					New to Coinbase? <Link to="/signup">Create account</Link>
				</small>
			</div>
		</main>
	)
}

export default SignIn

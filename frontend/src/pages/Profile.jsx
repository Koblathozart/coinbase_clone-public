import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import Button from '../components/common/Button'

function Profile() {
	const navigate = useNavigate()
	const { user, logout } = useContext(AuthContext)
	const [loading, setLoading] = useState(false)

	const handleLogout = async () => {
		setLoading(true)
		try {
			await logout()
			navigate('/signin')
		} catch (err) {
			console.error('Logout error:', err)
		} finally {
			setLoading(false)
		}
	}

	if (!user) {
		return (
			<main className="container" style={{ padding: '2rem' }}>
				<p>Loading user information...</p>
			</main>
		)
	}

	return (
		<main className="container" style={{ padding: '2rem' }}>
			<section style={{ maxWidth: '600px', margin: '0 auto' }}>
				<h1>Your Profile</h1>

				<div
					style={{
						backgroundColor: '#f5f5f5',
						padding: '2rem',
						borderRadius: '8px',
						marginTop: '2rem'
					}}
				>
					<div style={{ marginBottom: '1.5rem' }}>
						<label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
							Name
						</label>
						<p style={{ fontSize: '1.1rem', color: '#333' }}>{user.name}</p>
					</div>

					<div style={{ marginBottom: '1.5rem' }}>
						<label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
							Email
						</label>
						<p style={{ fontSize: '1.1rem', color: '#333' }}>{user.email}</p>
					</div>

					{user.createdAt && (
						<div style={{ marginBottom: '1.5rem' }}>
							<label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
								Member Since
							</label>
							<p style={{ fontSize: '1.1rem', color: '#333' }}>
								{new Date(user.createdAt).toLocaleDateString()}
							</p>
						</div>
					)}

					<Button
						onClick={handleLogout}
						disabled={loading}
						style={{
							backgroundColor: '#FF0000',
							color: 'white',
							marginTop: '2rem',
							width: '100%'
						}}
					>
						{loading ? 'Logging out...' : 'Log Out'}
					</Button>
				</div>
			</section>
		</main>
	)
}

export default Profile

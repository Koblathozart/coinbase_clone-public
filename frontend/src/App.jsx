import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Explore from './pages/Explore'
import AssetDetail from './pages/AssetDetail'
import Learn from './pages/Learn'
import SignIn from './pages/SignIn'
import MultiStepSignUp from './pages/MultiStepSignUp'
import Profile from './pages/Profile'
import MainLayout from './components/layout/MainLayout'
import { PrivateRoute } from './components/PrivateRoute'

function App() {
	return (
		<>
			<div style={{ backgroundColor: '#2C2D33', color: '#ffcc00', padding: '12px', textAlign: 'center', fontSize: '14px', borderBottom: '1px solid #ffcc00' }}>
				<strong>⚠️ Educational Project Only:</strong> Please do not use real usernames, passwords, or personal details on this site.
			</div>
			<Routes>
			{/* Auth routes (No Navbar/Footer) */}
			<Route path="/signin" element={<SignIn />} />
			<Route path="/signup" element={<MultiStepSignUp />} />

			{/* Main app routes with Layout */}
			<Route element={<MainLayout />}>
				<Route path="/" element={<Home />} />
				<Route path="/explore" element={<Explore />} />
				<Route path="/assets/:symbol" element={<AssetDetail />} />
				<Route path="/learn" element={<Learn />} />
				<Route path="/learn/:slug" element={<Learn />} />
				<Route
					path="/profile"
					element={
						<PrivateRoute>
							<Profile />
						</PrivateRoute>
					}
				/>
			</Route>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
		</>
	)
}

export default App

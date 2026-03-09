import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Explore from './pages/Explore'
import AssetDetail from './pages/AssetDetail'
import Learn from './pages/Learn'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import MainLayout from './components/layout/MainLayout'

function App() {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/" element={<Home />} />
				<Route path="/explore" element={<Explore />} />
				<Route path="/assets/:symbol" element={<AssetDetail />} />
				<Route path="/learn" element={<Learn />} />
				<Route path="/learn/:slug" element={<Learn />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
			</Route>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	)
}

export default App

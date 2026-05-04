import { useMemo, useState, useEffect } from 'react'
import CryptoCard from '../components/crypto/CryptoCard'
import { cryptoAPI } from '../services/api'

function Explore() {
	const [activeFilter, setActiveFilter] = useState('All assets')
	const [allCryptos, setAllCryptos] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const filters = ['All assets', 'Top gainers', 'Layer 1', 'DeFi', 'Stablecoins']

	// Fetch all cryptos on component mount
	useEffect(() => {
		const fetchCryptos = async () => {
			setLoading(true)
			setError(null)
			try {
				const response = await cryptoAPI.getAllCryptos()
				if (response.success) {
					setAllCryptos(response.data.cryptos)
				}
			} catch (err) {
				setError(err.message)
				console.error('Error fetching cryptos:', err)
			} finally {
				setLoading(false)
			}
		}

		fetchCryptos()
	}, [])

	const filteredAssets = useMemo(() => {
		if (activeFilter === 'Top gainers') {
			return [...allCryptos].sort((a, b) => b.change - a.change)
		}

		if (activeFilter === 'Stablecoins') {
			return allCryptos.filter((asset) => asset.symbol === 'USDC')
		}

		if (activeFilter === 'Layer 1') {
			return allCryptos.filter((asset) => ['BTC', 'ETH', 'SOL'].includes(asset.symbol))
		}

		if (activeFilter === 'DeFi') {
			return allCryptos.filter((asset) => ['ETH', 'BNB'].includes(asset.symbol))
		}

		return allCryptos
	}, [activeFilter, allCryptos])

	return (
		<main className="explore-page container">
			<section className="page-hero">
				<p>Explore</p>
				<h1>Browse markets, find trends, and discover new opportunities.</h1>
				<span>
					Track assets by category, compare movers, and jump into detailed pages with one
					click.
				</span>
			</section>

			<section className="asset-filter-row" aria-label="Asset category filters">
				{filters.map((filter) => (
					<button
						key={filter}
						type="button"
						onClick={() => setActiveFilter(filter)}
						className={activeFilter === filter ? 'asset-filter active' : 'asset-filter'}
					>
						{filter}
					</button>
				))}
			</section>

			{loading && (
				<section className="asset-grid" aria-label="Loading">
					<div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
						<p>Loading cryptocurrencies...</p>
					</div>
				</section>
			)}

			{error && (
				<section className="asset-grid" aria-label="Error">
					<div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: 'red' }}>
						<p>Error: {error}</p>
						<small>Please refresh the page or try again later.</small>
					</div>
				</section>
			)}

			{!loading && !error && filteredAssets.length === 0 && (
				<section className="asset-grid" aria-label="No assets">
					<div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
						<p>No cryptocurrencies found</p>
					</div>
				</section>
			)}

			{!loading && !error && filteredAssets.length > 0 && (
				<section className="asset-grid" aria-label="Explore assets list">
					{filteredAssets.map((asset) => (
						<CryptoCard key={asset.symbol} asset={asset} />
					))}
				</section>
			)}
		</main>
	)
}

export default Explore

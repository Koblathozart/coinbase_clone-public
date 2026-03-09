import { useMemo, useState } from 'react'
import CryptoCard from '../components/crypto/CryptoCard'
import { marketAssets } from '../data/marketAssets'

function Explore() {
	const [activeFilter, setActiveFilter] = useState('All assets')

	const filters = ['All assets', 'Top gainers', 'Layer 1', 'DeFi', 'Stablecoins']

	const filteredAssets = useMemo(() => {
		if (activeFilter === 'Top gainers') {
			return [...marketAssets].sort((a, b) => b.change - a.change)
		}

		if (activeFilter === 'Stablecoins') {
			return marketAssets.filter((asset) => asset.symbol === 'USDC')
		}

		if (activeFilter === 'Layer 1') {
			return marketAssets.filter((asset) => ['BTC', 'ETH', 'SOL'].includes(asset.symbol))
		}

		if (activeFilter === 'DeFi') {
			return marketAssets.filter((asset) => ['ETH', 'BNB'].includes(asset.symbol))
		}

		return marketAssets
	}, [activeFilter])

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

			<section className="asset-grid" aria-label="Explore assets list">
				{filteredAssets.map((asset) => (
					<CryptoCard key={asset.symbol} asset={asset} />
				))}
			</section>
		</main>
	)
}

export default Explore

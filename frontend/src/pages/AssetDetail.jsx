import { Link, useParams } from 'react-router-dom'
import { marketAssets } from '../data/marketAssets'

function AssetDetail() {
	const { symbol } = useParams()
	const upperSymbol = (symbol || '').toUpperCase()
	const asset = marketAssets.find((item) => item.symbol === upperSymbol)
	const selected = asset || {
		symbol: upperSymbol || 'ASSET',
		name: `${upperSymbol || 'Asset'} Coin`,
		price: 0,
		change: 0,
		marketCap: 'N/A',
	}

	return (
		<main className="asset-detail-page container">
			<section className="page-hero asset-hero">
				<p>{selected.symbol}</p>
				<h1>{selected.name} price and market data</h1>
				<span>
					Live snapshot with key metrics, trend context, and quick access to related market
					assets.
				</span>
			</section>

			<section className="asset-metrics" aria-label="Asset metrics">
				<article>
					<p>Price</p>
					<strong>${selected.price.toLocaleString('en-US', { maximumFractionDigits: 2 })}</strong>
				</article>
				<article>
					<p>24h change</p>
					<strong className={selected.change >= 0 ? 'up' : 'down'}>
						{selected.change >= 0 ? '+' : ''}
						{selected.change.toFixed(2)}%
					</strong>
				</article>
				<article>
					<p>Market cap</p>
					<strong>${selected.marketCap}</strong>
				</article>
			</section>

			<section className="asset-chart-panel" aria-label="Price trend chart placeholder">
				<div className="asset-chart-grid" />
				<div className="asset-chart-line" />
			</section>

			<p className="asset-back-link">
				<Link to="/explore">Back to Explore</Link>
			</p>
		</main>
	)
}

export default AssetDetail

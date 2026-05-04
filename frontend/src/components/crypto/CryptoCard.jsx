import { Link } from 'react-router-dom'
import Card from '../common/Card'

function CryptoCard({ asset }) {
	return (
		<Card className="asset-card">
			<div className="asset-card-top">
				<span className={`coin-badge ${asset.iconClass}`}>{asset.symbol.charAt(0)}</span>
				<div>
					<h3>{asset.name}</h3>
					<p>{asset.symbol}</p>
				</div>
			</div>
			<div className="asset-card-meta">
				<strong>${asset.price.toLocaleString('en-US', { maximumFractionDigits: 2 })}</strong>
				<span className={asset.change >= 0 ? 'up' : 'down'}>
					{asset.change >= 0 ? '+' : ''}
					{asset.change.toFixed(2)}%
				</span>
				<small>Market cap {asset.marketCap}</small>
			</div>
			<Link className="asset-card-link" to={`/assets/${asset.symbol.toLowerCase()}`}>
				View details
			</Link>
		</Card>
	)
}

export default CryptoCard

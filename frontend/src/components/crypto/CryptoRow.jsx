function CryptoRow({ asset, formatGhsPrice }) {
	return (
		<article className="market-row">
			<div className="market-coin">
				<span className={`coin-badge ${asset.iconClass}`}>{asset.symbol.charAt(0)}</span>
				<strong>{asset.name}</strong>
			</div>
			<div className="market-price-wrap">
				<span className="market-price">{formatGhsPrice(asset.price)}</span>
				<span className={asset.change >= 0 ? 'market-change up' : 'market-change down'}>
					{asset.change >= 0 ? '↗ ' : '↘ '}
					{Math.abs(asset.change).toFixed(2)}%
				</span>
			</div>
		</article>
	)
}

export default CryptoRow

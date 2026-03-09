import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import heroPhoneImage from '../assets/coin-img-1.avif'
import advancedTradeImage from '../assets/coinbaseimg3.avif'
import coinbaseOneImage from '../assets/coinbaseimg4.avif'
import baseAppImage from '../assets/img5.avif'
import Button from '../components/common/Button'
import ArticleCard from '../components/common/ArticleCard'
import CryptoRow from '../components/crypto/CryptoRow'
import { learnArticles } from '../data/learnArticles'

const tickerSeed = [
	{ symbol: 'BTC', price: 68420.54, change: 2.34 },
	{ symbol: 'ETH', price: 3724.11, change: 1.09 },
	{ symbol: 'USDC', price: 1.0, change: 0.0 },
	{ symbol: 'XRP', price: 0.63, change: 1.42 },
	{ symbol: 'BNB', price: 612.32, change: -0.73 },
	{ symbol: 'SOL', price: 153.4, change: 4.71 },
]

const marketBoardSeed = [
	{ name: 'Bitcoin', symbol: 'BTC', price: 735015.1, change: 1.24, iconClass: 'btc' },
	{ name: 'Ethereum', symbol: 'ETH', price: 21588.13, change: 2.88, iconClass: 'eth' },
	{ name: 'Tether', symbol: 'USDT', price: 10.78, change: -0.01, iconClass: 'usdt' },
	{ name: 'BNB', symbol: 'BNB', price: 6805.7, change: 1.93, iconClass: 'bnb' },
	{ name: 'XRP', symbol: 'XRP', price: 14.61, change: 0.18, iconClass: 'xrp' },
	{ name: 'USDC', symbol: 'USDC', price: 10.78, change: 0.07, iconClass: 'usdc' },
]

function formatTickerPrice(value) {
	if (value < 10) {
		return `$${value.toFixed(2)}`
	}
	return `$${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
}

function formatGhsPrice(value) {
	return `GHS ${value.toLocaleString('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}`
}

function HomePage() {
	const [ticker, setTicker] = useState(tickerSeed)
	const [marketBoard, setMarketBoard] = useState(marketBoardSeed)

	useEffect(() => {
		const timer = setInterval(() => {
			setTicker((prev) =>
				prev.map((item) => {
					const step = (Math.random() - 0.5) * (item.price > 100 ? 48 : 0.02)
					const nextPrice = Math.max(0.01, item.price + step)
					const nextChange = item.change + (Math.random() - 0.5) * 0.32
					return {
						...item,
						price: Number(nextPrice.toFixed(item.price > 100 ? 2 : 4)),
						change: Number(nextChange.toFixed(2)),
					}
				}),
			)
		}, 2200)

		return () => clearInterval(timer)
	}, [])

	useEffect(() => {
		const boardTimer = setInterval(() => {
			setMarketBoard((prev) =>
				prev.map((asset) => {
					const direction = Math.random() > 0.38 ? 1 : -1
					const priceDelta = (Math.random() * 0.0025 + 0.0002) * asset.price * direction
					const nextPrice = Math.max(0.01, asset.price + priceDelta)
					const nextChange = asset.change + (Math.random() - 0.5) * 0.65
					return {
						...asset,
						price: Number(nextPrice.toFixed(2)),
						change: Number(nextChange.toFixed(2)),
					}
				}),
			)
		}, 2400)

		return () => clearInterval(boardTimer)
	}, [])

	const tickerItems = useMemo(() => [...ticker, ...ticker], [ticker])

	return (
		<main>
			<section className="hero-section">
				<div className="container hero-grid">
					<div className="hero-media" aria-hidden="true">
						<img src={heroPhoneImage} alt="" />
					</div>

					<div className="hero-copy">
						<h1>The future of finance is here.</h1>
						<p>Trade crypto and more on a platform you can trust.</p>
						<div className="hero-cta">
							<input
								type="email"
								placeholder="satoshi@nakamoto.com"
								aria-label="Email address"
							/>
							<Button type="button">Sign up</Button>
						</div>
					</div>
				</div>
			</section>

			<section className="ticker-band" aria-label="Live ticker">
				<div className="ticker-track">
					{tickerItems.map((item, index) => (
						<div className="ticker-item" key={`${item.symbol}-${index}`}>
							<strong>{item.symbol}</strong>
							<span>{formatTickerPrice(item.price)}</span>
							<span className={item.change >= 0 ? 'up' : 'down'}>
								{item.change >= 0 ? '+' : ''}
								{item.change.toFixed(2)}%
							</span>
						</div>
					))}
				</div>
			</section>

			<section className="explore-section container">
				<div className="explore-layout">
					<div className="explore-copy">
						<h2>Explore crypto like Bitcoin, Ethereum, and Dogecoin.</h2>
						<p>Simply and securely buy, sell, and manage hundreds of cryptocurrencies.</p>
						<button className="explore-btn" type="button">See more assets</button>
					</div>

					<aside className="explore-panel" aria-label="Tradable assets">
						<div className="explore-tabs" role="tablist" aria-label="Asset filters">
							<button className="explore-tab active" type="button">Tradable</button>
							<button className="explore-tab" type="button">Top gainers</button>
							<button className="explore-tab" type="button">New on Coinbase</button>
						</div>

						<div className="market-board">
							{marketBoard.map((asset) => (
								<CryptoRow key={asset.symbol} asset={asset} formatGhsPrice={formatGhsPrice} />
							))}
						</div>
					</aside>
				</div>
			</section>

			<section className="split-section">
				<div className="container split-grid">
					<div className="split-visual chart">
						<img src={advancedTradeImage} alt="Advanced Trade interface" />
					</div>
					<div className="split-copy">
						<p>Advanced Trade</p>
						<h2>Powerful tools, designed for the advanced trader.</h2>
						<p>
							Advanced charting, real-time order books, and deep liquidity in one
							institutional-grade experience.
						</p>
						<Button type="button">Start trading</Button>
					</div>
				</div>
			</section>

			<section className="split-section alt">
				<div className="container split-grid">
					<div className="split-copy">
						<p>Coinbase One</p>
						<h2>Zero trading fees, more rewards.</h2>
						<p>
							One membership gives you zero-fee trading, boosted staking rewards, and
							priority support.
						</p>
						<Button type="button">Claim free trial</Button>
					</div>
					<div className="split-visual membership">
						<img src={coinbaseOneImage} alt="Coinbase One membership visual" />
					</div>
				</div>
			</section>

			<section className="split-section">
				<div className="container split-grid">
					<div className="split-visual mobile">
						<img src={baseAppImage} alt="Base App experience preview" />
					</div>
					<div className="split-copy">
						<p>Base App</p>
						<h2>Countless ways to earn crypto with the Base App.</h2>
						<p>
							Trade, discover, create, and chat in one social-finance experience built
							for the onchain generation.
						</p>
						<Button type="button">Learn more</Button>
					</div>
				</div>
			</section>

			<section className="learn-section container">
				<div className="learn-intro">
					<h1 className="text-6xl font-normal tracking-tight leading-tight">
						New to crypto? <br />
						Learn some crypto basics
					</h1>
					<div className="learn-intro-copy">
						<p>
							Beginner guides, practical tips, and market updates for first-timers,
							experienced investors, and everyone in between
						</p>
						<Link className="learn-more-btn" to="/learn">Read More</Link>
					</div>
				</div>
				<div className="learn-card-grid">
					{learnArticles.map((article) => (
						<ArticleCard key={article.slug} article={article} />
					))}
				</div>
			</section>

			<section className="cta-section">
				<div className="container cta-panel">
					<h2>Take control of your money.</h2>
					<p>Start your portfolio today and discover crypto.</p>
					<Button type="button">Sign up</Button>
				</div>
			</section>
		</main>
	)
}

export default HomePage

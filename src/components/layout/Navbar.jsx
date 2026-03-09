import { Link } from 'react-router-dom'
import coinbaseLogoNavigation from '../../assets/coinbaseLogoNavigation-4.svg'
import Button from '../common/Button'

const navMenus = [
	{
		label: 'Cryptocurrencies',
		to: '/explore',
		left: [
			{ title: 'Explore market', text: 'Track top assets and categories', icon: '₿' },
			{ title: 'Top gainers', text: 'Find strong daily performers', icon: '↗' },
			{ title: 'Market stats', text: 'Price, volume, and market cap data', icon: '◔' },
			{ title: 'Stablecoins', text: 'Discover stable value options', icon: '$' },
		],
		right: [
			{ title: 'Bitcoin', text: 'The first decentralized crypto', icon: '₿' },
			{ title: 'Ethereum', text: 'Smart contracts and DeFi', icon: '◇' },
			{ title: 'Solana', text: 'High speed blockchain network', icon: '◎' },
			{ title: 'USDC', text: 'Dollar-backed stablecoin', icon: 'C' },
		],
	},
	{
		label: 'Individuals',
		to: '/assets/btc',
		left: [
			{ title: 'Buy and sell', text: 'Buy, sell, and use crypto', icon: 'C' },
			{ title: 'Base App', text: 'Post, earn, trade, and chat, all in one place', icon: '■' },
			{ title: 'Coinbase One', text: 'Get zero trading fees and more', icon: '◉' },
			{ title: 'Private Client', text: 'For trusts, family offices, UHNWIs', icon: '◇' },
			{ title: 'Onchain', text: 'Build and use products for everyone', icon: '↗' },
		],
		right: [
			{ title: 'Advanced', text: 'Professional-grade trading tools', icon: '⌗' },
			{ title: 'Earn', text: 'Stake your crypto and earn rewards', icon: '%' },
			{ title: 'Coinbase Wealth', text: 'Institutional-grade services for UHNW', icon: '◈' },
			{ title: 'Credit Card', text: 'Earn up to 4% bitcoin back', icon: '⬈' },
			{ title: 'Debit Card', text: 'Spend crypto or cash, anywhere', icon: '▣' },
		],
	},
	{
		label: 'Businesses',
		to: '/learn',
		left: [
			{ title: 'Commerce', text: 'Accept crypto payments globally', icon: '▦' },
			{ title: 'Asset listings', text: 'List tokens for customer access', icon: '+' },
			{ title: 'Prime', text: 'Execution and financing for institutions', icon: '◫' },
			{ title: 'Payments', text: 'Move money with modern rails', icon: '⇄' },
		],
		right: [
			{ title: 'Coinbase Business', text: 'Treasury and payroll operations', icon: '▤' },
			{ title: 'Token Manager', text: 'Create and manage digital assets', icon: '◉' },
			{ title: 'Onramp', text: 'Enable instant fiat to crypto', icon: '↥' },
			{ title: 'Offramp', text: 'Convert crypto to local currency', icon: '↧' },
		],
	},
	{
		label: 'Institutions',
		to: '/assets/eth',
		left: [
			{ title: 'Prime', text: 'Unified trading and custody', icon: '◻' },
			{ title: 'Staking', text: 'Earn rewards with enterprise controls', icon: '◉' },
			{ title: 'Exchange', text: 'Deep liquidity and low latency', icon: '⇢' },
			{ title: 'International', text: 'Access global derivatives markets', icon: '◎' },
		],
		right: [
			{ title: 'Financing', text: 'Flexible credit facilities', icon: '$' },
			{ title: 'Research', text: 'Institutional-grade market insights', icon: '⌕' },
			{ title: 'API access', text: 'Automate advanced workflows', icon: '{}' },
			{ title: 'Support', text: 'Dedicated institutional onboarding', icon: '✦' },
		],
	},
	{
		label: 'Developers',
		to: '/learn',
		left: [
			{ title: 'Developer Platform', text: 'Build on secure crypto rails', icon: '⌘' },
			{ title: 'Base', text: 'Ethereum L2 for onchain apps', icon: '◌' },
			{ title: 'Wallet SDK', text: 'Ship wallet experiences fast', icon: '◫' },
			{ title: 'OnchainKit', text: 'UI building blocks for dapps', icon: '◍' },
		],
		right: [
			{ title: 'Node', text: 'Managed blockchain node access', icon: '◉' },
			{ title: 'Data API', text: 'Query transactions and balances', icon: '▥' },
			{ title: 'Verifications', text: 'Identity and trust workflows', icon: '✓' },
			{ title: 'Faucet', text: 'Get testnet assets for development', icon: '◔' },
		],
	},
	{
		label: 'Company',
		to: '/learn',
		left: [
			{ title: 'About', text: 'Mission, values, and culture', icon: '◌' },
			{ title: 'Careers', text: 'Build the future with us', icon: '◫' },
			{ title: 'Blog', text: 'Product updates and stories', icon: '✎' },
			{ title: 'Press', text: 'Newsroom and media resources', icon: '◍' },
		],
		right: [
			{ title: 'Security', text: 'How Coinbase protects users', icon: '◈' },
			{ title: 'Investors', text: 'Public company resources', icon: '▵' },
			{ title: 'Legal', text: 'Policies and disclosures', icon: '§' },
			{ title: 'Status', text: 'System uptime and incidents', icon: '●' },
		],
	},
]

function MegaMenu({ label, to, left, right, disableMenuLink }) {
	return (
		<div className="nav-item-with-menu">
			<Link to={to} className="nav-trigger">{label}</Link>
			<div className="mega-dropdown" aria-label={`${label} menu`}>
				<div className="mega-columns">
					<div className="mega-column">
						{left.map((item) => (
							<a key={item.title} href="#" className="mega-item" onClick={disableMenuLink}>
								<span className="mega-icon" aria-hidden="true">{item.icon}</span>
								<span className="mega-copy">
									<strong>{item.title}</strong>
									<small>{item.text}</small>
								</span>
							</a>
						))}
					</div>
					<div className="mega-column">
						{right.map((item) => (
							<a key={item.title} href="#" className="mega-item" onClick={disableMenuLink}>
								<span className="mega-icon" aria-hidden="true">{item.icon}</span>
								<span className="mega-copy">
									<strong>{item.title}</strong>
									<small>{item.text}</small>
								</span>
							</a>
						))}
					</div>
					<aside className="mega-promo" aria-hidden="true">
						<div className="mega-promo-mark">
							<img src={coinbaseLogoNavigation} alt="" />
						</div>
						<p>System Update 2025</p>
						<h4>The next chapter of Coinbase. Live on X 12/17.</h4>
						<a href="#" onClick={disableMenuLink}>Learn more</a>
					</aside>
				</div>
			</div>
		</div>
	)
}

function Navbar() {
	const disableMenuLink = (event) => event.preventDefault()

	return (
		<header className="site-header">
			<div className="container nav-wrap">
				<Link className="logo-mark" to="/" aria-label="Coinbase home">
					<img src={coinbaseLogoNavigation} alt="Coinbase" />
				</Link>
				<nav className="top-nav" aria-label="Main navigation">
					{navMenus.map((menu) => (
						<MegaMenu
							key={menu.label}
							label={menu.label}
							to={menu.to}
							left={menu.left}
							right={menu.right}
							disableMenuLink={disableMenuLink}
						/>
					))}
				</nav>
				<div className="nav-actions">
					<button className="icon-btn" type="button" aria-label="Search">
						<svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
							<circle cx="11" cy="11" r="6.5" />
							<line x1="16" y1="16" x2="21" y2="21" />
						</svg>
					</button>
					<button className="icon-btn" type="button" aria-label="Language selector">
						<svg className="globe-icon" viewBox="0 0 24 24" aria-hidden="true">
							<circle cx="12" cy="12" r="9.5" />
							<path d="M7.2 9.1 9.1 8l1.9.5 1.2-.5 2.3.8.8 1.5-.8 1.4-1.2.4-.8 1.4-1.7.4-1.2-.7-1.7.2-1.3-1 .2-1.4 1.1-.9z" />
							<path d="m15.8 14.8 1.1-.1.7.8-.2 1.1-1 .5-.9-.7z" />
						</svg>
					</button>
					<Button variant="ghost" to="/signin">Sign in</Button>
					<Button to="/signup">Sign up</Button>
				</div>
			</div>
		</header>
	)
}

export default Navbar

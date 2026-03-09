import { Link } from 'react-router-dom'
import coinbaseLogoNavigation from '../../assets/coinbaseLogoNavigation-4.svg'
import Button from '../common/Button'

function Navbar() {
	return (
		<header className="site-header">
			<div className="container nav-wrap">
				<Link className="logo-mark" to="/" aria-label="Coinbase home">
					<img src={coinbaseLogoNavigation} alt="Coinbase" />
				</Link>
				<nav className="top-nav" aria-label="Main navigation">
					<Link to="/explore">Cryptocurrencies</Link>
					<Link to="/assets/btc">Individuals</Link>
					<Link to="/learn">Businesses</Link>
					<a href="#">Institutions</a>
					<a href="#">Developers</a>
					<a href="#">Company</a>
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

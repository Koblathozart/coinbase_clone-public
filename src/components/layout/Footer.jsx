import coinbaseLogoNavigation from '../../assets/coinbaseLogoNavigation-4.svg'
import { footerColumns } from '../../data/footerColumns'

function Footer() {
	const disableLink = (event) => event.preventDefault()

	return (
		<footer className="site-footer">
			<div className="container footer-grid">
				<div>
					<img className="footer-mark" src={coinbaseLogoNavigation} alt="Coinbase" />
				</div>
				{footerColumns.map((column, columnIndex) => (
					<div className="footer-column" key={`footer-column-${columnIndex}`}>
						{column.map((group) => (
							<div className="footer-group" key={group.title}>
								<h4>{group.title}</h4>
								{group.links.map((item) => (
									<a
										key={item}
										href="#"
										onClick={disableLink}
										className="footer-link-disabled"
									>
										{item}
									</a>
								))}
							</div>
						))}
					</div>
				))}
			</div>
			<div className="container footer-social" aria-label="Social links">
				<a href="#" onClick={disableLink} className="footer-link-disabled" aria-label="X">
					<svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
						<path d="M18.9 3h2.9l-6.4 7.3L23 21h-6l-4.7-6.1L6.9 21H4l6.8-7.8L1.6 3h6.1l4.2 5.6L18.9 3zm-1 16.3h1.7L6.8 4.6H5z" />
					</svg>
				</a>
				<a href="#" onClick={disableLink} className="footer-link-disabled" aria-label="Facebook">
					<svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
						<path d="M13.8 22v-8h2.7l.4-3.1h-3.1V9c0-.9.3-1.5 1.6-1.5h1.7V4.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.4v2.4H8.6V14h2.8v8h2.4z" />
					</svg>
				</a>
				<a href="#" onClick={disableLink} className="footer-link-disabled" aria-label="YouTube">
					<svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
						<path d="M23 8.1a3.1 3.1 0 0 0-2.2-2.2C18.9 5.4 12 5.4 12 5.4s-6.9 0-8.8.5A3.1 3.1 0 0 0 1 8.1 32.7 32.7 0 0 0 .5 12c0 1.3.2 2.6.5 3.9a3.1 3.1 0 0 0 2.2 2.2c1.9.5 8.8.5 8.8.5s6.9 0 8.8-.5a3.1 3.1 0 0 0 2.2-2.2c.3-1.3.5-2.6.5-3.9 0-1.3-.2-2.6-.5-3.9zM9.8 15.1V8.9l5.4 3.1-5.4 3.1z" />
					</svg>
				</a>
				<a href="#" onClick={disableLink} className="footer-link-disabled" aria-label="LinkedIn">
					<svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
						<path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2.1 3.9-2.1 4.1 0 4.9 2.7 4.9 6.2V21h-4v-5.5c0-1.3 0-3-1.9-3s-2.2 1.5-2.2 2.9V21H9z" />
					</svg>
				</a>
				<a href="#" onClick={disableLink} className="footer-link-disabled" aria-label="Instagram">
					<svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
						<path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm11.5 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
					</svg>
				</a>
				<a href="#" onClick={disableLink} className="footer-link-disabled" aria-label="TikTok">
					<svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
						<path d="M14 3h2.7c.3 1.6 1.4 2.9 3 3.3V9c-1.3-.1-2.6-.5-3.7-1.2v7.1a5.7 5.7 0 1 1-5.7-5.7c.3 0 .7 0 1 .1V12a3 3 0 1 0 2.7 3V3z" />
					</svg>
				</a>
			</div>
			<div className="container footer-bottom">
				<div className="footer-bottom-left">
					<p>© 2026 Coinbase</p>
					<p>•</p>
					<a href="#" onClick={disableLink} className="footer-link-disabled">Privacy</a>
					<p>•</p>
					<a href="#" onClick={disableLink} className="footer-link-disabled">Terms & Conditions</a>
				</div>
				<div className="footer-bottom-right">
					<span className="footer-globe" aria-hidden="true">◍</span>
					<p>Global</p>
					<p>•</p>
					<p>English</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer

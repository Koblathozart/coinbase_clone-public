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
				<a href="#" onClick={disableLink} className="footer-link-disabled">X</a>
				<a href="#" onClick={disableLink} className="footer-link-disabled">in</a>
				<a href="#" onClick={disableLink} className="footer-link-disabled">ig</a>
				<a href="#" onClick={disableLink} className="footer-link-disabled">t</a>
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

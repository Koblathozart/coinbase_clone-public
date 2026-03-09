import { Link, useParams } from 'react-router-dom'
import ArticleCard from '../components/common/ArticleCard'
import { learnArticles } from '../data/learnArticles'

function Learn() {
	const { slug } = useParams()

	if (slug) {
		const article = learnArticles.find((item) => item.slug === slug)

		if (!article) {
			return (
				<main className="learn-page container">
					<section className="page-hero">
						<p>Learn</p>
						<h1>Article not found.</h1>
						<span>Try opening another guide from the Learn page.</span>
					</section>
					<p className="asset-back-link">
						<Link to="/learn">Back to Learn</Link>
					</p>
				</main>
			)
		}

		return (
			<main className="learn-page container">
				<section className="learn-article-hero">
					<img src={article.image} alt={article.title} />
					<div>
						<p>{article.slug.replaceAll('-', ' ')}</p>
						<h1>{article.title}</h1>
						<span>{article.summary}</span>
					</div>
				</section>
				<p className="asset-back-link">
					<Link to="/learn">Back to Learn</Link>
				</p>
			</main>
		)
	}

	return (
		<main className="learn-page container">
			<section className="page-hero">
				<p>Learn</p>
				<h1>New to crypto? Learn some crypto basics.</h1>
				<span>
					Beginner guides, practical tips, and market updates for first-timers,
					experienced investors, and everyone in between.
				</span>
			</section>

			<section className="learn-card-grid learn-page-grid">
				{learnArticles.map((article) => (
					<ArticleCard key={article.slug} article={article} />
				))}
			</section>
		</main>
	)
}

export default Learn

import { Link } from 'react-router-dom'
import Card from './Card'

function ArticleCard({ article }) {
	return (
		<Card className="learn-article">
			<Link to={`/learn/${article.slug}`}>
				<img src={article.image} alt={article.title} />
			</Link>
			<h3>
				<Link to={`/learn/${article.slug}`}>{article.title}</Link>
			</h3>
			<p>{article.summary}</p>
		</Card>
	)
}

export default ArticleCard

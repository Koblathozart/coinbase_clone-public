import { Link } from 'react-router-dom'

function Button({
	children,
	variant = 'primary',
	to,
	type = 'button',
	className = '',
	...props
}) {
	const variantClass = variant === 'ghost' ? 'btn btn-ghost' : 'btn btn-primary'
	const classes = `${variantClass} ${className}`.trim()

	if (to) {
		return (
			<Link to={to} className={classes} {...props}>
				{children}
			</Link>
		)
	}

	return (
		<button type={type} className={classes} {...props}>
			{children}
		</button>
	)
}

export default Button

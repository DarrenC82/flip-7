import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	return (
		<header className="header">
			<h1>Flip 7</h1>
			<button className="hamburger" onClick={toggleMenu}>
				<span></span>
				<span></span>
				<span></span>
			</button>
			<nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
				<Link to="/" onClick={toggleMenu}>Home</Link>
				<Link to="/instructions" onClick={toggleMenu}>Instructions</Link>
				<Link to="/newgame" onClick={toggleMenu}>New Game</Link>
			</nav>
		</header>
	);
}

export default Header;
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NavigationModal from './NavigationModal';

function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [pendingPath, setPendingPath] = useState(null);
	const location = useLocation();
	const navigate = useNavigate();

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	const handleLinkClick = (e, path) => {
		console.log('Link clicked:', path, 'Current path:', location.pathname);
		if (location.pathname === '/game') {
			console.log('On game page - showing modal');
			e.preventDefault();
			setPendingPath(path);
			setShowModal(true);
			setIsMenuOpen(false);
		} else {
			console.log('Not on game page - navigating normally');
			setIsMenuOpen(false);
		}
	};

	const handleConfirm = () => {
		setShowModal(false);
		navigate(pendingPath);
	};

	const handleCancel = () => {
		setShowModal(false);
		setPendingPath(null);
	};

	return (
		<>
			<header className="header">
				<h1>Flip 7</h1>
				<button 
					className="hamburger" 
					onClick={toggleMenu}
					aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
					aria-expanded={isMenuOpen}
				>
					<span></span>
					<span></span>
					<span></span>
				</button>
				<nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
					<Link to="/" onClick={(e) => handleLinkClick(e, '/')}>Home</Link>
					<Link to="/instructions" onClick={(e) => handleLinkClick(e, '/instructions')}>Instructions</Link>
					<Link to="/newgame" onClick={(e) => handleLinkClick(e, '/newgame')}>New Game</Link>
				</nav>
			</header>
			<NavigationModal 
				isOpen={showModal}
				onConfirm={handleConfirm}
				onCancel={handleCancel}
			/>
		</>
	);
}

export default Header;
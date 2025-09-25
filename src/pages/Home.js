import { Link } from 'react-router-dom';

function Home() {
	return (
		<div className="home">
			<header>
				<p>Draw cards, avoid duplicates, reach 7 unique cards for bonus!</p>
			</header>

			<main>
				<section className="game-controls">
					<Link to="/newgame">
						<button className="start-game">Start New Game</button>
					</Link>
					<Link to="/instructions">
						<button className="instructions">Instructions</button>
					</Link>
				</section>
			</main>
		</div>
	);
}

export default Home;
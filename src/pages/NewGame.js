import { useState } from 'react';
import { Link } from 'react-router-dom';

function NewGame() {
	const [playerCount, setPlayerCount] = useState(2);

	const increment = () => setPlayerCount(prev => Math.min(prev + 1, 6));
	const decrement = () => setPlayerCount(prev => Math.max(prev - 1, 2));

	return (
		<div className="New-Game">
			<header>
				<h1>Flip 7</h1>
				<p>START A NEW GAME</p>
			</header>

			<main>
				<section className="Number-Players">
					<h2>Choose Number of Players</h2>
					<div className="player-counter">
						<button className="minus" onClick={decrement}>-</button>
						<span className="count">{playerCount}</span>
						<button className="plus" onClick={increment}>+</button>
					</div>
				</section>

				<section className="Start-Game">
					<Link to={`/game?players=${playerCount}`}>
						<button className="start-game">Start Game</button>
					</Link>
				</section>
			</main>
		</div>
	);
};

    export default NewGame;
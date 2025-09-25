function Instructions() {
	return (
		<div className="instructions">
			<header>
				<h1>Flip 7</h1>
				<p>Draw cards, avoid duplicates, reach 7 unique cards for bonus!</p>
			</header>

			<main>
				<section className="game-info">
					<h2>How to Play</h2>
					<ul>
						<li>Draw cards to build your score</li>
						<li>Avoid duplicate number cards (causes bust)</li>
						<li>Get 7 unique number cards for "Flip 7" bonus</li>
						<li>Use action cards: Freeze, Flip 3, Second Chance</li>
						<li>Use modifier cards: +2, +4, +6, +8, +10, x2</li>
					</ul>
				</section>

                				<section className="card-info">
					<h3>Deck Composition (94 cards)</h3>
					<div className="card-types">
						<div>Number Cards: 0-12 (79 total)</div>
						<div>Modifier Cards: +2, +4, +6, +8, +10, x2 (6 total)</div>
						<div>Action Cards: Freeze, Flip 3, Second Chance (9 total)</div>
					</div>
				</section>
            </main>
		</div>
	)};

    export default Instructions;
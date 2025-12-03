import { useState, useEffect } from 'react';
import { detectLocale, getTranslation } from '../utils/translations';

function Instructions() {
	const [locale, setLocale] = useState('en');
	const [t, setT] = useState(getTranslation('en'));

	useEffect(() => {
		detectLocale().then(detected => {
			setLocale(detected);
			setT(getTranslation(detected));
		});
	}, []);

	const changeLanguage = (lang) => {
		setLocale(lang);
		setT(getTranslation(lang));
	};

	return (
		<div className="instructions">
			<header>
				<div style={{display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem'}}>
					<button onClick={() => changeLanguage('en')} style={{fontWeight: locale === 'en' ? 'bold' : 'normal'}}>🇬🇧 EN</button>
					<button onClick={() => changeLanguage('es')} style={{fontWeight: locale === 'es' ? 'bold' : 'normal'}}>🇪🇸 ES</button>
					<button onClick={() => changeLanguage('fr')} style={{fontWeight: locale === 'fr' ? 'bold' : 'normal'}}>🇫🇷 FR</button>
					<button onClick={() => changeLanguage('de')} style={{fontWeight: locale === 'de' ? 'bold' : 'normal'}}>🇩🇪 DE</button>
				</div>
				<div style={{fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem'}}>
					Detected: {locale} | Browser: {navigator.language}
				</div>
				<h1>{t.title}</h1>
				<p>{t.subtitle}</p>
			</header>

			<main>
				<section className="game-info">
					<h2>{t.howToPlay}</h2>
					<ul>
						{t.rules.map((rule, i) => <li key={i}>{rule}</li>)}
					</ul>
				</section>

                				<section className="card-info">
					<h3>{t.deckComposition}</h3>
					<div className="card-types">
						<div>{t.numberCards}</div>
						<div>{t.modifierCards}</div>
						<div>{t.actionCards}</div>
					</div>
				</section>
            </main>
		</div>
	)};

    export default Instructions;
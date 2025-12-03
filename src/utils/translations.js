// Detect user's locale and provide translations
export const detectLocale = async () => {
  // Check for test override first
  const testLocale = localStorage.getItem('test-locale');
  if (testLocale) return testLocale;
  
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_code?.toLowerCase() || 'us';
  } catch {
    return navigator.language?.split('-')[0] || 'en';
  }
};

// Alternative: Use only browser language (no API call)
export const detectBrowserLocale = () => {
  return navigator.language?.split('-')[0] || 'en';
};

export const translations = {
  en: {
    title: 'Flip 7',
    subtitle: 'Draw cards, avoid duplicates, reach 7 unique cards for bonus!',
    howToPlay: 'How to Play',
    rules: [
      'Draw cards to build your score',
      'Avoid duplicate number cards (causes bust)',
      'Get 7 unique number cards for "Flip 7" bonus',
      'Use action cards: Freeze, Flip 3, Second Chance',
      'Use modifier cards: +2, +4, +6, +8, +10, x2'
    ],
    deckComposition: 'Deck Composition (94 cards)',
    numberCards: 'Number Cards: 0-12 (79 total)',
    modifierCards: 'Modifier Cards: +2, +4, +6, +8, +10, x2 (6 total)',
    actionCards: 'Action Cards: Freeze, Flip 3, Second Chance (9 total)'
  },
  es: {
    title: 'Flip 7',
    subtitle: '¡Roba cartas, evita duplicados, alcanza 7 cartas únicas para bonificación!',
    howToPlay: 'Cómo Jugar',
    rules: [
      'Roba cartas para construir tu puntuación',
      'Evita cartas numéricas duplicadas (causa quiebra)',
      'Consigue 7 cartas numéricas únicas para bonificación "Flip 7"',
      'Usa cartas de acción: Congelar, Voltear 3, Segunda Oportunidad',
      'Usa cartas modificadoras: +2, +4, +6, +8, +10, x2'
    ],
    deckComposition: 'Composición del Mazo (94 cartas)',
    numberCards: 'Cartas Numéricas: 0-12 (79 total)',
    modifierCards: 'Cartas Modificadoras: +2, +4, +6, +8, +10, x2 (6 total)',
    actionCards: 'Cartas de Acción: Congelar, Voltear 3, Segunda Oportunidad (9 total)'
  },
  fr: {
    title: 'Flip 7',
    subtitle: 'Tirez des cartes, évitez les doublons, atteignez 7 cartes uniques pour un bonus!',
    howToPlay: 'Comment Jouer',
    rules: [
      'Tirez des cartes pour construire votre score',
      'Évitez les cartes numériques en double (provoque un échec)',
      'Obtenez 7 cartes numériques uniques pour le bonus "Flip 7"',
      'Utilisez les cartes d\'action: Geler, Retourner 3, Seconde Chance',
      'Utilisez les cartes modificatrices: +2, +4, +6, +8, +10, x2'
    ],
    deckComposition: 'Composition du Paquet (94 cartes)',
    numberCards: 'Cartes Numériques: 0-12 (79 total)',
    modifierCards: 'Cartes Modificatrices: +2, +4, +6, +8, +10, x2 (6 total)',
    actionCards: 'Cartes d\'Action: Geler, Retourner 3, Seconde Chance (9 total)'
  },
  de: {
    title: 'Flip 7',
    subtitle: 'Ziehe Karten, vermeide Duplikate, erreiche 7 einzigartige Karten für Bonus!',
    howToPlay: 'Spielanleitung',
    rules: [
      'Ziehe Karten, um deine Punktzahl aufzubauen',
      'Vermeide doppelte Zahlenkarten (verursacht Pleite)',
      'Erhalte 7 einzigartige Zahlenkarten für "Flip 7" Bonus',
      'Verwende Aktionskarten: Einfrieren, 3 Umdrehen, Zweite Chance',
      'Verwende Modifikatorkarten: +2, +4, +6, +8, +10, x2'
    ],
    deckComposition: 'Deck-Zusammensetzung (94 Karten)',
    numberCards: 'Zahlenkarten: 0-12 (79 gesamt)',
    modifierCards: 'Modifikatorkarten: +2, +4, +6, +8, +10, x2 (6 gesamt)',
    actionCards: 'Aktionskarten: Einfrieren, 3 Umdrehen, Zweite Chance (9 gesamt)'
  }
};

export const getTranslation = (locale) => {
  const lang = locale.split('-')[0];
  return translations[lang] || translations.en;
};

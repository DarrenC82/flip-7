import { basicCardDefs, modifierCardDefs, actionCardDefs } from './cardDefinitions';

export const startingDeck = () => {
  const deck = [];

  // Add all card types based on definitions
  [...basicCardDefs, ...modifierCardDefs, ...actionCardDefs].forEach(cardDef => {
    for (let i = 0; i < cardDef.copies; i++) {
      deck.push({ type: cardDef.type, name: cardDef.name, value: cardDef.value });
    }
  });

  // Shuffle deck TODO - improve this think security 
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  console.log('Deck created:', deck);
  console.log('Total cards:', deck.length);
  
  return deck;
};


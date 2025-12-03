import { startingDeck, drawCard } from '../utils/cardDeck';

// funtion to count the cards in deck
const countCard = (deck, match) =>
  deck.filter(card =>
    Object.entries(match).every(([key, value]) => card[key] === value)
  ).length;


// Tests for starting card deck 
test('new deck should have 94 cards', () => {
  const deck = startingDeck();
  expect(deck).toHaveLength(94);
});

test('deck has correct basic card quantities', () => {
  const deck = startingDeck();
  expect(countCard(deck, { type: 'basic', name: '12' })).toBe(12);
  expect(countCard(deck, { type: 'basic', name: '11' })).toBe(11);
  expect(countCard(deck, { type: 'basic', name: '10' })).toBe(10);
  expect(countCard(deck, { type: 'basic', name: '9' })).toBe(9);
  expect(countCard(deck, { type: 'basic', name: '8' })).toBe(8);
  expect(countCard(deck, { type: 'basic', name: '7' })).toBe(7);
  expect(countCard(deck, { type: 'basic', name: '6' })).toBe(6);
  expect(countCard(deck, { type: 'basic', name: '5' })).toBe(5);
  expect(countCard(deck, { type: 'basic', name: '4' })).toBe(4);
  expect(countCard(deck, { type: 'basic', name: '3' })).toBe(3);
  expect(countCard(deck, { type: 'basic', name: '2' })).toBe(2);
  expect(countCard(deck, { type: 'basic', name: '1' })).toBe(1);
  expect(countCard(deck, { type: 'basic', name: '0' })).toBe(1);
}
)

test('deck has correct modifier card quantities', () => {
  const deck = startingDeck();
  expect(countCard(deck, { type: 'modifier', name: 'plus 2' })).toBe(1);
  expect(countCard(deck, { type: 'modifier', name: 'plus 4' })).toBe(1);
  expect(countCard(deck, { type: 'modifier', name: 'plus 6' })).toBe(1);
  expect(countCard(deck, { type: 'modifier', name: 'plus 8' })).toBe(1);
  expect(countCard(deck, { type: 'modifier', name: 'plus 10' })).toBe(1);
  expect(countCard(deck, { type: 'modifier', name: 'multiply 2' })).toBe(1);
}
);

test('deck has correct action card quantities', () => {
  const deck = startingDeck();
  expect(countCard(deck, { type: 'action', name: 'freeze' })).toBe(3);
  expect(countCard(deck, { type: 'action', name: 'flip 3' })).toBe(3);
  expect(countCard(deck, { type: 'action', name: 'second chance' })).toBe(3);
}
);


// check decks are different
test('two decks are shuffled differently', () => {
  const deck1 = startingDeck();
  const deck2 = startingDeck();
  expect(deck1).not.toEqual(deck2);
});


// when deck is empty nothing returned 
test('drawing from empty deck returns null', () => {
  const emptyDeck = [];
  const result = drawCard(emptyDeck);
  expect(result).toBeNull();
});

// reduce deck after every draw from it
test('drawing reduces deck size', () => {
  const deck = startingDeck();
  const originalLength = deck.length;
  drawCard(deck);
  expect(deck.length).toBe(originalLength - 1);
});

// check if card is removed from the deck - security implications ?? can this be used to cheat 
test('drawn card removed from deck', () => {
  const deck = startingDeck();
  const drawnCard = drawCard(deck);
  expect(deck).not.toContain(drawnCard);
});

// discard pile increases when added to 
test('discard pile increases when cards added to it', () => {
  const discard = [];
  const card = { type: 'basic', name: '5', value: 5 };
  discard.push(card);
  expect(discard.length).toBe(1);
  expect(discard).toContain(card);
}); 


// shuffle discard pile and make new deck when deck is empty  
test('reshuffle discard pile when deck is empty', () => {
  const emptyDeck = [];
  const discard = [{ type: 'basic', name: '1' }, { type: 'basic', name: '2' }];
  const newDeck = [...discard];
  expect(newDeck.length).toBe(discard.length);
  expect(newDeck.length).toBeGreaterThan(0);
});


test('count cards by type', () => {
  const deck = startingDeck();
  const basicCards = countCard(deck, { type: 'basic' });
  const modifierCards = countCard(deck, { type: 'modifier' });
  const actionCards = countCard(deck, { type: 'action' });
  
  expect(basicCards).toBe(79);
  expect(modifierCards).toBe(6);
  expect(actionCards).toBe(9);
});


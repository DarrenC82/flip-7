export const calculateRoundScore = (hand) => {
  let score = 0;
  
  // Calculate basic cards first
  const basicCards = hand.filter(card => card.type === 'basic');
  score = basicCards.reduce((sum, card) => sum + card.value, 0);
  
  // Apply modifier cards
  const modifierCards = hand.filter(card => card.type === 'modifier');
  modifierCards.forEach(card => {
    if (card.name.startsWith('plus')) {
      score += card.value;
    } else if (card.name === 'multiply 2') {
      score *= 2;
    }
  });
  
  // Action cards don't affect score directly
  return score;
};
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

  // flip 7 bonus - 15 points for exactly 7 basic cards
  const flipSevenBonus = basicCards.length === 7 ? 15 : 0;


  // player bust if they have duplicate basic cards
  const basicCardNames = basicCards.map(card => card.name);
  const hasDuplicates = basicCardNames.length !== new Set(basicCardNames).size;
    if (hasDuplicates) {
    return 0; // score is reset to 0
  }
  
  // Action cards don't affect score 
  return score + flipSevenBonus;
};
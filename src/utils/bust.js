export const isBust = (hand) => {
  const basicCards = hand.filter(card => card.type === 'basic');
  const basicCardNames = basicCards.map(card => card.name);
  return basicCardNames.length !== new Set(basicCardNames).size && basicCards.length > 0;
};

export const checkForDuplicateCard = (hand, newCard) => {
  if (newCard.type !== 'basic') return null;
  
  const basicCards = hand.filter(card => card.type === 'basic');
  const existingCard = basicCards.find(card => card.name === newCard.name);
  
  return existingCard ? newCard : null;
};

export const triggerBustStamp = (targetElement) => {
  const stamp = document.createElement('div');
  stamp.innerHTML = 'BUST';
  stamp.className = 'bust-stamp';
  
  targetElement.style.position = 'relative';
  targetElement.appendChild(stamp);
};

export const clearAllStamps = () => {
  const bustStamps = document.querySelectorAll('.bust-stamp');
  const flip7Stamps = document.querySelectorAll('.flip7-stamp');
  
  bustStamps.forEach(stamp => stamp.remove());
  flip7Stamps.forEach(stamp => stamp.remove());
};

export const applySecondChance = (player, duplicateCard) => {
  if (!player.secondChanceCard || !duplicateCard) return null;
  
  // Remove the duplicate card and second chance card
  const updatedHand = player.hand.filter(card => card !== duplicateCard);
  
  return {
    ...player,
    hand: updatedHand,
    secondChanceCard: null
  };
};
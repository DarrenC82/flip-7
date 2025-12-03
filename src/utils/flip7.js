export const isFlip7 = (hand) => {
  const basicCards = hand.filter(card => card.type === 'basic');
  const basicCardNames = basicCards.map(card => card.name);
  const uniqueNames = new Set(basicCardNames);
  
  return basicCards.length === 7 && basicCardNames.length === uniqueNames.size;
};

export const triggerFlip7Stamp = (targetElement) => {
  const stamp = document.createElement('div');
  stamp.innerHTML = 'FLIP 7<br>+15 POINTS';
  stamp.className = 'flip7-stamp';
  
  targetElement.style.position = 'relative';
  targetElement.appendChild(stamp);
};
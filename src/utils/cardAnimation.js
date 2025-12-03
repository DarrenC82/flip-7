export const animateCardDraw = (card, onComplete) => {
  // Create animated card element
  const animatedCard = document.createElement('div');
  
  // Show only number for basic cards, name and type for others
  if (card.type === 'basic') {
    animatedCard.innerHTML = `<div class="card-number">${card.name}</div>`;
  } else {
    animatedCard.innerHTML = `
      <div class="card-name">${card.name}</div>
      <div class="card-type">${card.type}</div>
    `;
  }
  
  // Determine card class based on type and name
  let cardClass = `${card.type}-card`;
  if (card.name === 'freeze') {
    cardClass = 'freeze-card';
  } else if (card.name === 'flip 3') {
    cardClass = 'flip3-card';
  } else if (card.name === 'second chance') {
    cardClass = 'second-chance-card';
  }
  
  animatedCard.className = `animated-card ${cardClass}`;
  
  // Get draw pile position
  const drawPile = document.querySelector('.draw-pile');
  const drawRect = drawPile.getBoundingClientRect();
  
  // Get current player panel position
  const playerPanel = document.querySelector('.current-player-panel');
  const panelRect = playerPanel.getBoundingClientRect();
  
  // Position card at draw pile initially
  animatedCard.style.cssText = `
    position: fixed;
    left: ${drawRect.left + drawRect.width/2 - 40}px;
    top: ${drawRect.top + drawRect.height/2 - 50}px;
    width: 80px;
    height: 100px;
    z-index: 2000;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    border: 3px solid var(--dark-gray);
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    transition: all 0.6s ease-out;
    pointer-events: none;
  `;
  
  document.body.appendChild(animatedCard);
  
  // Animate to player panel after a brief delay
  setTimeout(() => {
    animatedCard.style.left = `${panelRect.left + panelRect.width/2 - 40}px`;
    animatedCard.style.top = `${panelRect.top + panelRect.height/2 - 50}px`;
    animatedCard.style.transform = 'scale(1.2)';
    animatedCard.style.boxShadow = '0 8px 24px rgba(0,0,0,0.4)';
  }, 50);
  
  // Hold and highlight the card
  setTimeout(() => {
    animatedCard.style.boxShadow = '0 0 20px var(--primary-yellow), 0 8px 24px rgba(0,0,0,0.4)';
    animatedCard.style.transform = 'scale(1.3)';
  }, 650);
  
  // Remove card and complete
  setTimeout(() => {
    animatedCard.style.opacity = '0';
    animatedCard.style.transform = 'scale(0.8)';
    setTimeout(() => {
      document.body.removeChild(animatedCard);
      onComplete();
    }, 200);
  }, 1300);
};
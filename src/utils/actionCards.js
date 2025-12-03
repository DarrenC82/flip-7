export const handleSecondChance = (players, currentPlayerId, setPlayers) => {
  // Find the current player
  const currentPlayer = players.find(p => p.id === currentPlayerId);
  
  // Give them the Second Chance card
  setPlayers(prev => prev.map(player => 
    player.id === currentPlayerId 
      ? { ...player, secondChanceCard: { name: 'second chance', type: 'action' } }
      : player
  ));
};

export const handleFreeze = (players, currentPlayerId, targetPlayerId, setPlayers, setOutPlayers) => {
  // Remove Freeze card from current player's hand
  setPlayers(prev => prev.map(player => 
    player.id === currentPlayerId
      ? { ...player, hand: player.hand.filter(card => card.name !== 'freeze') }
      : player
  ));
  
  // Add target player to out players (same as passing)
  setOutPlayers(prev => new Set([...prev, targetPlayerId]));
};


export const handleFlipThree = (players, currentPlayerId, targetPlayerId, setPlayers) => {
  // Remove Flip 3 card from current player's hand
  const currentPlayer = players.find(p => p.id === currentPlayerId);

  // Give them the Flip 3 card
  setPlayers(prev => prev.map(player =>
    player.id === currentPlayerId
      ? { ...player, hand: player.hand.filter(card => card.name !== 'flip3') }
      : player
  ));
  
  // Add target player to out players (same as passing)
  setOutPlayers(prev => new Set([...prev, targetPlayerId]));
};
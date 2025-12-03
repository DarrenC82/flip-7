import React, { useState } from 'react';

const TestMenu = ({ players, onAddCard, onGiveSecondChance, onClearHand }) => {
  const [selectedTestPlayer, setSelectedTestPlayer] = useState(1);

  return (
    <div className="test-menu">
      <h3>Test Menu</h3>
      
      {/* Player Selector */}
      <div className="test-player-selector">
        <label>Select Player: </label>
        {players.map(player => (
          <button 
            key={player.id}
            className={`player-select-btn ${selectedTestPlayer === player.id ? 'selected' : ''}`}
            onClick={() => setSelectedTestPlayer(player.id)}
          >
            Player {player.id}
          </button>
        ))}
      </div>

      {/* Number Cards (0-12) */}
      <div className="test-section">
        <h4>Number Cards</h4>
        <div className="test-cards">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
            <button key={num} onClick={() => onAddCard(selectedTestPlayer, String(num), 'basic', num)}>
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Modifier Cards */}
      <div className="test-section">
        <h4>Modifier Cards</h4>
        <div className="test-cards">
          <button onClick={() => onAddCard(selectedTestPlayer, 'plus 2', 'modifier', 2)}>+2</button>
          <button onClick={() => onAddCard(selectedTestPlayer, 'plus 4', 'modifier', 4)}>+4</button>
          <button onClick={() => onAddCard(selectedTestPlayer, 'plus 6', 'modifier', 6)}>+6</button>
          <button onClick={() => onAddCard(selectedTestPlayer, 'plus 8', 'modifier', 8)}>+8</button>
          <button onClick={() => onAddCard(selectedTestPlayer, 'plus 10', 'modifier', 10)}>+10</button>
          <button onClick={() => onAddCard(selectedTestPlayer, 'times 2', 'modifier', 2)}>x2</button>
        </div>
      </div>

      {/* Action Cards */}
      <div className="test-section">
        <h4>Action Cards</h4>
        <div className="test-cards">
          <button onClick={() => onAddCard(selectedTestPlayer, 'freeze', 'action', 0)}>Freeze</button>
          <button onClick={() => onAddCard(selectedTestPlayer, 'flip 3', 'action', 0)}>Flip 3</button>
          <button onClick={() => onGiveSecondChance(selectedTestPlayer)}>Second Chance</button>
        </div>
      </div>

      {/* Clear Hand */}
      <div className="test-section">
        <button className="clear-hand-btn" onClick={() => onClearHand(selectedTestPlayer)}>
          Clear Player {selectedTestPlayer} Hand
        </button>
      </div>
    </div>
  );
};

export default TestMenu;

import React, { useState } from 'react';
import ScoreApp from '../components/ScoreApp';
import { calculateRoundScore } from '../utils/scoring';

const PlayerArea = ({ player, isCurrentPlayer }) => {
  const [showCards, setShowCards] = useState(false);
  const roundScore = calculateRoundScore(player.hand);

  return (
    <div 
      className={`player-area ${isCurrentPlayer ? 'current-player' : ''}`}
      onClick={() => setShowCards(!showCards)}
      // use this for hover over and show
      // onMouseEnter={() => setShowCards(true)}
      // onMouseLeave={() => setShowCards(false)}
    >
      <h3>{player.name}</h3>
      <div className="hand">
        <div className="card-count">{player.hand.length} cards</div>
      </div>
      <div className="score">Round Score: {roundScore}</div>
      <ScoreApp label="Game Score:"/> {player.score}
      
      {showCards && player.hand.length > 0 && (
        <div className="card-display">
          <h4> {player.name} Cards in Hand:</h4>
          
          {/* Modifier Cards */}
          {player.hand.filter(card => card.type === 'modifier').length > 0 && (
            <div className="card-row">
              <div className="popup-cards">
                {player.hand.filter(card => card.type === 'modifier').map((card, index) => (
                  <div key={index} className="popup-card">
                    <div className="card-name">{card.name}</div>
                    <div className="card-type">{card.type}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Basic Cards */}
          {player.hand.filter(card => card.type === 'basic').length > 0 && (
            <div className="card-row">
              <div className="popup-cards">
                {player.hand.filter(card => card.type === 'basic').map((card, index) => (
                  <div key={index} className="popup-card">
                    <div className="card-name">{card.name}</div>
                    <div className="card-type">{card.type}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Action Cards */}
          {player.hand.filter(card => card.type === 'action').length > 0 && (
            <div className="card-row">
              <div className="popup-cards">
                {player.hand.filter(card => card.type === 'action').map((card, index) => (
                  <div key={index} className="popup-card">
                    <div className="card-name">{card.name}</div>
                    <div className="card-type">{card.type}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlayerArea;
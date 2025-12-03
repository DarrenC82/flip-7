import { useState, useEffect, useRef } from 'react';
import { calculateRoundScore } from '../utils/scoring';
import { triggerFlipSevenConfetti } from '../utils/confetti';
import { isBust, triggerBustStamp } from '../utils/bust';
import { isFlip7, triggerFlip7Stamp } from '../utils/flip7';

const PlayerArea = ({ player, isCurrentPlayer, isPassed, onPass, onFreeze }) => {
  const [showCards, setShowCards] = useState(false);
  const playerAreaRef = useRef(null);
  const roundScore = calculateRoundScore(player.hand);
  const basicCardCount = player.hand.filter(card => card.type === 'basic').length;
  
  useEffect(() => {
    if (basicCardCount === 7 && !isBust(player.hand)) {
      triggerFlipSevenConfetti();
    }
  }, [basicCardCount, player.hand]);

  useEffect(() => {
    if (isFlip7(player.hand) && playerAreaRef.current) {
      triggerFlip7Stamp(playerAreaRef.current);
    } else if (isBust(player.hand) && playerAreaRef.current && !isCurrentPlayer) {
      triggerBustStamp(playerAreaRef.current);
    }
  }, [player.hand, isCurrentPlayer]);


  return (
    <div 
      ref={playerAreaRef}
      className={`player-area ${isCurrentPlayer ? 'current-player' : ''} ${isPassed ? 'passed-player' : ''}`}
      onClick={() => setShowCards(!showCards)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setShowCards(!showCards);
        }
      }}
      onDragOver={(e) => {
        if (!isCurrentPlayer && !isPassed) {
          e.preventDefault();
        }
      }}
      onDrop={(e) => {
        e.preventDefault();
        if (!isCurrentPlayer && !isPassed && e.dataTransfer.getData('freeze-card')) {
          onFreeze(player.id);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`${player.name}, ${player.hand.length} cards, round score ${roundScore}, game score ${player.totalScore}. Press Enter to view cards.`}
      aria-expanded={showCards}
      // use this instead for hover over and show
      // onMouseEnter={() => setShowCards(true)}
      // onMouseLeave={() => setShowCards(false)}
    >
      <h3>{player.name}</h3>
      <div className="hand">
        <div className="card-count">{player.hand.length} cards</div>
      </div>
      <div className="score">Round Score: {roundScore}</div>
      <div className="game-score">Game Score: {player.totalScore}</div>


      
      {showCards && (
        <div className="card-display">
          <h4>{player.name}'s Cards</h4>
          
          {/* Modifier Cards */}
          {player.hand.filter(card => card.type === 'modifier').length > 0 && (
            <div className="card-row">
              <h5>Modifier Cards</h5>
              <div className="popup-cards">
                {player.hand.filter(card => card.type === 'modifier').map((card, index) => (
                  <div key={index} className="popup-card modifier-card">
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
              <h5>Number Cards</h5>
              <div className="popup-cards">
                {player.hand.filter(card => card.type === 'basic').map((card, index) => (
                  <div key={index} className="popup-card basic-card">
                    <div className="card-number">{card.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Action Cards */}
          {(player.hand.filter(card => card.type === 'action').length > 0 || player.secondChanceCard) && (
            <div className="card-row">
              <h5>Action Cards</h5>
              <div className="popup-cards">
                {player.hand.filter(card => card.type === 'action').map((card, index) => (
                  <div key={index} className={`popup-card action-card card-${card.name.replace(' ', '-')}`}>
                    <div className="card-name">{card.name}</div>
                    <div className="card-type">{card.type}</div>
                  </div>
                ))}
                {player.secondChanceCard && (
                  <div className="popup-card second-chance-card">
                    <div className="card-name">{player.secondChanceCard.name}</div>
                    <div className="card-type">{player.secondChanceCard.type}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>

  );
};

export default PlayerArea;
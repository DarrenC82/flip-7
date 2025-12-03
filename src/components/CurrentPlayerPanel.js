import { useState } from 'react';
import '../styles/current-player-panel.css';
import { isBust } from '../utils/bust';
import { calculateRoundScore } from '../utils/scoring';

const CurrentPlayerPanel = ({ player, onPlay, onPass, onActionCard, onFlipThree, onFreeze, players, outPlayers, isTransitioning, isDrawingCard, pendingActionCard }) => {
  if (!player) return null;

  const basicCards = player.hand.filter(card => card.type === 'basic');
  const modifierCards = player.hand.filter(card => card.type === 'modifier');
  const actionCards = player.hand.filter(card => card.type === 'action');
  const playerIsBust = isBust(player.hand);
  const roundScore = calculateRoundScore(player.hand);

  return (
    <div className={`current-player-panel ${isTransitioning ? 'exiting' : ''}`} style={{ position: 'relative' }}>
      {playerIsBust && <div className="bust-stamp">BUST</div>}
      
      {pendingActionCard && (
        <div className="pending-action-overlay">
          <div className="pending-action-card">
            <h3>Action Card Drawn!</h3>
            <p>Select a target player for: <strong>{pendingActionCard.name}</strong></p>
            <ActionCardWithTarget
              card={pendingActionCard}
              player={player}
              players={players}
              outPlayers={outPlayers}
              onFlipThree={onFlipThree}
              onFreeze={onFreeze}
              autoShow={true}
            />
          </div>
        </div>
      )}
      
      <div className="player-info" role="region" aria-live="polite" aria-label="Current player information">
        <h2>{player.name}'s Turn</h2>
        <div className="player-info-content">
          <div className="player-scores">
            <div className="score" aria-label={`Round score: ${roundScore} points`}>Round Score: {roundScore}</div>
            <div className="game-score" aria-label={`Game score: ${player.totalScore} points`}>Game Score: {player.totalScore}</div>
          </div>
          <div className="player-actions">
            <button className="draw-btn" onClick={onPlay} disabled={isDrawingCard} aria-label="Draw a card from the deck">
              {isDrawingCard ? 'Drawing...' : 'Draw Card'}
            </button>
            <button className="pass-btn" onClick={onPass} aria-label="Pass turn and bank your points">
              Pass
            </button>
          </div>
        </div>
      </div>

      <div className="current-player-cards">
        {modifierCards.length > 0 && (
          <div className="current-card-row">
            <h4>Modifier Cards</h4>
            {modifierCards.map((card, index) => (
              <div key={index} className="current-hand-card modifier-card">
                <div className="card-name">{card.name}</div>
                <div className="card-type">{card.type}</div>
              </div>
            ))}
          </div>
        )}

        {basicCards.length > 0 && (
          <div className="current-card-row">
            <h4>Number Cards</h4>
            {basicCards.map((card, index) => (
              <div key={index} className="current-hand-card basic-card">
                <div className="card-number">{card.name}</div>
              </div>
            ))}
          </div>
        )}

        {(actionCards.length > 0 || player.secondChanceCard) && (
          <div className="current-card-row">
            <h4>Action Cards</h4>
            {actionCards.map((card, index) => (
              <ActionCardWithTarget
                key={index}
                card={card}
                player={player}
                players={players}
                outPlayers={outPlayers}
                onFlipThree={onFlipThree}
                onFreeze={onFreeze}
              />
            ))}
            {player.secondChanceCard && (
              <div className="current-hand-card second-chance-card">
                <div className="card-name">{player.secondChanceCard.name}</div>
                <div className="card-type">{player.secondChanceCard.type}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ActionCardWithTarget = ({ card, player, players, outPlayers, onFlipThree, onFreeze, autoShow = false }) => {
  const [showTargets, setShowTargets] = useState(autoShow);
  
  const activePlayers = players.filter(p => !outPlayers.has(p.id));
  const onlyActivePlayer = activePlayers.length === 1 && activePlayers[0].id === player.id;
  
  const handleClick = () => {
    if (onlyActivePlayer) {
      // Auto-play on self
      if (card.name === 'flip 3') onFlipThree(player.id);
      if (card.name === 'freeze') onFreeze(player.id);
    } else {
      setShowTargets(!showTargets);
    }
  };
  
  const handleTargetSelect = (targetId) => {
    if (card.name === 'flip 3') onFlipThree(targetId);
    if (card.name === 'freeze') onFreeze(targetId);
    setShowTargets(false);
  };
  
  return (
    <div className="action-card-container">
      {!autoShow && (
        <div 
          className={`current-hand-card action-card card-${card.name.replace(' ', '-')}`}
          onClick={handleClick}
        >
          <div className="card-name">{card.name}</div>
          <div className="card-type">{card.type}</div>
        </div>
      )}
      {(showTargets || autoShow) && (
        <div className="target-selection">
          <div className="target-label">Select Target:</div>
          {activePlayers.map(p => (
            <button 
              key={p.id}
              className="target-btn"
              onClick={() => handleTargetSelect(p.id)}
            >
              {p.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrentPlayerPanel;
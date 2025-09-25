import React from 'react';
import ScoreApp from '../components/ScoreApp';

const PlayerArea = ({ player, isCurrentPlayer }) => (
  <div className={`player-area ${isCurrentPlayer ? 'current-player' : ''}`}>
    <h3>{player.name}</h3>
    <div className="hand">
      {player.hand.map((card, index) => (
        <div key={index} className="card">{card.label}</div>
      ))}
    </div>
    <div className="score">Current Score: {player.score}</div>
    <ScoreApp label="Game Score:"/> {player.score}
  </div>
);

export default PlayerArea;
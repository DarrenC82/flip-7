import React from 'react';
import { useSearchParams } from 'react-router-dom';
import PlayerArea from '../components/PlayerArea';
import './Game.css';

const Game = () => {
  const [searchParams] = useSearchParams();
  const playerCount = parseInt(searchParams.get('players')) || 2;
  
  // players with static scores for testing
  const gamePlayers = Array.from({ length: playerCount }, (_, i) => ({
    id: i + 1,
    name: `Player ${i + 1}`,
    hand: [],
    score: [150, 75, 89, 120, 45, 198][i] || 100
  }));
  
  const currentPlayerId = 1;
  
  const getPlayerLayout = () => {
    if (playerCount <= 2) {
      return { top: gamePlayers.slice(0, 1), bottom: gamePlayers.slice(1) };
    } else if (playerCount <= 4) {
      return { top: gamePlayers.slice(0, 2), bottom: gamePlayers.slice(2) };
    } else if (playerCount <= 4) {
      return { top: gamePlayers.slice(0, 3), bottom: gamePlayers.slice(3) };
    } else {
      return { top: gamePlayers.slice(0, 4), bottom: gamePlayers.slice(4) };
    }
  };
  
  const { top, bottom } = getPlayerLayout();
  
  return (
    <div className="flip7-board">
      {/* Top row of players */}
      <div className="player-row top-row">
        {top.map(player => (
          <PlayerArea 
            key={player.id}
            player={player}
            isCurrentPlayer={player.id === currentPlayerId}
          />
        ))}
      </div>

      {/* Deck area in the center */}
      <div className="deck-area">
        <div className="draw-pile">Draw Pile</div>
        <div className="discard-pile">Discard Pile</div>
      </div>

      {/* Bottom row of players */}
      <div className="player-row bottom-row">
        {bottom.map(player => (
          <PlayerArea 
            key={player.id}
            player={player}
            isCurrentPlayer={player.id === currentPlayerId}
          />
        ))}
      </div>
    </div>
  );}
;

export default Game;

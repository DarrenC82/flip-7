import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PlayerArea from '../components/PlayerArea';
import { startingDeck } from '../utils/cardDeck';
import './Game.css';

const Game = () => {
  const [searchParams] = useSearchParams();
  const playerCount = parseInt(searchParams.get('players')) || 2;
  const [drawPile, setDrawPile] = useState(() => startingDeck());
  const [discardPile, setDiscardPile] = useState([]);
  const [players, setPlayers] = useState(() => 
    Array.from({ length: playerCount }, (_, i) => ({
      id: i + 1,
      name: `Player ${i + 1}`,
      hand: [],
      totalScore: 0
    }))
  );
  
  const [currentPlayerId, setCurrentPlayerId] = useState(1);
  const [passedPlayers, setPassedPlayers] = useState(new Set());
  
  const playTurn = () => {
    if (drawPile.length === 0) return;
    
    const drawnCard = drawPile[0];
    setDrawPile(prev => prev.slice(1));
    
    setPlayers(prev => prev.map(player => 
      player.id === currentPlayerId 
        ? { ...player, hand: [...player.hand, drawnCard] }
        : player
    ));
    
    nextPlayer();
  };
  
  const passTurn = () => {
    setPassedPlayers(prev => new Set([...prev, currentPlayerId]));
    nextPlayer();
  };
  
  const nextPlayer = () => {
    let nextId = currentPlayerId;
    do {
      nextId = nextId >= playerCount ? 1 : nextId + 1;
    } while (passedPlayers.has(nextId) && passedPlayers.size < playerCount);
    
    setCurrentPlayerId(nextId);
  };
  
  const getPlayerLayout = () => {
    if (playerCount <= 2) {
      return { top: players.slice(0, 1), bottom: players.slice(1) };
    } else if (playerCount <= 4) {
      return { top: players.slice(0, 2), bottom: players.slice(2) };
    } else if (playerCount <= 4) {
      return { top: players.slice(0, 3), bottom: players.slice(3) };
    } else {
      return { top: players.slice(0, 4), bottom: players.slice(4) };
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
        <div className="draw-pile" onClick={playTurn}>
          <div>Draw Pile</div>
          <div>({drawPile.length})</div>
        </div>
        <div className="discard-pile">
          <div>Discard Pile</div>
          <div>({discardPile.length})</div>
        </div>
        <div className="turn-controls">
          <div className="current-turn">Current: Player {currentPlayerId}</div>
          <button onClick={passTurn} className="pass-btn">PASS</button>
        </div>
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
  );
};

export default Game;

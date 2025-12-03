import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import PlayerArea from '../components/PlayerArea';
import CurrentPlayerPanel from '../components/CurrentPlayerPanel';
import TestMenu from '../components/TestMenu';
import RoundSummary from '../components/RoundSummary';
import { startingDeck } from '../utils/cardDeck';
import { isBust, clearAllStamps, checkForDuplicateCard } from '../utils/bust';
import { isFlip7 } from '../utils/flip7';
import { animateCardDraw } from '../utils/cardAnimation';
import { calculateRoundScore } from '../utils/scoring';
import '../styles/primary-theme.css';
import '../styles/game-board.css';
import '../styles/player-area.css';
import '../styles/cards.css';
import '../styles/bust.css';
import '../styles/flip7.css';
import '../styles/current-player-panel.css';
import '../styles/card-animation.css';

const Game = () => {
  const [searchParams] = useSearchParams();
  const playerCount = parseInt(searchParams.get('players')) || 2;
  
  // Load saved game state or create new game
  const loadGameState = () => {
    // get saved game from browser storage (like a cookie but bigger)
    const saved = localStorage.getItem('flip7-game-state');
    if (saved) {
      // Found saved game! Convert from text back to JavaScript object
      const state = JSON.parse(saved);
      return {
          // Use saved data, but fallback to defaults if something's missing
          drawPile: state.drawPile || startingDeck(),
          discardPile: state.discardPile || [],
          players: state.players || Array.from({ length: playerCount }, (_, i) => ({
            id: i + 1,
            name: `Player ${i + 1}`,
            hand: [],
            secondChanceCard: null,
            totalScore: 0
          })),
            currentPlayerId: state.currentPlayerId || 1,
            outPlayers: new Set(state.outPlayers || []), // Convert array back to Set
            roundEnded: state.roundEnded || false
      };
    }
    // No saved game found, create brand new game
    return {
      drawPile: startingDeck(),
      discardPile: [],
      players: Array.from({ length: playerCount }, (_, i) => ({
        id: i + 1,
        name: `Player ${i + 1}`,
        hand: [],
        secondChanceCard: null,
        totalScore: 0
      })),
      currentPlayerId: 1,
      outPlayers: new Set(),
      roundEnded: false
    };
  };
  
  const initialState = loadGameState();
  const [drawPile, setDrawPile] = useState(initialState.drawPile);
  const [discardPile, setDiscardPile] = useState(initialState.discardPile);
  const [players, setPlayers] = useState(initialState.players);
  const [currentPlayerId, setCurrentPlayerId] = useState(initialState.currentPlayerId);
  const [outPlayers, setOutPlayers] = useState(initialState.outPlayers);
  const [roundEnded, setRoundEnded] = useState(initialState.roundEnded);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDrawingCard, setIsDrawingCard] = useState(false);
  const [showTestMenu, setShowTestMenu] = useState(false);
  const [showSecondChanceMessage, setShowSecondChanceMessage] = useState(false);

  const [pendingActionCard, setPendingActionCard] = useState(null);

  const findNextActivePlayer = useCallback((startId, excludeIds = new Set()) => {
    let nextId = startId;
    while (true) {
      nextId = nextId >= playerCount ? 1 : nextId + 1;
      const playerHand = players.find(p => p.id === nextId)?.hand || [];
      if (!outPlayers.has(nextId) && !excludeIds.has(nextId) && !isBust(playerHand) && !isFlip7(playerHand)) {
        return nextId;
      }
    }
  }, [players, outPlayers, playerCount]);

  const nextPlayer = useCallback(() => {
    const activePlayers = players.filter(p => !outPlayers.has(p.id) && !isBust(p.hand) && !isFlip7(p.hand));
    if (activePlayers.length === 0) {
      setRoundEnded(true);
      return;
    }
    
    const nextId = findNextActivePlayer(currentPlayerId);
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPlayerId(nextId);
      setIsTransitioning(false);
    }, 800);
  }, [players, outPlayers, currentPlayerId, findNextActivePlayer]);
  
  const playTurn = useCallback(() => {
    if (drawPile.length === 0 || roundEnded || isDrawingCard) return;
    
    const drawnCard = drawPile[0];
    setIsDrawingCard(true);
    setDrawPile(prev => prev.slice(1));
    
    // Animate the card draw
    animateCardDraw(drawnCard, () => {
      
      const currentPlayer = players.find(p => p.id === currentPlayerId);
      
      // Handle action cards - require immediate target selection
      if (drawnCard.type === 'action' && drawnCard.name !== 'second chance') {
        setPendingActionCard(drawnCard);
        setIsDrawingCard(false);
        return;
      }
      
      const updatedHand = [...currentPlayer.hand, drawnCard];
      
      // Handle Second Chance card - check if player already has one
      if (drawnCard.name === 'second chance' && drawnCard.type === 'action') {
        if (currentPlayer.secondChanceCard) {
          // Give to another active player
          const activePlayers = players.filter(p => 
            p.id !== currentPlayerId && 
            !outPlayers.has(p.id) && 
            !p.secondChanceCard
          );
          if (activePlayers.length > 0) {
            setPlayers(prev => prev.map(player => 
              player.id === activePlayers[0].id 
                ? { ...player, secondChanceCard: drawnCard }
                : player
            ));
          } else {
            setDiscardPile(prev => [...prev, drawnCard]);
          }
        } else {
          setPlayers(prev => prev.map(player => 
            player.id === currentPlayerId 
              ? { ...player, secondChanceCard: drawnCard }
              : player
          ));
        }
        setIsDrawingCard(false);
        nextPlayer();
        return;
      }
      
      const duplicateCard = checkForDuplicateCard(currentPlayer.hand, drawnCard);
      
      if (duplicateCard && currentPlayer.secondChanceCard) {
        // Use Second Chance - discard both cards without adding duplicate to hand
        setPlayers(prev => prev.map(player => 
          player.id === currentPlayerId 
            ? { ...player, secondChanceCard: null }
            : player
        ));
        setDiscardPile(prev => [...prev, currentPlayer.secondChanceCard, drawnCard]);
        
        // Show Second Chance message
        setShowSecondChanceMessage(true);
        setIsDrawingCard(false);
        
        // Auto-advance after showing message
        setTimeout(() => {
          setShowSecondChanceMessage(false);
          nextPlayer();
        }, 2000);
        return;
      } else if (duplicateCard) {
        // Duplicate without Second Chance - player is bust
        setPlayers(prev => prev.map(player => 
          player.id === currentPlayerId 
            ? { ...player, hand: [...player.hand, drawnCard] }
            : player
        ));
        
        const newOutPlayers = new Set([...outPlayers, currentPlayerId]);
        setOutPlayers(newOutPlayers);
        setIsDrawingCard(false);
        

        
        // Check if this was the last active player
        const activePlayers = players.filter(p => 
          !newOutPlayers.has(p.id) && 
          !isBust(p.id === currentPlayerId ? updatedHand : p.hand) && 
          !isFlip7(p.hand)
        );
        
        if (activePlayers.length === 0) {
          // Last player busted - end round immediately after delay
          setTimeout(() => {
            setRoundEnded(true);
          }, 1000);
        } else {
          // Other players still active - move to next player
          setTimeout(() => {
            nextPlayer();
          }, 1000);
        }
        return;
      }
      
      // Add card to player's hand
      setPlayers(prev => prev.map(player => 
        player.id === currentPlayerId 
          ? { ...player, hand: [...player.hand, drawnCard] }
          : player
      ));
      
      // Check if player achieved Flip 7 after adding card
      if (isFlip7(updatedHand)) {
        // Player achieved Flip 7 - end round immediately
        setRoundEnded(true);
        setIsDrawingCard(false);
        return;
      }
      
      setIsDrawingCard(false);
      nextPlayer();
    });
  }, [drawPile, roundEnded, isDrawingCard, players, currentPlayerId, outPlayers, nextPlayer]);
  
  const passTurn = useCallback(() => {
    setOutPlayers(prev => new Set([...prev, currentPlayerId]));
    nextPlayer();
  }, [currentPlayerId, nextPlayer]);
  
  const getPlayerLayout = () => {
    const otherPlayers = roundEnded ? players : players.filter(p => p.id !== currentPlayerId);
    return { bottom: otherPlayers };
  };
  
  const handleActionCard = (card) => {
    // TODO: Implement action card logic
    console.log('Action card played:', card);
  };
  
  const handleFreeze = useCallback((targetPlayerId) => {
    setDiscardPile(prev => [...prev, pendingActionCard]);
    const updatedOutPlayers = new Set([...outPlayers, targetPlayerId]);
    setOutPlayers(updatedOutPlayers);
    setPendingActionCard(null);
    
    // Calculate next player with updated outPlayers
    const activePlayers = players.filter(p => !updatedOutPlayers.has(p.id) && !isBust(p.hand) && !isFlip7(p.hand));
    if (activePlayers.length === 0) {
      setRoundEnded(true);
      return;
    }
    
    const nextId = findNextActivePlayer(currentPlayerId, updatedOutPlayers);
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPlayerId(nextId);
      setIsTransitioning(false);
    }, 800);
  }, [pendingActionCard, outPlayers, players, currentPlayerId, findNextActivePlayer]);

  const handleFlipThree = useCallback((targetPlayerId) => {
    setDiscardPile(prev => [...prev, pendingActionCard]);
    setPendingActionCard(null);
    
    const originalPlayerId = currentPlayerId;
    let cardsDrawn = 0;
    let currentPile = [...drawPile];
    
    const drawNextCard = () => {
      if (cardsDrawn >= 3 || currentPile.length === 0) {
        // Finished drawing - advance to next player
        setDrawPile(currentPile);
        const nextId = findNextActivePlayer(originalPlayerId);
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentPlayerId(nextId);
          setIsTransitioning(false);
        }, 800);
        return;
      }
      
      const card = currentPile.shift();
      cardsDrawn++;
      
      animateCardDraw(card, () => {
        setPlayers(prev => {
          const updatedPlayers = prev.map(player => {
            if (player.id === targetPlayerId) {
              const newHand = [...player.hand, card];
              return { ...player, hand: newHand };
            }
            return player;
          });
          
          // Check if target player is now bust
          const targetPlayer = updatedPlayers.find(p => p.id === targetPlayerId);
          if (isBust(targetPlayer.hand)) {
            // Player busted - stop drawing and mark as out
            const newOutPlayers = new Set([...outPlayers, targetPlayerId]);
            setOutPlayers(newOutPlayers);
            setDrawPile(currentPile);
            
            // Check if any players are still active
            const activePlayers = updatedPlayers.filter(p => 
              !newOutPlayers.has(p.id) && 
              !isBust(p.hand) && 
              !isFlip7(p.hand)
            );
            
            if (activePlayers.length === 0) {
              setRoundEnded(true);
            } else {
              // Advance to next player
              const nextId = findNextActivePlayer(originalPlayerId, newOutPlayers);
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentPlayerId(nextId);
                setIsTransitioning(false);
              }, 800);
            }
            return updatedPlayers;
          }
          
          // Check if target player achieved Flip 7
          if (isFlip7(targetPlayer.hand)) {
            // Player achieved Flip 7 - end round
            setRoundEnded(true);
            setDrawPile(currentPile);
            return updatedPlayers;
          }
          
          // Continue drawing next card after delay
          setTimeout(drawNextCard, 500);
          return updatedPlayers;
        });
      });
    };
    
    // Start drawing the first card
    drawNextCard();
  }, [pendingActionCard, currentPlayerId, drawPile, findNextActivePlayer]);
  
  const giveSecondChance = (playerId) => {
    setPlayers(prev => prev.map(player => 
      player.id === playerId 
        ? { ...player, secondChanceCard: { name: 'second chance', type: 'action' } }
        : player
    ));
  };

  const addCard = (playerId, cardName, cardType, cardValue) => {
    setPlayers(prev => prev.map(player => 
      player.id === playerId 
        ? { ...player, hand: [...player.hand, { name: cardName, type: cardType, value: cardValue }] }
        : player
    ));
  };

  const clearPlayerHand = (playerId) => {
    setPlayers(prev => prev.map(player => 
      player.id === playerId 
        ? { ...player, hand: [], secondChanceCard: null }
        : player
    ));
  };

  const startNextRound = () => {
    // Add round scores to total scores
    setPlayers(prev => prev.map(player => ({
      ...player,
      totalScore: player.totalScore + calculateRoundScore(player.hand),
      hand: [],
      secondChanceCard: null
    })));
    
    // Reset round state - reshuffle all cards
    const allCards = [...drawPile, ...discardPile];
    setDrawPile(allCards.length > 0 ? allCards : startingDeck());
    setDiscardPile([]);
    setCurrentPlayerId(1);
    setOutPlayers(new Set());
    setRoundEnded(false);
    setIsTransitioning(false);
    setIsDrawingCard(false);
    setPendingActionCard(null);
  };

  const startNewGame = () => {
    // Clear all visual stamps from previous game
    clearAllStamps();
    
    // DELETE the saved game from browser storage
    localStorage.removeItem('flip7-game-state');
    
    // Create completely fresh game state
    const newState = {
      drawPile: startingDeck(),  // New shuffled deck
      discardPile: [],           // Empty discard pile
      players: Array.from({ length: playerCount }, (_, i) => ({
        id: i + 1,
        name: `Player ${i + 1}`,
        hand: [],
        secondChanceCard: null,
        totalScore: 0
      })),
      currentPlayerId: 1,        // Player 1 starts
      outPlayers: new Set(),     // Nobody is out yet
      roundEnded: false          // Round is active
    };
    
    // update ALL the state variables to the new values
    setDrawPile(newState.drawPile);
    setDiscardPile(newState.discardPile);
    setPlayers(newState.players);
    setCurrentPlayerId(newState.currentPlayerId);
    setOutPlayers(newState.outPlayers);
    setRoundEnded(newState.roundEnded);
    setIsTransitioning(false);
    setIsDrawingCard(false);
    setPendingActionCard(null);
    // The useEffect above will automatically save this new state
  };
  
  // Keyboard event listeners
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (roundEnded) return;
      
      switch(event.key) {
        case ' ': // Spacebar to draw card
        case 'Enter':
          event.preventDefault();
          if (!isDrawingCard) playTurn();
          break;
        case 'p': // P to pass
        case 'P':
          event.preventDefault();
          passTurn();
          break;
        case 't': // T to toggle test menu
        case 'T':
          event.preventDefault();
          setShowTestMenu(prev => !prev);
          break;
        default:
          // Do nothing for other keys
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [roundEnded, isDrawingCard, playTurn, passTurn]);

  // AUTO-Save- save game state to localStorage whenever anything changes
  useEffect(() => {
    const gameState = {
      drawPile,        // all the cards left to draw
      discardPile,     // cards that have been discarded
      players,         // All player data (hands, scores, names)
      currentPlayerId, // whose turn it is
      outPlayers: Array.from(outPlayers), // convert set to array for storage
      roundEnded       // Is round over?
    };
    // convert JS object to text and save in the browser
    localStorage.setItem('flip7-game-state', JSON.stringify(gameState));
  }, [drawPile, discardPile, players, currentPlayerId, outPlayers, roundEnded]); // Run this whenever ANY of these change

  const currentPlayer = players.find(p => p.id === currentPlayerId);
  const { bottom } = getPlayerLayout();

  //  CLOSE WINDOW - useEffect handles message (no custom message available)
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ''; // Chrome requires returnValue to be set
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  
  return (
    <div className="flip7-board">
      {!roundEnded && currentPlayer && (
        <CurrentPlayerPanel 
          player={currentPlayer}
          onPlay={playTurn}
          isDrawingCard={isDrawingCard}
          onPass={passTurn}
          onActionCard={handleActionCard}
          onFlipThree={handleFlipThree}
          onFreeze={handleFreeze}
          players={players}
          outPlayers={outPlayers}
          pendingActionCard={pendingActionCard}
          isTransitioning={isTransitioning}
        />
      )}
      
      {/* Deck sidebar on the left */}
      <div className="deck-sidebar" role="complementary" aria-label="Game controls and deck information">
        <div className="draw-pile" tabIndex={0} role="status" aria-label={`Draw pile: ${drawPile.length} cards remaining`}>
          <div>Draw Pile</div>
          <div>({drawPile.length})</div>
        </div>
        <div className="turn-controls">
          {roundEnded ? (
            <div className="round-ended" role="status" aria-live="polite">Round Ended</div>
          ) : (
            <div className="current-turn" role="status" aria-live="polite">Player {currentPlayerId}</div>
          )}
          <button className="new-game-btn" onClick={startNewGame} aria-label="Start a new game">
            Start New Game
          </button>
          <button className="new-game-btn" onClick={() => setShowTestMenu(!showTestMenu)}>
            Test Menu
          </button>
        </div>
        <div className="discard-pile" tabIndex={0} role="status" aria-label={`Discard pile: ${discardPile.length} cards`}>
          <div>Discard Pile</div>
          <div>({discardPile.length})</div>
        </div>
      </div>

      <div className="main-game-area">

        {/* All other players at bottom */}
        <div className="player-row bottom-row">
          {bottom.map(player => (
            <PlayerArea 
              key={player.id}
              player={player}
              isCurrentPlayer={false}
              isPassed={outPlayers.has(player.id)}
              onPass={passTurn}
              onFreeze={handleFreeze}
            />
          ))}
        </div>
      </div>

      {/* Second Chance Message */}
      {showSecondChanceMessage && (
        <div className="second-chance-overlay">
          <div className="second-chance-message">
            <h2>Second Chance Used!</h2>
            <p>{currentPlayer?.name} avoided a bust by discarding the duplicate card.</p>
          </div>
        </div>
      )}

      {/* Round Summary */}
      {roundEnded && (
        <RoundSummary 
          players={players} 
          onContinue={startNextRound}
          onNewGame={startNewGame}
        />
      )}

      {/* Test Menu */}
      {showTestMenu && (
        <TestMenu 
          players={players}
          onAddCard={addCard}
          onGiveSecondChance={giveSecondChance}
          onClearHand={clearPlayerHand}
        />
      )}

    </div>
  );
};

export default Game;

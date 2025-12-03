import React from 'react';
import { calculateRoundScore } from '../utils/scoring';
import { isBust } from '../utils/bust';
import { isFlip7 } from '../utils/flip7';
import '../styles/round-summary.css';

const RoundSummary = ({ players, onContinue, onNewGame }) => {
  const getScoreBreakdown = (hand) => {
    if (isBust(hand)) return { basic: 0, modifiers: 0, flip7: 0, total: 0 };
    
    const basicCards = hand.filter(card => card.type === 'basic');
    const basic = basicCards.reduce((sum, card) => sum + card.value, 0);
    
    const modifierCards = hand.filter(card => card.type === 'modifier');
    let modifiers = 0;
    modifierCards.forEach(card => {
      if (card.name.startsWith('plus')) {
        modifiers += card.value;
      } else if (card.name === 'multiply 2') {
        modifiers = basic; // x2 doubles the basic score
      }
    });
    
    const flip7 = isFlip7(hand) ? 15 : 0;
    const total = calculateRoundScore(hand);
    
    return { basic, modifiers, flip7, total };
  };

  return (
    <div className="round-summary-overlay" role="dialog" aria-modal="true" aria-labelledby="round-summary-title">
      <div className="round-summary">
        <h2 id="round-summary-title">Round Complete!</h2>
        <table className="score-table" aria-label="Round scores breakdown">
          <caption className="sr-only">Score breakdown showing basic points, modifiers, Flip 7 bonus, round total, and cumulative game score for each player</caption>
          <thead>
            <tr>
              <th scope="col">Player</th>
              <th scope="col">Basic</th>
              <th scope="col">Modifiers</th>
              <th scope="col">Flip7 Bonus</th>
              <th scope="col">Round Score</th>
              <th scope="col">Total Score</th>
            </tr>
          </thead>
          <tbody>
            {players.map(player => {
              const breakdown = getScoreBreakdown(player.hand);
              return (
                <tr key={player.id}>
                  <td>{player.name}</td>
                  <td>{breakdown.basic}</td>
                  <td>{breakdown.modifiers > 0 ? `+${breakdown.modifiers}` : breakdown.modifiers}</td>
                  <td>{breakdown.flip7 > 0 ? `+${breakdown.flip7}` : '-'}</td>
                  <td><strong>{breakdown.total}</strong></td>
                  <td><strong>{player.totalScore}</strong></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {players.some(p => p.totalScore >= 200) ? (
          <div className="game-end">
            <h3>🎉 Game Winner: {players.find(p => p.totalScore === Math.max(...players.map(p => p.totalScore))).name}! 🎉</h3>
            <button className="continue-btn" onClick={onNewGame} aria-label="Start new game">
              New Game
            </button>
          </div>
        ) : (
          <button className="continue-btn" onClick={onContinue} aria-label="Continue to next round">
            Next Round
          </button>
        )}
      </div>
    </div>
  );
};

export default RoundSummary;

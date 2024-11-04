import React from 'react';
import { Match } from '../types/tournament';
import { Button } from './ui/Button';

interface MatchCardProps {
  match: Match;
  onScoreSubmit: (match: Match) => void;
  isAdmin?: boolean;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  match,
  onScoreSubmit,
  isAdmin = false,
}) => {
  const [player1Score, setPlayer1Score] = React.useState(match.player1Score);
  const [player2Score, setPlayer2Score] = React.useState(match.player2Score);

  const handleSubmit = () => {
    onScoreSubmit({
      ...match,
      player1Score,
      player2Score,
      completed: true,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-sm text-gray-500 mb-2">
        Round {match.round} - Table {match.table}
      </div>
      
      <div className="grid grid-cols-3 gap-4 items-center mb-4">
        <div className="text-right">
          <div className="font-semibold">{match.player1.name}</div>
          <div className="text-sm text-gray-500">{match.player1.army}</div>
        </div>
        
        <div className="text-center text-2xl font-bold">
          {match.completed ? (
            <span>{match.player1Score} - {match.player2Score}</span>
          ) : (
            <span>VS</span>
          )}
        </div>
        
        <div className="text-left">
          <div className="font-semibold">{match.player2.name}</div>
          <div className="text-sm text-gray-500">{match.player2.army}</div>
        </div>
      </div>

      {!match.completed && isAdmin && (
        <div className="grid grid-cols-3 gap-4 items-center mt-4">
          <input
            type="number"
            value={player1Score}
            onChange={(e) => setPlayer1Score(Number(e.target.value))}
            className="rounded border p-2 text-center"
            min="0"
            max="20"
          />
          <Button onClick={handleSubmit} variant="default">
            Submit Score
          </Button>
          <input
            type="number"
            value={player2Score}
            onChange={(e) => setPlayer2Score(Number(e.target.value))}
            className="rounded border p-2 text-center"
            min="0"
            max="20"
          />
        </div>
      )}
    </div>
  );
};
import React from 'react';
import { Trophy, Users, Clock } from 'lucide-react';
import { Tournament } from '../types/tournament';
import { Button } from './ui/Button';

interface TournamentCardProps {
  tournament: Tournament;
  onSelect: (tournament: Tournament) => void;
}

export const TournamentCard: React.FC<TournamentCardProps> = ({
  tournament,
  onSelect,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{tournament.name}</h3>
          <p className="text-gray-500">{new Date(tournament.date).toLocaleDateString()}</p>
        </div>
        <span
          className={cn(
            'px-3 py-1 rounded-full text-sm font-medium',
            {
              'bg-green-100 text-green-800': tournament.status === 'active',
              'bg-yellow-100 text-yellow-800': tournament.status === 'upcoming',
              'bg-gray-100 text-gray-800': tournament.status === 'completed',
            }
          )}
        >
          {tournament.status}
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600">{tournament.players.length} Players</span>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600">{tournament.rounds} Rounds</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600">Round {tournament.currentRound}</span>
        </div>
      </div>

      <Button
        onClick={() => onSelect(tournament)}
        className="w-full"
        variant="default"
      >
        View Tournament
      </Button>
    </div>
  );
};
import React from 'react';
import { useParams } from 'react-router-dom';
import { useTournamentStore } from '../store/tournamentStore';
import { MatchCard } from '../components/MatchCard';
import { Standings } from '../components/Standings';
import { Button } from '../components/ui/Button';
import { Timer, Trophy, Users } from 'lucide-react';

export const Tournament = () => {
  const { id } = useParams();
  const { currentTournament, updateMatch } = useTournamentStore();
  const [activeTab, setActiveTab] = React.useState('matches');
  const [timeRemaining, setTimeRemaining] = React.useState(3600); // 1 hour in seconds

  React.useEffect(() => {
    if (currentTournament?.status === 'active') {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentTournament?.status]);

  if (!currentTournament) return null;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{currentTournament.name}</h1>
            <p className="text-gray-500">
              Round {currentTournament.currentRound} of {currentTournament.rounds}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{formatTime(timeRemaining)}</div>
              <div className="text-sm text-gray-500">Time Remaining</div>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Timer className="w-4 h-4" />
              Add Time
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-400" />
            <span>{currentTournament.players.length} Players</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-gray-400" />
            <span>{currentTournament.rounds} Rounds</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <Button
          variant={activeTab === 'matches' ? 'default' : 'outline'}
          onClick={() => setActiveTab('matches')}
        >
          Current Matches
        </Button>
        <Button
          variant={activeTab === 'standings' ? 'default' : 'outline'}
          onClick={() => setActiveTab('standings')}
        >
          Standings
        </Button>
      </div>

      {activeTab === 'matches' ? (
        <div className="grid gap-6">
          {currentTournament.matches
            .filter((match) => match.round === currentTournament.currentRound)
            .map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onScoreSubmit={updateMatch}
                isAdmin={true}
              />
            ))}
        </div>
      ) : (
        <Standings players={currentTournament.players} />
      )}
    </div>
  );
};